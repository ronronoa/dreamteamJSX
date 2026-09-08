# API Endpoints Reference

## Emergency Logistics Management System (ELMS-BDRRMO)

## 1. Auth & PIN — Built

| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| `POST` | `/api/auth/signup` | Public (rate limited) | Register new user |
| `POST` | `/api/auth/signin` | Public (rate limited) | Login, returns JWT tokens |
| `POST` | `/api/auth/refresh` | Public (rate limited) | Refresh access token |
| `POST` | `/api/auth/logout` | Any authenticated | Revoke refresh token |
| `POST` | `/api/auth/set-pin` | Any authenticated | Set or change PIN (4-6 digits) |
| `POST` | `/api/auth/verify-pin` | Any authenticated | Verify PIN for report authorization |

---

## 2. User Management — Phase 2

> Super Admin only. All endpoints require `requireAuth` + `requireRole("SUPER_ADMIN")`.

| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| `GET` | `/api/users` | SUPER_ADMIN | List all users |
| `POST` | `/api/users` | SUPER_ADMIN | Create user account |
| `PATCH` | `/api/users/:id` | SUPER_ADMIN | Update user (name, role) |
| `DELETE` | `/api/users/:id` | SUPER_ADMIN | Delete user account |
| `POST` | `/api/users/:id/reset-password` | SUPER_ADMIN | Reset password to default |

**Request/Response shapes:**

```typescript
// POST /api/users
// Body: { name: string, username: string, password: string, role: Role }
// Returns: { user: SafeUser }

// PATCH /api/users/:id
// Body: { name?: string, role?: Role }
// Returns: { user: SafeUser }

// POST /api/users/:id/reset-password
// Returns: { message: string, defaultPassword: string }
```

---

## 3. Operation Log — Phase 3-4

### 3.1 CRUD Operations

| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| `GET` | `/api/operations` | Any authenticated | List operations (filtered by role) |
| `POST` | `/api/operations` | MEMBER+ | Create operation log |
| `GET` | `/api/operations/:id` | Any authenticated | Get operation detail |
| `PATCH` | `/api/operations/:id` | MEMBER+ (submitter) | Edit draft/pending operation |

### 3.2 Authorization Workflow

| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| `POST` | `/api/operations/:id/submit` | MEMBER (submitter) | Submit for authorization (DRAFT → PENDING) |
| `POST` | `/api/operations/:id/authorize` | TEAM_LEADER+ | PIN authorize (PENDING → TO_REVIEW) |
| `POST` | `/api/operations/:id/validate` | DEPARTMENT_HEAD+ | PIN validate (TO_REVIEW → VALIDATED) |
| `POST` | `/api/operations/:id/reject` | DEPARTMENT_HEAD+ | PIN reject (TO_REVIEW → REJECTED) |

**Status transitions:**
```
MEMBER creates    → DRAFT
MEMBER submits    → PENDING
TEAM_LEADER auth  → TO_REVIEW (routes to admin)
DEPT_HEAD auth    → VALIDATED (auto-validates)
ADMIN validates   → VALIDATED
ADMIN rejects     → REJECTED
```

### 3.3 Responders

| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| `GET` | `/api/operations/:id/responders` | Any authenticated | List responders for operation |
| `POST` | `/api/operations/:id/responders` | MEMBER+ | Add responder to operation |
| `DELETE` | `/api/operations/:id/responders/:userId` | MEMBER+ | Remove responder |

### 3.4 Persons Involved

| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| `GET` | `/api/operations/:id/persons` | Any authenticated | List persons involved |
| `POST` | `/api/operations/:id/persons` | MEMBER+ | Add person involved |
| `DELETE` | `/api/operations/:id/persons/:personId` | MEMBER+ | Remove person involved |

### 3.5 Image Attachments

| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| `GET` | `/api/operations/:id/images` | Any authenticated | List operation images |
| `POST` | `/api/operations/:id/images` | MEMBER+ | Upload scene photo |
| `DELETE` | `/api/operations/:id/images/:attachmentId` | SUPER_ADMIN | Delete image |

### 3.6 Inventory Usage

| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| `GET` | `/api/operations/:id/inventory` | Any authenticated | List inventory items used in operation |
| `POST` | `/api/operations/:id/inventory` | MEMBER+ | Attach inventory item to operation |

**Request/Response shapes:**

```typescript
// POST /api/operations
// Body: {
//   teamId: string,
//   operationDate: string (ISO datetime),
//   nameOfCaller: string,
//   natureOfOperation: string,
//   eventDescription: string,
//   personsInvolved?: { fullName: string, age: number, sex: "MALE" | "FEMALE", contactNo?: string, address?: string }[],
//   responderIds?: string[]
// }
// Returns: { operation: OperationLog }

// POST /api/operations/:id/authorize
// Body: { pin: string }
// Returns: { operation: OperationLog, status: "TO_REVIEW" }

// POST /api/operations/:id/validate
// Body: { pin: string, editNotes?: string }
// Returns: { operation: OperationLog, status: "VALIDATED" }

// POST /api/operations/:id/persons
// Body: { fullName: string, age: number, sex: "MALE" | "FEMALE", contactNo?: string, address?: string }
// Returns: { person: PersonsInvolved }

// POST /api/operations/:id/inventory
// Body: { itemId: string, quantity: number }
// Returns: { operationInventory: OperationInventory }
```

---

## 4. Patient Log — Phase 5

### 4.1 Patient Records

| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| `GET` | `/api/patients` | Any authenticated | List patients |
| `POST` | `/api/patients` | MEMBER+ | Create patient record |
| `GET` | `/api/patients/:id` | Any authenticated | Get patient detail |
| `PATCH` | `/api/patients/:id` | MEMBER+ | Update patient info |

### 4.2 Patient Logs

| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| `GET` | `/api/patients/:id/logs` | Any authenticated | List patient logs |
| `POST` | `/api/patients/:id/logs` | MEMBER+ | Create patient log |

### 4.3 Patient Log Responders

| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| `GET` | `/api/patient-logs/:id/responders` | Any authenticated | List responders for patient log |
| `POST` | `/api/patient-logs/:id/responders` | MEMBER+ | Add responder to patient log |
| `DELETE` | `/api/patient-logs/:id/responders/:userId` | MEMBER+ | Remove responder |

### 4.4 Patient Image Attachments

| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| `GET` | `/api/patients/:id/images` | Any authenticated | List patient images (waivers/consents) |
| `POST` | `/api/patients/:id/images` | MEMBER+ | Upload patient image |

**Request/Response shapes:**

```typescript
// POST /api/patients
// Body: {
//   fullName: string,
//   birthday: string (ISO date),
//   sex: "MALE" | "FEMALE",
//   contactPerson: string,
//   contactNumber: string,
//   phase?: string,
//   package?: string,
//   block?: string,
//   lot?: string
// }
// Returns: { patient: Patient }

// POST /api/patients/:id/logs
// Body: {
//   logDate: string (ISO datetime),
//   typeOfRequest: "INTER_FACILITY_TRANSFER" | "PICK_UP" | "DROP_OFF",
//   nameOfCaller?: string,
//   bp?: string,
//   pr?: string,
//   spo2?: string,
//   temp?: string,
//   medicalAssessment?: string,
//   hospitalName?: string,
//   hospitalRepresentative?: string,
//   hospitalInTime?: string (ISO datetime),
//   hospitalOutTime?: string (ISO datetime),
//   responderIds?: string[]
// }
// Returns: { patientLog: PatientLog }
```

---

## 5. Vehicular Dispatch — Phase 5

### 5.1 Dispatch CRUD

| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| `GET` | `/api/dispatches` | Any authenticated | List dispatches |
| `POST` | `/api/dispatches` | MEMBER+ | Create dispatch |
| `GET` | `/api/dispatches/:id` | Any authenticated | Get dispatch detail |
| `PATCH` | `/api/dispatches/:id` | MEMBER+ | Update dispatch |

### 5.2 Dispatch Responders

| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| `GET` | `/api/dispatches/:id/responders` | Any authenticated | List dispatch responders |
| `POST` | `/api/dispatches/:id/responders` | MEMBER+ | Add responder to dispatch |
| `DELETE` | `/api/dispatches/:id/responders/:userId` | MEMBER+ | Remove responder |

### 5.3 Civilian Passengers

| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| `GET` | `/api/dispatches/:id/passengers` | Any authenticated | List civilian passengers |
| `POST` | `/api/dispatches/:id/passengers` | MEMBER+ | Add civilian passenger |
| `DELETE` | `/api/dispatches/:id/passengers/:passengerId` | MEMBER+ | Remove passenger |

**Request/Response shapes:**

```typescript
// POST /api/dispatches
// Body: {
//   operationId?: string,
//   patientLogId?: string,
//   dispatchDate: string (ISO datetime),
//   vehicleId?: string,
//   driverId?: string,
//   departTime?: string (ISO datetime),
//   arrivalTime?: string (ISO datetime),
//   brgyInTime?: string (ISO datetime),
//   brgyOutTime?: string (ISO datetime),
//   dispatchType?: "DROP_OFF" | "PICK_UP",
//   fromLocation?: string,
//   toLocation?: string,
//   odometerIn?: number,
//   odometerOut?: number,
//   responderIds?: string[],
//   passengers?: { fullName: string, age: number, sex: "MALE" | "FEMALE", contactNo?: string, barangay?: string, address?: string }[]
// }
// Returns: { dispatch: VehicularDispatch }

// POST /api/dispatches/:id/passengers
// Body: { fullName: string, age: number, sex: "MALE" | "FEMALE", contactNo?: string, barangay?: string, address?: string }
// Returns: { passenger: CivilianPassenger }
```

---

## 6. Vehicles — Phase 5

| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| `GET` | `/api/vehicles` | Any authenticated | List vehicles |
| `POST` | `/api/vehicles` | DEPARTMENT_HEAD+ | Create vehicle |
| `PATCH` | `/api/vehicles/:id` | DEPARTMENT_HEAD+ | Update vehicle (status, info) |

**Request/Response shapes:**

```typescript
// POST /api/vehicles
// Body: { vehicleName: string, plateNumber: string, status?: "AVAILABLE" | "IN_USE" | "MAINTENANCE" }
// Returns: { vehicle: Vehicle }

// PATCH /api/vehicles/:id
// Body: { vehicleName?: string, plateNumber?: string, status?: "AVAILABLE" | "IN_USE" | "MAINTENANCE" }
// Returns: { vehicle: Vehicle }
```

---

## 7. Response Teams — Phase 5

| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| `GET` | `/api/teams` | Any authenticated | List response teams |
| `POST` | `/api/teams` | DEPARTMENT_HEAD+ | Create team |
| `PATCH` | `/api/teams/:id` | DEPARTMENT_HEAD+ | Update team name |

**Request/Response shapes:**

```typescript
// POST /api/teams
// Body: { teamName: string }
// Returns: { team: ResponseTeam }
```

---

## 8. Inventory — Phase 6

| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| `GET` | `/api/inventory` | Any authenticated | List inventory items |
| `POST` | `/api/inventory` | DEPARTMENT_HEAD+ | Create inventory item |
| `PATCH` | `/api/inventory/:id` | DEPARTMENT_HEAD+ | Update inventory item |
| `POST` | `/api/inventory/stock-in` | DEPARTMENT_HEAD+ | Add stock (STOCK_IN) |
| `POST` | `/api/inventory/adjust` | SUPER_ADMIN | Manual stock adjustment |
| `GET` | `/api/inventory/:id/transactions` | Any authenticated | View transaction history |

**Request/Response shapes:**

```typescript
// POST /api/inventory
// Body: { itemName: string, category: string, unit: string, stockQuantity: number, stockType?: string }
// Returns: { item: InventoryItem }

// POST /api/inventory/stock-in
// Body: { itemId: string, quantity: number }
// Returns: { transaction: InventoryTransaction, newStock: number }

// POST /api/inventory/adjust
// Body: { itemId: string, quantity: number, reason: string }
// Returns: { transaction: InventoryTransaction, newStock: number }

// GET /api/inventory/:id/transactions
// Returns: { transactions: InventoryTransaction[] }
```

---

## 9. Dashboard & KPIs — Phase 7

| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| `GET` | `/api/dashboard/kpis` | Any authenticated | Aggregate KPIs |
| `GET` | `/api/dashboard/operations` | Any authenticated | Operation analytics |
| `GET` | `/api/dashboard/patients` | Any authenticated | Patient analytics |
| `GET` | `/api/dashboard/dispatches` | Any authenticated | Dispatch analytics |
| `GET` | `/api/dashboard/inventory` | Any authenticated | Inventory analytics |

**KPI details:**

```typescript
// GET /api/dashboard/kpis
// Returns: {
//   operations: {
//     total: number,
//     pending: number,
//     validated: number,
//     mostCommonType: { nature: string, count: number },
//     mostFrequentArea: { area: string, count: number },
//     avgResponseTime: number,
//     byTeam: { teamName: string, count: number }[],
//     medicalCount: number
//   },
//   patients: {
//     total: number,
//     demographics: { ageRange: string, count: number }[],
//     mostCommonIntervention: string
//   },
//   dispatches: {
//     total: number,
//     mostUsedVehicle: { vehicleName: string, totalHours: number }
//   },
//   inventory: {
//     mostUsedItem: { itemName: string, quantity: number },
//     lowStockAlerts: { itemName: string, currentStock: number }[],
//     topConsumed: { itemName: string, quantity: number }[],
//     netMovement: { added: number, consumed: number }
//   }
// }

// Query params for all dashboard endpoints:
// ?startDate=string&endDate=string (ISO dates)
```

---

## 10. Archiving — Phase 7

| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| `GET` | `/api/archive/operations` | DEPARTMENT_HEAD+ | List archived operations |
| `POST` | `/api/archive/operations/:id` | DEPARTMENT_HEAD+ | Archive an operation |
| `GET` | `/api/archive/inventory` | DEPARTMENT_HEAD+ | List archived inventory items |
| `POST` | `/api/archive/inventory/:id` | DEPARTMENT_HEAD+ | Archive an inventory item |

**Request/Response shapes:**

```typescript
// POST /api/archive/operations/:id
// Returns: { archive: OperationLogArchive }

// POST /api/archive/inventory/:id
// Returns: { archive: InventoryArchive }

// Query params for GET:
// ?startDate=string&endDate=string
```

---

## 11. Backup & Restore — Phase 8

| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| `POST` | `/api/backup/create` | SUPER_ADMIN | Trigger database backup |
| `POST` | `/api/backup/restore` | SUPER_ADMIN | Restore from backup |

**Request/Response shapes:**

```typescript
// POST /api/backup/create
// Returns: { message: string, backupPath: string, timestamp: string }

// POST /api/backup/restore
// Body: { backupPath: string }
// Returns: { message: string }
```

---

## 12. Health Check

| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| `GET` | `/api/health` | Public | Server health check |

```typescript
// Returns: { status: "ok", timestamp: string }
```

---

## Route Protection Matrix

| Capability | SUPER_ADMIN | DEPT HEAD | DEPUTY | TEAM LEADER | MEMBER |
|------------|:-----------:|:---------:|:------:|:-----------:|:------:|
| Manage users (CRUD) | ✅ | ❌ | ❌ | ❌ | ❌ |
| Assign roles | ✅ | ❌ | ❌ | ❌ | ❌ |
| Reset passwords | ✅ | ❌ | ❌ | ❌ | ❌ |
| Validate reports | ✅ | ✅ auto | ✅ auto | ❌ | ❌ |
| Authorize reports (PIN) | ❌ | ✅ auto-validates | ✅ auto-validates | ✅ → admin review | ❌ |
| Create operation logs | ✅ | ✅ | ✅ | ✅ | ✅ |
| Create patient logs | ✅ | ✅ | ✅ | ✅ | ✅ |
| Create dispatch logs | ✅ | ✅ | ✅ | ✅ | ✅ |
| View dashboard/KPIs | ✅ | ✅ | ✅ | ✅ | ✅ |
| View all records | ✅ | ✅ | ✅ | ✅ | own team only |
| Filter & print records | ✅ | ✅ | ✅ | ✅ | ✅ |
| Manage inventory | ✅ | ✅ | ✅ | ❌ | ❌ |
| Archive records | ✅ | ✅ | ✅ | ❌ | ❌ |
| Manage vehicles | ✅ | ✅ | ✅ | ❌ | ❌ |
| Manage teams | ✅ | ✅ | ✅ | ❌ | ❌ |
| Backup & restore | ✅ | ❌ | ❌ | ❌ | ❌ |

---

## Implementation Checklist

- [ ] Phase 2: User Management (5 endpoints)
- [ ] Phase 3: Operation Log CRUD (8 endpoints)
- [ ] Phase 4: Authorization Workflow (4 endpoints + status transitions)
- [ ] Phase 5: Patient Log (10 endpoints)
- [ ] Phase 5: Vehicular Dispatch (10 endpoints)
- [ ] Phase 5: Vehicles (3 endpoints)
- [ ] Phase 5: Response Teams (3 endpoints)
- [ ] Phase 6: Inventory (6 endpoints + auto-deduction)
- [ ] Phase 7: Dashboard & KPIs (5 endpoints)
- [ ] Phase 7: Archiving (4 endpoints)
- [ ] Phase 8: Backup & Restore (2 endpoints)
