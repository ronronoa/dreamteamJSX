# Development Phases
## Emergency Logistics Management System (ELMS-BDRRMO)

Extracted from `Development_Progress.md` — Section 2: Phased Development Plan

---

### Phase 1 — Foundation & Database Schema (Week 1-2)

**Goal:** Complete the data layer and secure all backend routes.

| Task | Details |
|---|---|
| Complete Prisma schema | Add all 18 remaining entities + 6 enums per `new_erd.md` (20 tables total) |
| Add `SUPER_ADMIN` role | Extend `Role` enum with SUPER_ADMIN |
| Run migrations | Generate and apply SQL migrations |
| Auth middleware | `requireAuth` (JWT verification) + `requireRole(...roles)` |
| PIN system | Store hashed PINs on users, PIN verification endpoint |
| RBAC seed data | Super Admin account, sample roles for dev testing |
| Frontend branch merge | Rebase/merge `origin/master` into current branch |

**Deliverable:** Full database schema, protected routes, PIN system, RBAC operational.

---

### Phase 2 — User Management (Week 2-3)

**Goal:** Super Admin can manage all user accounts.

| Task | Details |
|---|---|
| User CRUD endpoints | Create, read, update, delete users (SUPER_ADMIN only) |
| Role assignment | Assign/change roles on user accounts |
| Password reset | Admin can reset any user's password |
| Frontend user management page | Table view, create/edit/delete modals |

**Deliverable:** Complete user management module.

---

### Phase 3 — Core Logging: Operation Log (Week 3-5)

**Goal:** Team Members can create, submit, and track Operation Logs.

| Task | Details |
|---|---|
| Operation Log CRUD (backend) | Create, read, update endpoints — note: `area`, vehicle/driver fields removed from model, now tracked via `vehicular_dispatch` |
| Operation Responders (backend) | Join table CRUD — assign responders to operations |
| Persons Involved sub-form | Nested CRUD — simplified to `full_name`, `age`, `sex`, `contact_no`, `address` |
| Operation Log form (frontend) | Multi-section form with required field validation |
| Operation Log list view | Table with filtering by date, status, nature of operation |
| Image attachments | Separate `operation_image_attachments` table for scene photos |

**Deliverable:** Full Operation Log entry and viewing.

---

### Phase 4 — Authorization Workflow (Week 5-6)

**Goal:** Reports flow through Team Leader -> Admin validation pipeline.

| Task | Details |
|---|---|
| Submit for authorization | Status transitions: DRAFT -> PENDING |
| Team Leader PIN authorization | PIN modal, status PENDING -> TO_REVIEW |
| Admin review queue | List of Team Leader-authorized reports |
| Admin validate/reject/edit | Validate, reject, or edit with "edited by Admin X" label |
| Dept Head auto-validate | PIN auth -> directly VALIDATED |
| Operation Log Edits (audit trail) | Record edits with admin identity, timestamps, notes |

**Deliverable:** Complete authorization pipeline with audit trail.

---

### Phase 5 — Patient Log & Vehicular Dispatch (Week 6-8)

**Goal:** Complete the remaining two core logging forms.

| Task | Details |
|---|---|
| Patient CRUD (backend) | Simplified patient model — `full_name`, `birthday`, `sex`, contact/address fields |
| Patient Log CRUD (backend) | Log with `name_of_caller`, vitals, `medical_assessment`, hospital info (name, rep, in/out times) |
| Patient Responders (backend) | Join table CRUD — assign responders to patient logs |
| Patient image attachments | `patient_image_attachments` table for waiver/consent forms |
| Vehicular Dispatch CRUD (backend) | Separate dispatch model — links to `operation_id?` and `patient_log_id?`, vehicle, driver, times, locations, `dispatch_type` |
| Dispatch Responders (backend) | Join table CRUD — assign responders to dispatches |
| Civilian Passengers (backend) | Track non-responder occupants per dispatch |
| Vehicular Dispatch form (frontend) | Dispatch form with vehicle selection, responder assignment, passenger list |
| Wire to auth workflow | Both go through the same Team Leader -> Admin pipeline |

**Note:** `patient_transport` from old ERD is removed. Transport details are now part of `vehicular_dispatch` which can link to either an operation or a patient log.

**Deliverable:** All three report types fully functional.

---

### Phase 6 — Inventory Management (Week 8-10)

**Goal:** Track stock and auto-deduct on validated operations.

| Task | Details |
|---|---|
| Inventory Items CRUD | Create, update, delete items with stock_quantity |
| Inventory Transactions | Stock-in, stock-out, adjustment records with admin identity |
| Consumption profiles | Define which items/quantities each operation type consumes |
| Auto-deduction on validation | When report is validated, deduct stock per profile + log transaction |
| Negative stock handling | Block validation if insufficient stock (or alert — TBD) |
| Manual stock addition | Admin adds stock with identity logged |
| Inventory frontend | Stock table, stock-in form, transaction history |

**Deliverable:** Full inventory tracking with automatic deduction.

---

### Phase 7 — Dashboard, Filtering & Printing (Week 10-11)

**Goal:** Leadership visibility and report printing.

| Task | Details |
|---|---|
| Dashboard KPIs | Most common operation type, high-frequency areas, most-used supplies |
| Dashboard graphs | Charts for incident trends, inventory consumption over time |
| Advanced filtering | Date range, status, type, area across all record types |
| Printing | Print-optimized views for all record types + Dashboard |
| Date-based archiving | Archive old records to keep active views clean |

**Deliverable:** Dashboard with KPIs, full filtering, and printable reports.

---

### Phase 8 — Backup, Replication, Electron & Polish (Week 11-13)

**Goal:** High-availability database with disaster recovery, production-ready offline deployment.

#### 8A: Active-Passive PostgreSQL Replication (Week 11-12)

**Architecture:** Primary (port 5432) + Standby (port 5433) on same machine

| Task | Details |
|---|---|
| Configure primary for WAL streaming | Set `wal_level = replica`, `max_wal_senders = 3`, `wal_keep_size = 1024` in `postgresql.conf` |
| Configure `pg_hba.conf` | Allow replication connections from `127.0.0.1` for replicator user |
| Create replication user | `CREATE USER replicator WITH REPLICATION ENCRYPTED PASSWORD '...'` |
| Initialize standby | `pg_basebackup` from primary, create `standby.signal`, configure `primary_conninfo` |
| Start standby on port 5433 | `pg_ctl -D /path/to/standby/data -o "-p 5433" start` |
| Replication monitoring service | `backend/src/services/replication.ts` — query `pg_stat_replication` for lag tracking |
| Standby health check | Verify standby is in recovery mode (read-only) and receiving WAL |
| Failover utility | `promoteStandby()` function to promote standby to primary |
| Environment config | Add `STANDBY_URL`, `REPLICATION_USER`, `REPLICATION_PASSWORD` to `.env` |

**What replication protects against:** Server hardware failure, database crashes — quick failover (seconds)

#### 8B: pg_dump Backup System (Week 12)

**Architecture:** Scheduled `pg_dump -Fc` (compressed binary) with tiered retention

| Task | Details |
|---|---|
| Backup service | `backend/src/services/backup.ts` — `createBackup()`, `restoreBackup()`, `listBackups()`, `cleanupOldBackups()` |
| Backup schedule | Daily (2:00 AM, retain 7), Weekly (Sunday 3:00 AM, retain 4), Monthly (1st, 4:00 AM, retain 12) |
| Backup storage | `/backups/daily/`, `/backups/weekly/`, `/backups/monthly/` — local filesystem |
| Backup format | `pg_dump -Fc -Z 9` — compressed binary, fastest restore |
| Backup routes | `POST /api/backup/create`, `POST /api/backup/restore`, `GET /api/backup/list` — SUPER_ADMIN only |
| Scheduled cron | `node-cron` for automated backup triggers + cleanup |
| Dependencies | Install `node-cron` and `@types/node-cron` |

**What pg_dump protects against:** Accidental deletion, logical corruption, compliance/archival requirements

#### 8C: Monitoring & Health (Week 12)

| Task | Details |
|---|---|
| Health endpoint | `GET /api/health` — returns replication status, lag, last backup timestamp |
| Replication lag tracking | Display lag in bytes and seconds from `pg_stat_replication` |
| Backup status API | List available backups with timestamps and sizes |
| Failover trigger | Manual promotion with application connection update |

#### 8D: Electron & UI Polish (Week 12-13)

| Task | Details |
|---|---|
| Electron shell | Wrap React frontend in Electron for desktop deployment |
| LAN configuration | Multi-machine access to central PostgreSQL |
| Frontend-backend alignment | Fix API path mismatches |
| Error handling & UX polish | Toast notifications, loading states, form error display |
| Basic test coverage | Critical path tests for auth, validation workflow, inventory |

**What each layer protects:**

| Scenario | Replication | pg_dump |
|---|---|---|
| Server hardware failure | ✅ Quick failover | ❌ Manual restore |
| Database corruption | ❌ Propagates to standby | ✅ Point-in-time recovery |
| Accidental deletion | ❌ Propagates to standby | ✅ Restore before deletion |
| Logical errors (bad queries) | ❌ Propagates to standby | ✅ Restore before error |
| Long-term archival | ❌ Not designed for this | ✅ Monthly backups |
| Compliance/audit requirements | ❌ No historical snapshots | ✅ Retention policy |

**Deliverable:** High-availability database with real-time replication, scheduled backups with tiered retention, deployable desktop app running on offline LAN.

---

### Phase 9 — Testing & Final Demo Prep (Week 13-14)

**Goal:** Zero critical defects, demo-ready.

| Task | Details |
|---|---|
| End-to-end testing | Full workflow from login through all report types |
| Multi-machine LAN testing | Verify 2+ machines can access simultaneously |
| Backup/restore drill | Test recovery from backup |
| Edge case validation | PIN lockout, negative stock, concurrent edits, archived record editing |
| Demo script | Walkthrough of all features for evaluation |

**Deliverable:** Production-ready system with verified functionality.