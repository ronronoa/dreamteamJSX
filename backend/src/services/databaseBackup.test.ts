import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  spawn: vi.fn(),
  env: {
    DATABASE_URL: "postgresql://backup%20user:p%40ssword@localhost:5433/elms%20backup?sslmode=require",
    PG_DUMP_PATH: undefined as string | undefined,
  },
}));

vi.mock("node:child_process", () => ({ spawn: mocks.spawn }));
vi.mock("@/config/env", () => ({ env: mocks.env }));

import { startDatabaseDump } from "./databaseBackup.service";

beforeEach(() => {
  vi.clearAllMocks();
  mocks.env.PG_DUMP_PATH = undefined;
});

describe("PostgreSQL backup process", () => {
  it("uses pg_dump from PATH when no executable is configured", () => {
    startDatabaseDump();

    expect(mocks.spawn).toHaveBeenCalledWith("pg_dump", ["--format=custom", "--no-password"], {
      env: expect.objectContaining({
        PGHOST: "localhost",
        PGPORT: "5433",
        PGUSER: "backup user",
        PGPASSWORD: "p@ssword",
        PGDATABASE: "elms backup",
        PGSSLMODE: "require",
      }),
      stdio: ["pipe", "pipe", "pipe"],
      windowsHide: true,
    });
  });

  it("runs a configured executable whose path contains spaces without a shell", () => {
    mocks.env.PG_DUMP_PATH = "C:/Program Files/PostgreSQL/18/bin/pg_dump.exe";
    startDatabaseDump();

    const [command, args, options] = mocks.spawn.mock.calls[0]!;
    expect(command).toBe(mocks.env.PG_DUMP_PATH);
    expect(args).toEqual(["--format=custom", "--no-password"]);
    expect(options.shell).toBeUndefined();
    expect(args.join(" ")).not.toContain("p@ssword");
  });
});
