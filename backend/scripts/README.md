For recoverable report PINs, set `REPORT_PIN_ENCRYPTION_KEY` to a private, stable
64-character hexadecimal key in the server environment. Keep this key outside
Git and include it in your secure environment backups. Changing it requires
decrypting and re-encrypting existing PINs with their old key first.

After applying the structured-name and recoverable-PIN migration, run from `backend`:

```powershell
npx tsx scripts/backfill-report-pins.ts
```

This converts existing four-digit PIN lookup records to keyed hashes and adds
encrypted recovery without changing PIN values. It can be rerun safely. Older
records without a compatible four-digit lookup need a replacement PIN assigned
through Manage Users.

To record missing inventory usage for a specific validated patient report, run:

```powershell
npx tsx scripts/reconcile-patient-inventory.ts <patient-log-id>
```

This deducts the saved quantities and records stock-out transactions together.
It skips reports whose usage is already recorded and rolls back if stock is
insufficient. The report ID is required so repairs apply only to the selected report.
