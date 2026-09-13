# Project Status & Engineering Standards
## Emergency Logistics Management System (ELMS-BDRRMO)

**For:** Barangay 176-E BDRRMO/BHERT  
**Last updated:** Sep 10, 2026

---

## 0. AI Agent Context and Source-of-Truth Rules

This file is both a **project status document** and an **implementation contract for AI-assisted backend development**.

### Source-of-Truth Priority

When sources disagree, the agent must not silently guess. Resolve conflicts in this order:

1. Explicit task requirements from the current developer/user instruction.
2. Confirmed project requirements/PRD.
3. `docs/new_erd.md` and the actual Prisma schema/migrations.
4. Existing tested backend behavior and current source code.
5. This document's standards and conventions.
6. General engineering best practices.

If a conflict remains unresolved, stop the affected implementation path and report the exact conflict and the safest assumption required.

### Project Fact vs Engineering Standard

Treat statements in this document as one of two kinds:

- **Project fact:** describes what currently exists, what the ERD contains, or what the project requires.
- **Engineering standard:** describes how new code should be designed.

Do not interpret a project fact such as "not built" as permission to change the architecture arbitrarily. Do not interpret an engineering recommendation as proof that a feature already exists.

### Change Discipline

For non-trivial work, the agent should first inspect:

```text
PROJECT_STATUS_AND_STANDARDS.md
docs/new_erd.md
prisma/schema.prisma
relevant module source
relevant migrations
relevant tests
```

Then identify:

```text
Current state
Target state
Affected modules
Business rules
Security rules
Data changes
Test impact
Migration impact
Backward-compatibility impact
```

The agent must prefer **incremental, verifiable changes** over broad rewrites.


## 1. Current State Summary

### Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Runtime | Node.js | -- |
| Language | TypeScript | 7.0.2 (ES2024 target) |
| Backend Framework | Express | 5.2.1 |
| ORM | Prisma | 7.9.1 (`prisma-client` generator) |
| Database | PostgreSQL | via `pg` 8.23.0 + `@prisma/adapter-pg` |
| Auth | JWT (`jsonwebtoken` 9.0.3) | Access 15min, Refresh 7d |
| Password Hashing | Argon2 | 0.45.1 |
| Validation | Zod | 4.4.3 |
| Security | Helmet 8.3.0, CORS, express-rate-limit | -- |
| Frontend | React 19 + Vite 8 + Tailwind v4 | -- |
| Desktop Shell | Electron (planned) | -- |

### What's Built

**Backend (fully functional)**
- [x] Express app with Helmet, CORS, cookie-parser, JSON body parsing
- [x] Zod-validated environment config
- [x] Prisma client singleton with PostgreSQL adapter
- [x] User signup with Argon2 password hashing
- [x] User signin with timing-safe comparison
- [x] JWT access token generation (15-min expiry)
- [x] JWT refresh token with rotation (7-day expiry, httpOnly cookie)
- [x] Refresh token revocation (logout)
- [x] Rate limiting on auth endpoints (20 req / 15 min)
- [x] Structured error hierarchy (6 typed error classes)
- [x] Health check endpoint (`/api/health`)
- [x] Branded types (UserId, Email, TokenHash)
- [x] Result<T,E> monad utility
- [x] Date utility functions

**Frontend (exists on `origin/master`, not on current branch)**
- [x] React 19 + Vite 8 + Tailwind v4 scaffold
- [x] Login page with full branding
- [x] Auth context with session management
- [x] Protected and public route guards
- [x] Modal system (Forgot Password, Contact Admin)
- [x] Common components (Button, Logo, Spinner, LoadingScreen)
- [x] Basic page routing

**Database**
- [x] 2/20 entities: `User`, `RefreshToken`
- [x] 1 enum: `Role` (DEPARTMENT_HEAD, DEPUTY, TEAM_LEADER, MEMBER)
- [x] 2 migrations applied

### What's Not Built

| Category | Items |
|---|---|
| **Database** | 18 remaining entities + 6 enums (see `new_erd.md`) |
| **Auth Middleware** | No `requireAuth`, no `requireRole`, no route protection |
| **RBAC** | Roles stored in DB but never checked |
| **PIN System** | No PIN storage, no PIN verification endpoint |
| **Super Admin** | Role not in Prisma schema but required by PRD |
| **Operation Log** | CRUD, forms, workflow — all unbuilt (note: `area`, vehicle/driver fields removed from model — now tracked via `vehicular_dispatch`) |
| **Operation Responders** | Join table for operation-to-responder assignments — unbuilt |
| **Patient Log** | Patient, PatientLog — all unbuilt (note: `patient_transport` removed — merged into `vehicular_dispatch`) |
| **Patient Responders** | Join table for patient-log-to-responder assignments — unbuilt |
| **Vehicular Dispatch** | Separate dispatch model with operation/patient links, responders, civilian passengers — unbuilt |
| **Image Attachments** | Operation and patient image attachment tables — unbuilt |
| **Inventory** | Items (with `stock_type`), transactions, auto-deduction — unbuilt |
| **User Management** | Admin CRUD for users — unbuilt |
| **Dashboard & KPIs** | Charts, graphs, analytics — unbuilt |
| **Filtering & Printing** | Record filtering, print views — unbuilt |
| **Archiving** | Record archiving — unbuilt |
| **Backup/Restore** | PostgreSQL backup automation + active-passive replication — unbuilt |
| **Electron** | Desktop shell — unbuilt |
| **Tests** | Zero (Vitest/Supertest installed, no test files) |

### Open Issues

1. **Branch misalignment** — Frontend code lives on `origin/master`, backend on `refactor/typescript-patterns`. Need to merge or rebase.
2. **Super Admin role** — Required by PRD but missing from Prisma `Role` enum.
3. **Frontend/backend API mismatch** — Frontend calls `/accounts/login`, backend exposes `/api/auth/signin`.
4. **PIN policy TBD** — Lockout after N attempts? Per-user or per-role? Reset flow?
5. **Consumption profiles** — Who defines per-operation-type inventory deductions?
6. **Negative stock** — Block validation or allow with alert?
7. **Concurrent LAN edits** — Optimistic locking or last-write-wins?
8. **Vehicular dispatch links** — `operation_id` and `patient_log_id` are both optional — need business rule for when a dispatch must link to one vs the other.
9. **Dispatch type enum** — `dispatch_type` on `vehicular_dispatch` uses string in ERD but should be enum (DROP_OFF, PICK_UP) — confirm if `PatientTransportType` enum is reused or a new `DispatchType` enum is needed.

---


---

## 2. Phased Development Plan

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

---


---

## 3. Backend Engineering Standards

This section is the **project-specific implementation contract** for all backend work. It takes precedence over convenience, shortcuts, or minimal code generation.

The backend must follow the principles in the companion **Senior TypeScript Backend RAG Approach** while remaining consistent with this project's existing stack, database model, authentication design, and API conventions.

### 3.1 Engineering Priority Order

When making a backend decision, prioritize:

1. **Correctness** — behavior and business rules must be correct.
2. **Security** — authentication, authorization, validation, and secret handling are mandatory.
3. **Type safety** — preserve compile-time guarantees and avoid unsafe escapes.
4. **Data integrity** — database constraints, transactions, concurrency, and state transitions must be deliberate.
5. **Maintainability** — clear boundaries, small responsibilities, explicit dependencies.
6. **Testability** — important behavior must be testable at unit, integration, and API levels.
7. **Observability** — failures and important operations must be diagnosable.
8. **Performance** — avoid wasteful queries and premature complexity.
9. **Simplicity** — do not introduce patterns that do not solve a real problem.

Do **not** optimize for "fewest files" or "fastest implementation" when that creates architectural debt.

---

### 3.2 Non-Negotiable TypeScript Configuration

The backend currently targets ES2024 and uses strict TypeScript configuration:

```json
{
  "target": "ES2024",
  "module": "ESNext",
  "moduleResolution": "bundler",
  "strict": true,
  "noUncheckedIndexedAccess": true,
  "exactOptionalPropertyTypes": true,
  "noImplicitOverride": true,
  "noPropertyAccessFromIndexSignature": true,
  "noFallthroughCasesInSwitch": true,
  "forceConsistentCasingInFileNames": true,
  "verbatimModuleSyntax": true,
  "isolatedModules": true
}
```

Rules:

- All new code must pass strict type checking.
- Do not introduce `any`.
- Do not use `@ts-ignore`, `@ts-nocheck`, or equivalent escapes.
- Avoid non-null assertions (`!`) unless the invariant is genuinely guaranteed and documented.
- Prefer `unknown` at unsafe boundaries, then narrow it safely.
- Prefer type inference when the type is obvious; add explicit types where they communicate a contract.
- Use `import type` for type-only imports because `verbatimModuleSyntax` is enabled.
- Use ESM only.

---

### 3.3 Type-System Discipline

The agent must use the type system as a design tool, not merely as syntax.

Use appropriately:

- Union and discriminated-union types
- Generics
- Type guards
- Type narrowing
- Utility types
- Branded/nominal types for important identifiers
- Readonly types where immutability is useful
- Exhaustive `switch` handling
- Precise nullable/optional modeling

#### `unknown` over `any`

External or untrusted values should enter as `unknown` and be validated/narrowed.

```ts
function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return "Unknown error";
}
```

#### Type Narrowing

Do not access union members without narrowing.

Preferred techniques:

```ts
typeof
instanceof
in
equality checks
custom type guards
discriminated unions
```

#### Generics

Use generics when they create a useful reusable contract.

Good:

```ts
interface Result<T, E> {
  success: boolean;
  data?: T;
  error?: E;
}
```

Bad:

- Generic abstractions used only to appear "advanced"
- Generic repositories that erase meaningful domain differences
- Deep generic type machinery that makes code harder to understand

---

### 3.4 Runtime Validation Is Mandatory at Boundaries

TypeScript does not validate runtime input.

Zod is the project's validation mechanism.

Validate:

- Request bodies
- Route parameters
- Query parameters
- Environment variables
- External service responses
- Other untrusted runtime data

Use schemas as the runtime boundary and derive types where practical.

```ts
const CreateOperationSchema = z.object({
  teamId: z.string().uuid(),
  operationDate: z.string().datetime(),
  nameOfCaller: z.string().min(1).max(100),
  natureOfOperation: z.string().min(1).max(100),
  eventDescription: z.string().min(1),
});

type CreateOperationInput = z.infer<typeof CreateOperationSchema>;
```

Validation should happen **before domain/application logic operates on untrusted data**.

---

### 3.5 Architecture: Modular + Layered

Organize code by business capability first, then by responsibility.

Recommended conceptual structure:

```text
src/
├── modules/
│   ├── auth/
│   ├── users/
│   ├── operations/
│   ├── patients/
│   ├── dispatches/
│   ├── inventory/
│   ├── dashboard/
│   ├── archive/
│   └── backup/
│
├── infrastructure/
│   ├── database/
│   ├── logging/
│   └── external/
│
├── middleware/
├── config/
├── shared/
├── errors/
└── app.ts
```

A feature module should normally contain only the responsibilities that feature owns.

The goal is **high cohesion and low coupling**.

---

### 3.6 Clean Dependency Direction

Use this dependency direction:

```text
HTTP / Express
      ↓
Controller / Transport Adapter
      ↓
Application Service / Use Case
      ↓
Domain Rules
      ↓
Ports / Interfaces
      ↓
Infrastructure Implementations
      ↓
PostgreSQL / External Systems
```

Important rule:

> Inner business logic must not become dependent on Express, Prisma, PostgreSQL, HTTP response objects, or external provider implementations.

The agent may use simpler layering for small features, but must not violate responsibility boundaries.

---

### 3.7 Controller Responsibilities

Controllers are HTTP adapters.

Controllers may:

- Read route params, query params, body, headers, and authenticated identity
- Trigger request validation
- Call application services/use cases
- Translate application results into HTTP responses
- Pass errors to global error handling

Controllers must not:

- Contain complex business rules
- Perform direct Prisma queries
- Decide domain authorization rules in an ad-hoc way
- Hash passwords directly
- Implement transaction workflows
- Call external providers directly when a service abstraction is appropriate

Keep controllers thin.

---

### 3.8 Service Layer / Use Cases

Application services orchestrate business operations.

A service should:

- Receive validated input
- Apply business rules
- Enforce use-case invariants
- Coordinate repositories and domain services
- Coordinate transactions when required
- Return domain/application results
- Remain independent of HTTP concepts

Services must not depend on `Request` or `Response`.

For non-trivial modules, model important operations as explicit use cases rather than one giant service.

Example:

```text
OperationService
├── createOperation
├── submitOperation
├── authorizeOperation
├── validateOperation
├── rejectOperation
└── archiveOperation
```

Avoid giant "manager" or "god service" classes.

---

### 3.9 Repository Pattern

Repository abstractions are preferred when they provide a meaningful boundary between application/domain logic and persistence.

Example:

```ts
interface OperationRepository {
  findById(id: OperationId): Promise<Operation | null>;
  create(input: CreateOperationData): Promise<Operation>;
  update(id: OperationId, input: UpdateOperationData): Promise<Operation>;
}
```

Infrastructure implementation:

```text
OperationRepository
        ↑
PrismaOperationRepository
        ↓
Prisma
        ↓
PostgreSQL
```

Repository rules:

- Repositories handle persistence concerns.
- Repositories do not contain business workflow decisions.
- Do not expose Prisma types across the whole application unless that leakage is intentionally accepted for a specific boundary.
- Do not create abstractions purely to satisfy a pattern.
- If a feature is genuinely trivial and direct access does not harm architecture or testability, keep the implementation proportionate.

---

### 3.10 Dependency Inversion and Dependency Injection

High-level logic should depend on abstractions where infrastructure substitution, testing, or boundary isolation makes that useful.

Prefer explicit dependencies:

```ts
class OperationService {
  constructor(
    private readonly operations: OperationRepository,
    private readonly auditLog: AuditLogPort,
  ) {}
}
```

Avoid hidden construction:

```ts
class OperationService {
  private readonly operations = new PrismaOperationRepository();
}
```

Use a composition root or module factory to assemble implementations.

```text
app composition
    ↓
concrete infrastructure
    ↓
interfaces / ports
    ↓
application services
```

The project does **not** require every function to become a class. Use classes when object identity, state, or DI makes them useful; otherwise use plain functions.

---

### 3.11 DTOs, Domain Models, Persistence Models

Do not automatically treat these as the same type.

Use clear boundaries:

```text
HTTP Request DTO
      ↓
Validated Input
      ↓
Domain / Application Model
      ↓
Persistence Model
      ↓
Response DTO
```

Rules:

- Request DTOs model what clients are allowed to submit.
- Domain/application models represent business meaning.
- Persistence models represent database structure.
- Response DTOs represent what the API is allowed to expose.
- Never return sensitive database fields by accident.
- Map explicitly when a boundary matters.

---

### 3.12 Domain Rules and State Machines

Business rules must be explicit.

For workflow-heavy entities such as Operation Logs, use controlled state transitions.

Example:

```text
DRAFT
  ↓ submit
PENDING
  ↓ authorize
TO_REVIEW
  ↓ validate
VALIDATED

PENDING / TO_REVIEW
  ↓ reject
REJECTED

VALIDATED
  ↓ archive
ARCHIVED
```

The exact allowed states must remain consistent with the project requirements and current schema.

The agent must not allow arbitrary status updates like:

```ts
status: req.body.status
```

unless the business rule explicitly permits that transition.

Prefer transition methods/use cases such as:

```text
submitOperation()
authorizeOperation()
validateOperation()
rejectOperation()
archiveOperation()
```

Each transition should verify:

- Current state
- Actor identity
- Actor role/permission
- Required PIN where applicable
- Required fields
- Side effects
- Audit requirements

---

### 3.13 Authentication Boundary

Authentication answers:

> Who is the caller?

The existing project standard is:

- Argon2 password hashing
- JWT access tokens
- Short-lived access token
- Refresh token rotation
- Refresh-token hashing in the database
- HttpOnly refresh cookie
- Logout/revocation
- Authentication middleware

Keep authentication implementation isolated in the auth module/infrastructure.

Do not duplicate token verification logic in individual controllers.

---

### 3.14 Authorization Boundary

Authorization answers:

> What may this authenticated caller do?

Enforce authorization on the backend.

Use layers where appropriate:

```text
Authentication
      ↓
Role / permission check
      ↓
Resource ownership / team scope
      ↓
Business rule
      ↓
Mutation
```

Do not rely on frontend guards.

Do not assume "authenticated" means "authorized."

For sensitive actions, verify the required role, resource scope, and workflow state at the service/use-case level in addition to route middleware where necessary.

---

### 3.15 RBAC Consistency

The current project has an unresolved `SUPER_ADMIN` mismatch:

- The current database role enum is `DEPARTMENT_HEAD, DEPUTY, TEAM_LEADER, MEMBER`.
- The PRD and route design require `SUPER_ADMIN`.
- The project status identifies this as an open issue.

Until resolved, the agent must **not silently invent a final role model**.

Treat the role schema, route matrix, and PRD as a consistency check that must be reconciled before security-sensitive implementation.

---

### 3.16 Error Handling

Use a structured application error hierarchy.

Expected categories include:

```text
AppError
├── ValidationError
├── UnauthorizedError
├── ForbiddenError
├── NotFoundError
├── ConflictError
└── InternalError
```

Rules:

- Throw meaningful typed application errors for expected failure conditions.
- Convert infrastructure/library errors at the appropriate boundary.
- Do not expose database internals to clients.
- Do not expose stack traces in production responses.
- Include stable machine-readable error codes where useful.
- Keep client messages safe and actionable.
- Centralize HTTP error serialization in error middleware.

Use `Result<T, E>` when an operation benefits from explicit success/failure values instead of exceptions, especially for deterministic parsing or validation helpers.

Do not use `Result` and exceptions inconsistently in the same operation without a reason.

---

### 3.17 Logging and Observability

Use structured logging for operationally significant events.

Important context may include:

```text
requestId
userId
route
HTTP method
status code
duration
module
operation/resource ID
error code
```

Never log:

```text
passwords
access tokens
refresh tokens
secrets
PIN values
sensitive personal/medical information
```

Important audit actions should be distinguishable from ordinary diagnostic logs.

For high-value actions, consider:

```text
who
what
when
target
before/after or change summary
reason
```

where the project requirements call for an audit trail.

---

### 3.18 Database Integrity

The database is part of the correctness boundary.

Before adding or changing a model, evaluate:

- Primary keys
- Foreign keys
- Unique constraints
- Nullable fields
- Delete behavior
- Indexes
- Composite keys
- Check constraints where useful
- Transaction boundaries
- Migration safety

Do not rely only on application-level checks for invariants that PostgreSQL can enforce.

---

### 3.19 Transactions

Use a transaction when multiple state changes represent one atomic business operation.

Example:

```text
Validate operation
    ↓
Create audit record
    ↓
Create inventory deductions
    ↓
Create inventory transaction records
    ↓
COMMIT
```

If any required operation fails:

```text
ROLLBACK
```

Do not perform part of a business-critical workflow outside the transaction when that can leave inconsistent state.

Keep transactions reasonably short.

---

### 3.20 Concurrency and Race Conditions

The project explicitly has an open question around concurrent LAN edits.

Until the business policy is finalized, the agent must not assume last-write-wins is acceptable.

For state-changing operations, evaluate:

- Transaction isolation
- Atomic updates
- Unique constraints
- Optimistic locking/version fields
- Row locking where justified
- Idempotency
- Conflict detection

A read-then-write sequence is not automatically safe under concurrency.

---

### 3.21 Idempotency

For retryable operations, evaluate whether duplicate execution causes incorrect results.

High-risk examples in this project include:

- Inventory deductions
- Backup triggers
- Status transitions
- Audit records
- Attachment creation
- External notifications

Where appropriate, design a stable idempotency strategy rather than assuming the request is sent only once.

---

### 3.22 API Design Standards

All API endpoints should have:

- Clear resource naming
- Correct HTTP semantics
- Explicit authentication requirements
- Explicit authorization requirements
- Runtime validation
- Consistent status codes
- Consistent error responses
- Pagination for potentially large collections
- Filtering/sorting where required by the feature
- Safe response DTOs

Current API convention:

```text
/api/[resource]
```

Example:

```text
/api/auth
/api/users
/api/operations
/api/patients
/api/dispatches
/api/inventory
/api/dashboard
/api/archive
/api/backup
```

Public endpoints must be explicitly marked as public. All other endpoints require authentication.

---

### 3.23 External Service Boundaries

External systems must not leak directly into domain logic.

Prefer ports/adapters:

```text
Application Service
       ↓
Provider Interface
       ↓
Concrete Provider
       ↓
External System
```

Examples:

```ts
interface NotificationProvider {
  send(input: NotificationInput): Promise<void>;
}
```

This prevents vendor/provider decisions from spreading through business logic.

---

### 3.24 Configuration Management

Configuration must be centralized and validated at startup.

Required categories include:

- Database URL
- JWT secrets
- Environment
- CORS
- Ports
- Cookie configuration
- External service configuration
- Backup configuration
- Application limits

Use Zod to validate environment variables.

Never read raw `process.env` throughout the application.

Never commit secrets.

---

### 3.25 Security Baseline

Current project security baseline:

| Concern | Standard |
|---|---|
| Password hashing | Argon2 |
| Access JWT | 15-minute expiry |
| Refresh token | 7-day expiry |
| Refresh token storage | SHA-256 hash in DB |
| Refresh transport | HttpOnly cookie |
| Refresh strategy | Rotation |
| Auth rate limiting | 20 requests / 15 minutes |
| Security headers | Helmet |
| Cookies | `httpOnly`, `sameSite: "strict"`, `secure` in production |
| Environment | Zod validated |
| Secrets | Never logged or committed |

Additional requirements:

- Never trust client-provided roles.
- Never accept authorization decisions from frontend state.
- Validate all untrusted input.
- Avoid leaking whether sensitive accounts exist when that would enable enumeration attacks.
- Protect PIN verification with throttling/lockout as the policy is finalized.
- Keep audit-sensitive actions traceable.

---

### 3.26 File and Image Handling

For operation and patient image attachments:

- Validate file type and size.
- Do not trust client MIME type alone.
- Generate safe storage names.
- Keep storage paths out of trust boundaries where possible.
- Do not allow arbitrary filesystem paths.
- Enforce authorization before downloading/deleting attachments.
- Keep attachment metadata separate from business records where the schema requires it.
- Do not expose sensitive patient images through publicly accessible URLs unless explicitly intended.

---

### 3.27 Database Query Discipline

Do not blindly fetch entire tables.

Use:

- Pagination
- Filtering
- Sorting
- Appropriate indexes
- Selective columns
- Bounded relation loading

For Prisma:

- Avoid unbounded `findMany()` on large tables.
- Avoid accidental N+1 queries.
- Review relation loading for list endpoints.
- Use transactions intentionally.
- Prefer database-side filtering and aggregation over loading unnecessary records into Node.js.

---

### 3.28 Testing Standard

A backend feature is incomplete without tests appropriate to its risk.

#### Unit Tests

Test:

- Business rules
- State transitions
- Validation helpers
- Pure functions
- Error conditions
- Security-sensitive utilities

Mock infrastructure when the purpose is isolated business logic.

#### Integration Tests

Test:

```text
Service
  ↓
Repository
  ↓
PostgreSQL
```

Use integration tests for:

- Persistence behavior
- Constraints
- Transactions
- Repository queries
- Relationship behavior

#### API Tests

Test the real HTTP boundary using Vitest + Supertest.

At minimum cover:

```text
2xx success
400 validation
401 unauthenticated
403 unauthorized
404 not found
409 conflict
5xx unexpected failures
```

For protected features, test both allowed and denied roles.

For workflow endpoints, test valid and invalid state transitions.

For security-sensitive endpoints, test abuse/edge cases such as repeated failed authentication or PIN attempts where implemented.

---

### 3.29 Test Pyramid

Prefer this distribution:

```text
           E2E / Full workflow
                 ▲
             API Tests
                 ▲
        Integration Tests
                 ▲
           Unit Tests
```

Use the smallest test level that proves the behavior.

Do not make every test a full API test.

---

### 3.30 New Feature Implementation Workflow

For every significant backend feature, follow this sequence:

```text
1. Understand the requirement
        ↓
2. Inspect current project structure
        ↓
3. Check project status / ERD / PRD dependencies
        ↓
4. Identify domain rules and invariants
        ↓
5. Identify authentication + authorization rules
        ↓
6. Design DTOs and runtime schemas
        ↓
7. Identify domain/application models
        ↓
8. Define repository/provider interfaces if useful
        ↓
9. Define transaction and concurrency boundaries
        ↓
10. Implement service/use case
        ↓
11. Implement persistence/infrastructure
        ↓
12. Implement controller
        ↓
13. Implement route + middleware
        ↓
14. Add logging/audit behavior where required
        ↓
15. Add unit tests
        ↓
16. Add integration tests
        ↓
17. Add API tests
        ↓
18. Run TypeScript checks
        ↓
19. Run lint/format checks
        ↓
20. Review security + data consistency
        ↓
21. Review backward compatibility
        ↓
22. Update project documentation/status
```

---

### 3.31 Definition of Done

Do not mark a backend feature complete only because the endpoint returns the expected response.

A feature is "done" when applicable criteria are satisfied:

```text
[ ] Domain rule is explicit
[ ] Request is runtime-validated
[ ] Types are strict
[ ] DTO boundaries are clear
[ ] Service/use-case boundary exists
[ ] Persistence access is appropriately isolated
[ ] Authorization is enforced server-side
[ ] Errors are typed and consistently handled
[ ] Sensitive data is protected
[ ] Logs/audit records are appropriate
[ ] Transactions are used where necessary
[ ] Concurrency risks considered
[ ] Unit tests added
[ ] Integration tests added when persistence matters
[ ] API tests added for endpoint behavior
[ ] No TypeScript errors
[ ] No unsafe `any`/suppression
[ ] No unnecessary dependency added
[ ] Existing behavior remains compatible unless intentionally changed
[ ] Documentation/status is updated
```

---

### 3.32 Refactoring Rules

When refactoring existing code:

1. Understand the current behavior before changing it.
2. Identify the actual architectural problem.
3. Prefer the smallest safe structural change.
4. Preserve external behavior unless a behavior change is required.
5. Avoid large rewrites unless the current design fundamentally blocks correctness or maintainability.
6. Add tests before risky refactors when coverage is insufficient.
7. Run type checking and relevant tests after each meaningful stage.

Do not refactor simply to "make it more SOLID."

Refactor when the new structure solves a real issue such as:

- Tight coupling
- Duplicate business rules
- Untestable behavior
- Security gaps
- Persistence leakage
- Circular dependencies
- Excessive responsibility
- Difficult change isolation

---

### 3.33 Dependency Rules

Before adding a dependency, evaluate:

```text
Does the project already solve this?
Is the package actively maintained?
Does it have a clear security/reliability record?
Does it materially reduce complexity?
Does it fit the current stack?
Can it be isolated behind a boundary?
```

Avoid unnecessary dependencies for small utilities that can safely remain local.

---

### 3.34 AI Agent Operating Rules

The AI coding agent must:

- Read the relevant project files before implementing non-trivial changes.
- Treat `PROJECT_STATUS_AND_STANDARDS.md`, `docs/new_erd.md`, and relevant project requirements as project context.
- Preserve existing naming and API conventions unless a deliberate migration is requested.
- Identify contradictions before making security-sensitive changes.
- Never invent schema fields, roles, endpoints, or business rules without marking them as assumptions.
- Separate confirmed project facts from engineering recommendations.
- Prefer repository/DI abstractions where they improve testability and dependency direction.
- Avoid repository/DI abstractions where they add ceremony without benefit.
- Never bypass TypeScript errors with `any` or suppression comments.
- Never skip runtime validation for untrusted input.
- Never implement authorization solely in the frontend.
- Never silently change a database contract.
- Never silently alter workflow states.
- Explain important architectural trade-offs when they are non-obvious.

---

### 3.35 AI Agent Decision Gate

Before writing code for a non-trivial task, the agent should be able to answer:

```text
WHAT is changing?
WHY is it changing?
WHICH module owns the behavior?
WHAT are the domain rules?
WHO is allowed to perform the operation?
WHAT input is untrusted?
WHERE is validation performed?
WHERE does business logic live?
WHERE does persistence live?
WHAT errors can occur?
DOES this require a transaction?
COULD concurrent requests race?
DOES retrying create duplicates?
HOW will this be tested?
WHAT existing behavior could break?
```

If these questions cannot be answered from project sources, the agent must clearly identify the missing assumption instead of silently inventing it.

---

## 4. RBAC Specification

### 4.1 Role Hierarchy

```
SUPER_ADMIN (highest)
  └─ DEPARTMENT_HEAD
       └─ DEPUTY
            └─ TEAM_LEADER
                 └─ MEMBER (lowest)
```

**Role capabilities:**

| Capability | SUPER_ADMIN | DEPT HEAD | DEPUTY | TEAM LEADER | MEMBER |
|---|---|---|---|---|---|
| Manage users (CRUD) | Yes | No | No | No | No |
| Assign roles | Yes | No | No | No | No |
| Reset passwords | Yes | No | No | No | No |
| Validate reports | Yes | Yes (auto) | Yes (auto) | No | No |
| Authorize reports (PIN) | No | Yes (auto-validates) | Yes (auto-validates) | Yes (routes to admin) | No |
| Create operation logs | Yes | Yes | Yes | Yes | Yes |
| Create patient logs | Yes | Yes | Yes | Yes | Yes |
| Create dispatch logs | Yes | Yes | Yes | Yes | Yes |
| View dashboard/KPIs | Yes | Yes | Yes | Yes | Yes |
| View all records | Yes | Yes | Yes | Yes | Own team only |
| Filter & print records | Yes | Yes | Yes | Yes | Yes |
| Manage inventory | Yes | Yes | Yes | No | No |
| Archive records | Yes | Yes | Yes | No | No |
| Edit admin-validated records | Yes | Yes | No | No | No |

### 4.2 Authorization Middleware Pattern

**requireAuth** — verifies JWT, attaches user to request:

```typescript
// middleware/auth.middleware.ts
import type { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "@/shared/errors/app-error";
import { parseAccessToken } from "@/utils/token";
import type { Role } from "@/generated/prisma/client";

declare global {
  namespace Express {
    interface Request {
      user?: { userId: string; role: Role };
    }
  }
}

export function requireAuth(req: Request, _res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    return next(new UnauthorizedError("Missing or malformed authorization header"));
  }

  const token = header.slice(7);
  const result = parseAccessToken(token);

  if (!result.success) {
    return next(new UnauthorizedError(result.error.message));
  }

  req.user = result.data;
  next();
}
```

**requireRole** — checks role against allowed list:

```typescript
export function requireRole(...allowedRoles: Role[]) {
  return (req: Request, _res: Response, next: NextFunction) {
    if (!req.user) {
      return next(new UnauthorizedError("Authentication required"));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(new ForbiddenError("Insufficient permissions"));
    }

    next();
  };
}
```

**Usage in routes:**

```typescript
import { requireAuth } from "@/middleware/auth.middleware";
import { requireRole } from "@/middleware/auth.middleware";

// Any authenticated user
operationRoutes.get("/operations", requireAuth, operationController.list);

// Only SUPER_ADMIN
userRoutes.post("/users", requireAuth, requireRole("SUPER_ADMIN"), userController.create);

// SUPER_ADMIN or DEPARTMENT_HEAD
inventoryRoutes.post("/inventory", requireAuth, requireRole("SUPER_ADMIN", "DEPARTMENT_HEAD"), inventoryController.create);
```

### 4.3 PIN-Based Report Authorization

**PIN storage:**
- PINs are separate from login passwords
- Stored as Argon2 hash on the `User` model
- PIN is a 4-6 digit numeric code
- Users set/change their own PIN after first login

**PIN verification endpoint:**

```typescript
// POST /api/auth/verify-pin
// Body: { pin: "1234" }
// Requires: authenticated user
// Returns: { valid: boolean }
```

**Authorization flow:**

```
Team Member submits report
  → status: PENDING
  → Team Leader reviews, enters PIN
    → status: TO_REVIEW (routed to System Admin)
    → System Admin reviews, can edit, enters PIN to validate
      → status: VALIDATED
      → Inventory auto-deducted
      → Audit trail recorded if edited

Department Head/Deputy submits report
  → status: PENDING
  → Dept Head enters PIN
    → status: VALIDATED (auto-validates, skips admin review)
    → Inventory auto-deducted
```

**PIN lockout policy (recommended):**
- 3 failed attempts → lock PIN for 15 minutes
- Track `pinFailedAttempts` and `pinLockedUntil` on User model
- Reset on successful PIN entry

### 4.4 Route Protection Matrix

| Method | Endpoint | Required Role(s) | Auth |
|---|---|---|---|
| POST | `/api/auth/signup` | Public (rate limited) | No |
| POST | `/api/auth/signin` | Public (rate limited) | No |
| POST | `/api/auth/refresh` | Public (rate limited) | No |
| POST | `/api/auth/logout` | Any authenticated | Yes |
| POST | `/api/auth/set-pin` | Any authenticated | Yes |
| POST | `/api/auth/verify-pin` | Any authenticated | Yes |
| GET | `/api/users` | SUPER_ADMIN | Yes + Role |
| POST | `/api/users` | SUPER_ADMIN | Yes + Role |
| PATCH | `/api/users/:id` | SUPER_ADMIN | Yes + Role |
| DELETE | `/api/users/:id` | SUPER_ADMIN | Yes + Role |
| POST | `/api/users/:id/reset-password` | SUPER_ADMIN | Yes + Role |
| GET | `/api/operations` | Any authenticated | Yes |
| POST | `/api/operations` | MEMBER+ | Yes + Role |
| PATCH | `/api/operations/:id` | MEMBER+ (own or team) | Yes + Role |
| POST | `/api/operations/:id/submit` | MEMBER (submitter) | Yes + Role |
| POST | `/api/operations/:id/authorize` | TEAM_LEADER+ | Yes + Role + PIN |
| POST | `/api/operations/:id/validate` | DEPARTMENT_HEAD+ | Yes + Role + PIN |
| POST | `/api/operations/:id/reject` | DEPARTMENT_HEAD+ | Yes + Role + PIN |
| GET | `/api/operations/:id/responders` | Any authenticated | Yes |
| POST | `/api/operations/:id/responders` | MEMBER+ | Yes + Role |
| DELETE | `/api/operations/:id/responders/:userId` | MEMBER+ | Yes + Role |
| GET | `/api/operations/:id/images` | Any authenticated | Yes |
| POST | `/api/operations/:id/images` | MEMBER+ | Yes + Role |
| DELETE | `/api/operations/:id/images/:attachmentId` | SUPER_ADMIN | Yes + Role |
| GET | `/api/patients` | Any authenticated | Yes |
| POST | `/api/patients` | MEMBER+ | Yes + Role |
| GET | `/api/patients/:id/logs` | Any authenticated | Yes |
| POST | `/api/patients/:id/logs` | MEMBER+ | Yes + Role |
| GET | `/api/patients/:id/images` | Any authenticated | Yes |
| POST | `/api/patients/:id/images` | MEMBER+ | Yes + Role |
| GET | `/api/dispatches` | Any authenticated | Yes |
| POST | `/api/dispatches` | MEMBER+ | Yes + Role |
| PATCH | `/api/dispatches/:id` | MEMBER+ | Yes + Role |
| GET | `/api/dispatches/:id/responders` | Any authenticated | Yes |
| POST | `/api/dispatches/:id/responders` | MEMBER+ | Yes + Role |
| GET | `/api/dispatches/:id/passengers` | Any authenticated | Yes |
| POST | `/api/dispatches/:id/passengers` | MEMBER+ | Yes + Role |
| GET | `/api/vehicles` | Any authenticated | Yes |
| POST | `/api/vehicles` | DEPARTMENT_HEAD+ | Yes + Role |
| PATCH | `/api/vehicles/:id` | DEPARTMENT_HEAD+ | Yes + Role |
| GET | `/api/inventory` | Any authenticated | Yes |
| POST | `/api/inventory` | DEPARTMENT_HEAD+ | Yes + Role |
| POST | `/api/inventory/stock-in` | DEPARTMENT_HEAD+ | Yes + Role |
| POST | `/api/inventory/adjust` | SUPER_ADMIN | Yes + Role |
| GET | `/api/dashboard/kpis` | Any authenticated | Yes |
| GET | `/api/archive/operations` | DEPARTMENT_HEAD+ | Yes + Role |
| POST | `/api/archive/operations/:id` | DEPARTMENT_HEAD+ | Yes + Role |
| POST | `/api/backup/create` | SUPER_ADMIN | Yes + Role |
| POST | `/api/backup/restore` | SUPER_ADMIN | Yes + Role |

### 4.5 Convention for New Protected Routes

When adding a new endpoint, follow this pattern:

```typescript
// routes/feature.routes.ts
import { Router } from "express";
import { requireAuth } from "@/middleware/auth.middleware";
import { requireRole } from "@/middleware/auth.middleware";
import { featureController } from "@/controllers/feature.controller";

export const featureRoutes = Router();

// Read — any authenticated user
featureRoutes.get("/features", requireAuth, featureController.list);

// Write — specific roles only
featureRoutes.post(
  "/features",
  requireAuth,
  requireRole("SUPER_ADMIN", "DEPARTMENT_HEAD"),
  featureController.create
);
```

**Checklist for new endpoints:**
1. Add Zod schema in `schemas/`
2. Add types in `types/`
3. Add service methods in `services/`
4. Add controller in `controllers/`
5. Add routes in `routes/`
6. Wire routes in `routes/index.ts`
7. Apply `requireAuth` to all non-public routes
8. Apply `requireRole(...)` for role-restricted routes
9. Add PIN verification for authorization endpoints
10. Add tests for auth + role + PIN flows

---


---

## 5. New Entity Conventions

### ERD Reference

All entities are defined in `docs/new_erd.md`. The schema contains **20 tables** across 6 domains:

| Domain | Tables |
|---|---|
| **User & Access** | `users` |
| **Emergency Operations** | `response_team`, `operation_logs`, `operation_responders`, `persons_involved`, `vehicles` |
| **Patient & Transport** | `patients`, `patient_logs`, `patient_responders`, `vehicular_dispatch`, `vehicular_dispatch_responders`, `civilian_passengers` |
| **Inventory** | `inventory_items`, `inventory_transactions`, `operation_inventory` |
| **Image Attachments** | `operation_image_attachments`, `patient_image_attachments` |
| **Audit & Archive** | `operation_log_edits`, `operation_log_archives`, `inventory_archives` |

**Note:** `medical_records` and `patient_transport` from old ERD are removed. Medical data is now inline on `patient_logs` (bp, pr, spo2, temp, medical_assessment). Transport details are part of `vehicular_dispatch`.

### Key Schema Changes (Old ERD → New ERD)

| Change | Details |
|---|---|
| `operation_logs` simplified | Removed `area`, `vehicle_id`, `driver_id`, `depart_time`, `arrival_time`, `image_url` — vehicle/dispatch info now in `vehicular_dispatch` |
| `operation_responders` added | Many-to-many join table — which users responded to which operation |
| `persons_involved` simplified | `full_name` replaces `surname/first_name/middle_initial/suffix`; `sex` replaces `gender`; removed `barangay` |
| `inventory_items` extended | Added `stock_type` field |
| `patients` simplified | `full_name` replaces `surname/first_name/middle_initial/suffix`; removed `age` |
| `patient_logs` extended | Added `name_of_caller`, `hospital_name`, `hospital_representative`, `hospital_in_time`, `hospital_out_time`; removed `responder_id` (now in `patient_responders`) |
| `patient_responders` added | Many-to-many join table — which users responded to which patient log |
| `patient_transport` removed | Merged into `vehicular_dispatch` |
| `vehicular_dispatch` added | Links to optional `operation_id` and optional `patient_log_id`; includes vehicle, driver, times, locations, `dispatch_type`, odometer |
| `vehicular_dispatch_responders` added | Many-to-many join table — which users were on which dispatch |
| `civilian_passengers` added | Non-responder occupants per dispatch |
| `operation_image_attachments` added | Separate table for operation scene photos |
| `patient_image_attachments` added | Separate table for patient waiver/consent images |
| `medical_records` removed | Medical info now inline on `patient_logs` (bp, pr, spo2, temp, medical_assessment) |

### Enums (New ERD)

```text
Role:           DEPARTMENT_HEAD, DEPUTY, TEAM_LEADER, MEMBER
OperationStatus: PENDING, VALIDATED, REJECTED, ARCHIVED
Gender:         MALE, FEMALE
InventoryTransactionType: STOCK_IN, STOCK_OUT, ADJUSTMENT
VehicleStatus:  AVAILABLE, IN_USE, MAINTENANCE
PatientRequestType: INTER_FACILITY_TRANSFER, PICK_UP, DROP_OFF
```

**Note:** `PatientTransportType` is removed (no more `patient_transport` table). `dispatch_type` on `vehicular_dispatch` uses `DROP_OFF` / `PICK_UP`.

### Adding a New Prisma Model

1. Define in `prisma/schema.prisma` — follow patterns from `new_erd.md`:

```prisma
model OperationLog {
  operation_id        String          @id @default(uuid())
  team_id             String
  operation_date      DateTime
  name_of_caller      String
  nature_of_operation String
  event_description   String
  submitted_by        String
  validated_by        String?
  status              OperationStatus @default(PENDING)
  createdAt           DateTime        @default(now())
  updatedAt           DateTime        @updatedAt

  team            ResponseTeam          @relation(fields: [team_id], references: [team_id])
  submitter       User                  @relation("SubmittedBy", fields: [submitted_by], references: [user_id])
  validator       User?                 @relation("ValidatedBy", fields: [validated_by], references: [user_id])
  responders      OperationResponder[]
  personsInvolved PersonsInvolved[]
  inventoryItems  OperationInventory[]
  edits           OperationLogEdit[]
  archive         OperationLogArchive?
  dispatches      VehicularDispatch[]
  images          OperationImageAttachment[]

  @@index([team_id])
  @@index([submitted_by])
  @@index([status])
  @@index([operation_date])
}

model OperationResponder {
  operation_id String
  user_id      String

  operation OperationLog @relation(fields: [operation_id], references: [operation_id], onDelete: Cascade)
  user      User         @relation(fields: [user_id], references: [user_id])

  @@id([operation_id, user_id])
}

model VehicularDispatch {
  dispatch_id       String             @id @default(uuid())
  operation_id      String?
  patient_log_id    String?
  dispatch_date     DateTime
  submitted_by      String
  vehicle_id        String?
  driver_id         String?
  depart_time       DateTime?
  arrival_time      DateTime?
  brgy_in_time      DateTime?
  brgy_out_time     DateTime?
  dispatch_type     String?
  from_location     String?
  to_location       String?
  odometer_in       Int?
  odometer_out      Int?
  createdAt         DateTime           @default(now())
  updatedAt         DateTime           @updatedAt

  operation   OperationLog?              @relation(fields: [operation_id], references: [operation_id])
  patientLog  PatientLog?                @relation(fields: [patient_log_id], references: [patient_log_id])
  vehicle     Vehicle?                   @relation(fields: [vehicle_id], references: [vehicle_id])
  driver      User?                      @relation("DispatchDriver", fields: [driver_id], references: [user_id])
  submitter   User                       @relation("DispatchSubmitter", fields: [submitted_by], references: [user_id])
  responders  VehicularDispatchResponder[]
  passengers  CivilianPassenger[]

  @@index([operation_id])
  @@index([patient_log_id])
}
```

2. Run `npx prisma migrate dev --name [description]`
3. Add branded type for the ID in `shared/types/branded.ts`
4. Add Zod schemas in `schemas/[feature].schema.ts`
5. Build service → controller → routes chain

### Testing Pattern (Vitest + Supertest)

```typescript
// tests/auth.integration.test.ts
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import { app } from "@/app";

describe("Auth", () => {
  it("should sign up a new user", async () => {
    const res = await request(app)
      .post("/api/auth/signup")
      .send({ name: "Test User", username: "testuser", password: "password123" });

    expect(res.status).toBe(201);
    expect(res.body.user).toHaveProperty("user_id");
    expect(res.body).toHaveProperty("accessToken");
  });

  it("should reject duplicate username", async () => {
    await request(app)
      .post("/api/auth/signup")
      .send({ name: "Test", username: "testuser", password: "password123" });

    const res = await request(app)
      .post("/api/auth/signup")
      .send({ name: "Test 2", username: "testuser", password: "password123" });

    expect(res.status).toBe(409);
  });
});
```

Run tests with: `npx vitest`