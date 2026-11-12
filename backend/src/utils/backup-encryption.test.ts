import { createHash } from "node:crypto";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { Readable } from "node:stream";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { decryptBackup, encryptBackup, hashBackup } from "./backup-encryption";

const PASSWORD = "A separate backup password!";
const DUMP = Buffer.from("PGDMP sensitive database contents");
let directory: string;
let encrypted: string;
let decrypted: string;

beforeEach(async () => {
  directory = await mkdtemp(path.join(tmpdir(), "elms-encryption-test-"));
  encrypted = path.join(directory, "backup.dump.enc");
  decrypted = path.join(directory, "restored.dump");
});
afterEach(async () => {
  await rm(directory, { recursive: true, force: true });
});

describe("encrypted backup format", () => {
  it("round trips the original dump and hashes the complete encrypted file", async () => {
    await encryptBackup(Readable.from([DUMP]), encrypted, PASSWORD);
    const contents = await readFile(encrypted);
    expect(contents.includes(DUMP)).toBe(false);
    expect(await hashBackup(encrypted)).toBe(createHash("sha256").update(contents).digest("hex"));
    await decryptBackup(encrypted, decrypted, PASSWORD);
    expect(await readFile(decrypted)).toEqual(DUMP);
  });

  it("uses different salt and IV for each backup", async () => {
    const secondBackup = path.join(directory, "second.enc");
    await encryptBackup(Readable.from([DUMP]), encrypted, PASSWORD);
    await encryptBackup(Readable.from([DUMP]), secondBackup, PASSWORD);
    expect(await readFile(encrypted)).not.toEqual(await readFile(secondBackup));
  });

  it("rejects a wrong password and removes the unauthenticated output", async () => {
    await encryptBackup(Readable.from([DUMP]), encrypted, PASSWORD);
    await expect(decryptBackup(encrypted, decrypted, "wrong password")).rejects.toThrow("authentication failed");
    await expect(readFile(decrypted)).rejects.toMatchObject({ code: "ENOENT" });
  });

  it.each(["header", "ciphertext", "tag", "truncated"])("rejects an altered %s", async (part) => {
    await encryptBackup(Readable.from([DUMP]), encrypted, PASSWORD);
    let contents = await readFile(encrypted);
    if (part === "truncated") contents = contents.subarray(0, 10);
    else {
      const index = part === "header" ? 0 : part === "ciphertext" ? 36 : contents.length - 1;
      contents[index] = contents[index]! ^ 1;
    }
    await writeFile(encrypted, contents);
    await expect(decryptBackup(encrypted, decrypted, PASSWORD)).rejects.toThrow();
    await expect(readFile(decrypted)).rejects.toMatchObject({ code: "ENOENT" });
  });

  it("never overwrites or deletes an existing destination", async () => {
    await encryptBackup(Readable.from([DUMP]), encrypted, PASSWORD);
    await writeFile(decrypted, "existing backup");
    await expect(decryptBackup(encrypted, decrypted, PASSWORD)).rejects.toMatchObject({ code: "EEXIST" });
    expect(await readFile(decrypted, "utf8")).toBe("existing backup");
  });
});
