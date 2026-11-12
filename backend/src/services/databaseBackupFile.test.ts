import { EventEmitter } from "node:events";
import { PassThrough, Readable } from "node:stream";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ open: vi.fn(), spawn: vi.fn() }));
vi.mock("@/config/env", () => ({ env: { DATABASE_URL: "postgresql://test:test@localhost/test" } }));
vi.mock("node:child_process", () => ({ spawn: mocks.spawn }));
vi.mock("node:fs/promises", async (importOriginal) => {
  const actual = await importOriginal<typeof import("node:fs/promises")>();
  return {
    ...actual,
    access: vi.fn().mockRejectedValue(Object.assign(new Error("Not found"), { code: "ENOENT" })),
    mkdir: vi.fn(), open: mocks.open, link: vi.fn(), unlink: vi.fn(),
  };
});

import { createDailyDatabaseBackup } from "./databaseBackup.service";

const temporaryFiles: string[] = [];
afterEach(async () => {
  const filesystem = await vi.importActual<typeof import("node:fs/promises")>("node:fs/promises");
  await Promise.all(temporaryFiles.map((file) => filesystem.rm(file, { force: true })));
  temporaryFiles.length = 0;
});

it("closes the backup FileHandle through its stream, preventing a second close during garbage collection", async () => {
  const filesystem = await vi.importActual<typeof import("node:fs/promises")>("node:fs/promises");
  const temporaryDirectory = await filesystem.mkdtemp(path.join(tmpdir(), "backup-handle-test-"));
  const temporaryFile = path.join(temporaryDirectory, "backup.dump");
  temporaryFiles.push(temporaryFile);
  const handle = await filesystem.open(temporaryFile, "wx");
  mocks.open.mockResolvedValue(handle);

  const dumpProcess = Object.assign(new EventEmitter(), {
    stdout: Readable.from([Buffer.from("test backup")]),
    stdin: new PassThrough(), stderr: new PassThrough(), kill: vi.fn(),
  });
  dumpProcess.stdout.once("end", () => dumpProcess.emit("close", 0, null));
  mocks.spawn.mockReturnValue(dumpProcess);

  try {
    await createDailyDatabaseBackup();
    expect(handle.fd).toBe(-1);
    expect(await filesystem.readFile(temporaryFile, "utf8")).toBe("test backup");
  } finally {
    await handle.close();
    await filesystem.rm(temporaryFile, { force: true });
    await filesystem.rmdir(temporaryDirectory);
  }
});
