import { createCipheriv, createDecipheriv, createHash, randomBytes, scrypt } from "node:crypto";
import { createReadStream, createWriteStream } from "node:fs";
import { open, rm } from "node:fs/promises";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import { promisify } from "node:util";

// Version 1: magic | salt | IV | ciphertext | GCM authentication tag.
const MAGIC = Buffer.from("ELMSBKP1");
const SALT_BYTES = 16;
const IV_BYTES = 12;
const KEY_BYTES = 32;
const TAG_BYTES = 16;
const HEADER_BYTES = MAGIC.length + SALT_BYTES + IV_BYTES;
const deriveKey = promisify(scrypt);

export async function hashBackup(filePath: string): Promise<string> {
  const hash = createHash("sha256");
  for await (const chunk of createReadStream(filePath)) hash.update(chunk);
  return hash.digest("hex");
}

export async function encryptBackup(source: Readable, destination: string, password: string): Promise<void> {
  // pg_dump may fail while scrypt is still deriving the key.
  let sourceFailure: Error | undefined;
  const rememberSourceFailure = (error: Error) => { sourceFailure = error; };
  source.on("error", rememberSourceFailure);
  try {
    const salt = randomBytes(SALT_BYTES);
    const iv = randomBytes(IV_BYTES);
    const header = Buffer.concat([MAGIC, salt, iv]);
    const key = await deriveKey(password, salt, KEY_BYTES) as Buffer;
    if (sourceFailure) throw sourceFailure;
    const cipher = createCipheriv("aes-256-gcm", key, iv);
    key.fill(0);
    cipher.setAAD(header);

    async function* encryptedChunks() {
      yield header;
      for await (const chunk of source) yield cipher.update(chunk);
      yield cipher.final();
      yield cipher.getAuthTag();
    }

    await pipeline(Readable.from(encryptedChunks()), createWriteStream(destination, { flags: "wx", mode: 0o600 }));
  } finally {
    source.off("error", rememberSourceFailure);
  }
}

export async function decryptBackup(source: string, destination: string, password: string): Promise<void> {
  const file = await open(source, "r");
  const header = Buffer.alloc(HEADER_BYTES);
  const tag = Buffer.alloc(TAG_BYTES);
  let size: number;
  try {
    size = (await file.stat()).size;
    if (size <= HEADER_BYTES + TAG_BYTES) throw new Error("Invalid encrypted backup.");
    await file.read(header, 0, HEADER_BYTES, 0);
    if (!header.subarray(0, MAGIC.length).equals(MAGIC)) throw new Error("Unsupported backup format.");
    await file.read(tag, 0, TAG_BYTES, size - TAG_BYTES);
  } finally {
    await file.close();
  }

  const salt = header.subarray(MAGIC.length, MAGIC.length + SALT_BYTES);
  const iv = header.subarray(MAGIC.length + SALT_BYTES);
  const key = await deriveKey(password, salt, KEY_BYTES) as Buffer;
  const decipher = createDecipheriv("aes-256-gcm", key, iv);
  key.fill(0);
  decipher.setAAD(header);
  decipher.setAuthTag(tag);

  // Reserve the output first; never overwrite an existing dump.
  const output = await open(destination, "wx", 0o600);
  try {
    await pipeline(
      createReadStream(source, { start: HEADER_BYTES, end: size - TAG_BYTES - 1 }),
      decipher,
      output.createWriteStream(),
    );
  } catch {
    await output.close().catch(() => undefined);
    await rm(destination, { force: true });
    throw new Error("Backup authentication failed. The password is incorrect or the file was altered.");
  }
}
