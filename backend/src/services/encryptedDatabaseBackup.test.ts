import { EventEmitter } from "node:events";
import { PassThrough, Readable } from "node:stream";
import { readFile } from "node:fs/promises";
import { afterEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ startDatabaseDump: vi.fn() }));
vi.mock("./databaseBackup.service", () => ({ startDatabaseDump: mocks.startDatabaseDump }));
import { prepareEncryptedDatabaseBackup } from "./encryptedDatabaseBackup.service";

afterEach(() => vi.clearAllMocks());

function mockDump(exitCode: number) {
  const process = Object.assign(new EventEmitter(), {
    stdin: new PassThrough(), stderr: new PassThrough(),
    stdout: Readable.from([Buffer.from("PGDMP database contents")]),
    kill: vi.fn(),
  });
  process.stdout.once("end", () => process.emit("close", exitCode));
  mocks.startDatabaseDump.mockReturnValue(process);
  return process;
}

describe("encrypted backup preparation", () => {
  it("returns a complete encrypted file and removes it after cleanup", async () => {
    mockDump(0);
    const backup = await prepareEncryptedDatabaseBackup("separate backup password", new AbortController().signal);
    expect(backup.checksum).toMatch(/^[a-f0-9]{64}$/);
    expect((await readFile(backup.filePath)).subarray(0, 8).toString()).toBe("ELMSBKP1");
    await backup.cleanup();
    await expect(readFile(backup.filePath)).rejects.toMatchObject({ code: "ENOENT" });
  });

  it("rejects a dump that produces output but exits unsuccessfully", async () => {
    const process = mockDump(1);
    await expect(prepareEncryptedDatabaseBackup("separate backup password", new AbortController().signal)).rejects.toThrow("did not complete");
    expect(process.kill).toHaveBeenCalled();
  });

  it("handles a missing pg_dump executable while deriving the encryption key", async () => {
    const process = Object.assign(new EventEmitter(), {
      stdin: new PassThrough(), stdout: new PassThrough(), stderr: new PassThrough(), kill: vi.fn(),
    });
    mocks.startDatabaseDump.mockImplementation(() => {
      setImmediate(() => {
        process.emit("error", new Error("spawn ENOENT"));
        process.emit("close", -1);
      });
      return process;
    });
    await expect(prepareEncryptedDatabaseBackup("separate backup password", new AbortController().signal)).rejects.toThrow("ENOENT");
  });

  it("does not start pg_dump for a cancelled request", async () => {
    const controller = new AbortController();
    controller.abort();
    await expect(prepareEncryptedDatabaseBackup("separate backup password", controller.signal)).rejects.toThrow();
    expect(mocks.startDatabaseDump).not.toHaveBeenCalled();
  });

  it("stops pg_dump when the client disconnects during preparation", async () => {
    const controller = new AbortController();
    const process = Object.assign(new EventEmitter(), {
      stdin: new PassThrough(), stdout: new PassThrough(), stderr: new PassThrough(),
      kill: vi.fn(),
    });
    process.kill.mockImplementation(() => process.emit("close", null));
    mocks.startDatabaseDump.mockImplementation(() => {
      setImmediate(() => controller.abort());
      return process;
    });
    await expect(prepareEncryptedDatabaseBackup("separate backup password", controller.signal)).rejects.toThrow("cancelled");
    expect(process.kill).toHaveBeenCalled();
  });
});
