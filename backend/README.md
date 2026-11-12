# Database backups

Super Admin can download a password-protected PostgreSQL backup from Settings.
Enter and confirm a separate password of 12 to 128 characters. Downloads use
AES-256-GCM encryption with a fresh salt and IV, and a key derived with scrypt.
The password is not stored by the application. Keep it separately: a lost
password cannot be recovered. Use HTTPS in production to protect the password
and backup in transit.
The backend needs `pg_dump` from the same PostgreSQL major version as the database server, or a newer version.

If `pg_dump` is not on the server's `PATH`, set its executable path in `backend/.env`:

```dotenv
PG_DUMP_PATH="C:/Program Files/PostgreSQL/18/bin/pg_dump.exe"
```

Use the installed path on your server, then restart the backend. Database
connection details come from `DATABASE_URL`; they are not passed as command arguments.

The browser verifies the SHA-256 checksum before saving the `.dump.enc` file.
Use **Download SHA-256 checksum** to save a `.sha256` sidecar for later checks.
SHA-256 detects changes to the encrypted file; AES-256-GCM protects the contents
and authenticates them when decrypted. Keep the checksum in a trusted location.

To decrypt, run the included tool from `backend` using Node.js and the installed
project dependencies. In PowerShell, enter the password without echoing it:

```powershell
$backupSecret = Read-Host "Backup password" -AsSecureString
$env:BACKUP_PASSWORD = [System.Net.NetworkCredential]::new("", $backupSecret).Password
try {
  npx tsx scripts/decrypt-backup.ts "elms-database-backup-2026-11-09.dump.enc" "restored.dump" "elms-database-backup-2026-11-09.dump.enc.sha256"
} finally {
  Remove-Item Env:BACKUP_PASSWORD -ErrorAction SilentlyContinue
  $backupSecret.Dispose()
}
```

The checksum argument is optional. The tool always checks the GCM authentication
tag and rejects an incorrect password or modified backup. It never overwrites an
existing output file, and removes partial output if authentication fails.
Inspect the decrypted dump using `pg_restore --list restored.dump`, then use your
normal PostgreSQL restore procedure. The decrypted file contains sensitive data.

The download endpoint is now `POST /api/settings/database-backup` with JSON
`{ "password": "your separate backup password" }`. Super Admin authorization and
the existing download rate limit still apply. Only encrypted temporary data is
written during this download; it is removed after completion or failure.

Scheduled daily backups in `backend/backups` still use the existing unencrypted
`.dump` format. This change protects backups downloaded through Settings.
