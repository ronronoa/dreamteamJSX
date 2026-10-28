# Database backups

Super Admin can download a PostgreSQL custom-format backup from Settings.
The backend needs `pg_dump` from the same PostgreSQL major version as the database server, or a newer version.

If `pg_dump` is not on the server's `PATH`, set its executable path in `backend/.env`:

```dotenv
PG_DUMP_PATH="C:/Program Files/PostgreSQL/18/bin/pg_dump.exe"
```

Use the installed path on your server, then restart the backend. Database
connection details come from `DATABASE_URL`; they are not passed as command arguments.

The downloaded `.dump` file can be inspected with `pg_restore --list`.
Store backups securely because they contain sensitive system data.
