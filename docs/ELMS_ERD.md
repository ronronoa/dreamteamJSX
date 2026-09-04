# Emergency Logistics Management System — ERD

## Entity Relationship Diagram Documentation

This document represents the entities, fields, data types, and relationships shown in the provided ERD for the **Emergency Logistics Management System**.

> This Markdown documents the ERD as provided. It does not add or modify entities, fields, or relationships that are not explicitly represented in the source.

---

# 1. Users

Stores system user accounts and their assigned roles.

| Field | Type |
|---|---|
| `user_id` | uuid |
| `name` | varchar |
| `username` | varchar |
| `passwordHash` | varchar |
| `role` | enum(`DEPARTMENT_HEAD`, `DEPUTY`, `TEAM_LEADER`, `MEMBER`) |
| `createdAt` | datetime |
| `updatedAt` | datetime |

---

# 2. Response Team

Stores response team information.

| Field | Type |
|---|---|
| `team_id` | uuid |
| `team_name` | varchar |
| `createdAt` | datetime |
| `updatedAt` | datetime |

---

# 3. Operation Logs

Stores emergency operation records.

| Field | Type |
|---|---|
| `operation_id` | uuid |
| `team_id` | uuid |
| `operation_date` | datetime |
| `name_of_caller` | varchar |
| `nature_of_operation` | varchar |
| `area` | varchar |
| `vehicle_id` | uuid |
| `driver_id` | uuid |
| `depart_time` | datetime |
| `arrival_time` | datetime |
| `event_description` | text |
| `submitted_by` | uuid |
| `validated_by` | uuid |
| `status` | enum(`PENDING`, `VALIDATED`, `REJECTED`, `ARCHIVED`) |
| `createdAt` | datetime |
| `updatedAt` | datetime |

---

# 4. Persons Involved

Stores people involved in an operation.

| Field | Type |
|---|---|
| `person_id` | uuid |
| `operation_id` | uuid |
| `surname` | varchar |
| `first_name` | varchar |
| `middle_initial` | varchar |
| `suffix` | varchar |
| `age` | int |
| `gender` | enum(`MALE`, `FEMALE`) |
| `contact_no` | varchar |
| `barangay` | varchar |
| `address` | text |

---

# 5. Medical Records

Stores medical information associated with an operation.

| Field | Type |
|---|---|
| `medical_id` | uuid |
| `operation_id` | uuid |
| `vital_signs` | text |
| `first_aid_performed` | text |
| `createdAt` | datetime |
| `updatedAt` | datetime |

---

# 6. Inventory Items

Stores medical supplies, drugs, and other inventory materials.

| Field | Type |
|---|---|
| `item_id` | uuid |
| `item_name` | varchar |
| `category` | varchar |
| `unit` | varchar |
| `stock_quantity` | integer |
| `createdAt` | datetime |
| `updatedAt` | datetime |

---

# 7. Inventory Transactions

Stores changes made to inventory stock.

| Field | Type |
|---|---|
| `transaction_id` | uuid |
| `item_id` | uuid |
| `user_id` | uuid |
| `transaction_type` | enum(`STOCK_IN`, `STOCK_OUT`, `ADJUSTMENT`) |
| `quantity` | integer |
| `transaction_date` | datetime |

---

# 8. Operation Inventory

Associates inventory items with operation logs and records the quantity used.

| Field | Type |
|---|---|
| `operation_id` | uuid |
| `item_id` | uuid |
| `quantity` | integer |

---

# 9. Operation Log Edits

Stores administrative edits made to operation logs.

| Field | Type |
|---|---|
| `edit_id` | uuid |
| `operation_id` | uuid |
| `admin_id` | uuid |
| `edit_notes` | text |
| `editedAt` | datetime |

---

# 10. Operation Log Archives

Stores archived operation log records.

| Field | Type |
|---|---|
| `archive_id` | uuid |
| `operation_id` | uuid |
| `archived_by` | uuid |
| `archivedAt` | datetime |

---

# 11. Inventory Archives

Stores archived inventory records.

| Field | Type |
|---|---|
| `archive_id` | uuid |
| `item_id` | uuid |
| `archived_by` | uuid |
| `archivedAt` | datetime |

---

# 12. Vehicles

Stores vehicles used by the emergency response team.

| Field | Type |
|---|---|
| `vehicle_id` | uuid |
| `vehicle_name` | varchar |
| `plate_number` | varchar |
| `status` | enum(`AVAILABLE`, `IN_USE`, `MAINTENANCE`) |
| `createdAt` | datetime |
| `updatedAt` | datetime |

---

# 13. Patients

Stores patient information.

| Field | Type |
|---|---|
| `patient_id` | uuid |
| `surname` | varchar |
| `first_name` | varchar |
| `middle_initial` | varchar |
| `suffix` | varchar |
| `gender` | enum(`MALE`, `FEMALE`) |
| `birthday` | date |
| `age` | int |
| `contact_person` | varchar |
| `contact_number` | varchar |
| `phase` | varchar |
| `package` | varchar |
| `block` | varchar |
| `lot` | varchar |
| `createdAt` | datetime |
| `updatedAt` | datetime |

---

# 14. Patient Logs

Stores patient-related emergency requests and medical information.

| Field | Type |
|---|---|
| `patient_log_id` | uuid |
| `patient_id` | uuid |
| `log_date` | datetime |
| `type_of_request` | enum(`INTER_FACILITY_TRANSFER`, `PICK_UP`, `DROP_OFF`) |
| `submitted_by` | uuid |
| `responder_id` | uuid |
| `medical_assessment` | text |
| `bp` | varchar |
| `pr` | varchar |
| `spo2` | varchar |
| `temp` | varchar |
| `createdAt` | datetime |
| `updatedAt` | datetime |

---

# 15. Patient Transport

Stores transportation details associated with a patient log.

| Field | Type |
|---|---|
| `transport_id` | uuid |
| `patient_log_id` | uuid |
| `transport_type` | enum(`DROP_OFF`, `PICK_UP`) |
| `from_location` | varchar |
| `to_location` | varchar |
| `vehicle_id` | uuid |
| `driver_id` | uuid |
| `brgy_in_time` | datetime |
| `brgy_out_time` | datetime |
| `odometer_in` | integer |
| `odometer_out` | integer |
| `hospital_name` | varchar |
| `hospital_representative` | varchar |
| `hospital_in_time` | datetime |
| `hospital_out_time` | datetime |
| `createdAt` | datetime |
| `updatedAt` | datetime |

---

# 16. Enum Definitions

## User Role

```text
DEPARTMENT_HEAD
DEPUTY
TEAM_LEADER
MEMBER
```

## Operation Log Status

```text
PENDING
VALIDATED
REJECTED
ARCHIVED
```

## Gender

```text
MALE
FEMALE
```

## Inventory Transaction Type

```text
STOCK_IN
STOCK_OUT
ADJUSTMENT
```

## Vehicle Status

```text
AVAILABLE
IN_USE
MAINTENANCE
```

## Patient Request Type

```text
INTER_FACILITY_TRANSFER
PICK_UP
DROP_OFF
```

## Patient Transport Type

```text
DROP_OFF
PICK_UP
```

---

# 17. Relationship Summary

The ERD contains relationships connecting users, teams, operations, patients, vehicles, inventory, and administrative records.

| Relationship | Related Entity |
|---|---|
| `response_team.team_id` → `operation_logs.team_id` | Response Team → Operation Logs |
| `operation_logs.operation_id` → `persons_involved.operation_id` | Operation Log → Persons Involved |
| `operation_logs.operation_id` → `medical_records.operation_id` | Operation Log → Medical Records |
| `inventory_items.item_id` → `inventory_transactions.item_id` | Inventory Item → Inventory Transactions |
| `users.user_id` → `inventory_transactions.user_id` | User → Inventory Transactions |
| `operation_logs.operation_id` → `operation_inventory.operation_id` | Operation Log → Operation Inventory |
| `inventory_items.item_id` → `operation_inventory.item_id` | Inventory Item → Operation Inventory |
| `operation_logs.operation_id` → `operation_log_edits.operation_id` | Operation Log → Operation Log Edits |
| `users.user_id` → `operation_log_edits.admin_id` | User → Operation Log Edits |
| `operation_logs.operation_id` → `operation_log_archives.operation_id` | Operation Log → Operation Log Archives |
| `users.user_id` → `operation_log_archives.archived_by` | User → Operation Log Archives |
| `inventory_items.item_id` → `inventory_archives.item_id` | Inventory Item → Inventory Archives |
| `users.user_id` → `inventory_archives.archived_by` | User → Inventory Archives |
| `vehicles.vehicle_id` → `operation_logs.vehicle_id` | Vehicle → Operation Logs |
| `users.user_id` → `operation_logs.driver_id` | User → Operation Logs |
| `users.user_id` → `operation_logs.submitted_by` | User → Operation Logs |
| `users.user_id` → `operation_logs.validated_by` | User → Operation Logs |
| `patients.patient_id` → `patient_logs.patient_id` | Patient → Patient Logs |
| `users.user_id` → `patient_logs.submitted_by` | User → Patient Logs |
| `users.user_id` → `patient_logs.responder_id` | User → Patient Logs |
| `patient_logs.patient_log_id` → `patient_transport.patient_log_id` | Patient Log → Patient Transport |
| `vehicles.vehicle_id` → `patient_transport.vehicle_id` | Vehicle → Patient Transport |
| `users.user_id` → `patient_transport.driver_id` | User → Patient Transport |

---

# 18. High-Level ERD Structure

```text
                         +----------------+
                         |     USERS      |
                         +-------+--------+
                                 |
             +-------------------+-------------------+
             |                   |                   |
             v                   v                   v
      +-------------+    +---------------+    +---------------+
      |  OPERATION  |    |   INVENTORY   |    |    PATIENT    |
      |    LOGS     |    | TRANSACTIONS  |    |     LOGS      |
      +------+------+    +-------+-------+    +-------+-------+
             |                   |                    |
       +-----+-----+             |                    v
       |           |             |           +------------------+
       v           v             v           | PATIENT TRANSPORT|
+-------------+ +-----------+ +-----------+  +--------+---------+
|   PERSONS   | |  MEDICAL  | | INVENTORY |           |
|  INVOLVED   | |  RECORDS  | |   ITEMS   |           |
+-------------+ +-----------+ +-----+-----+           |
                                      |                |
                                      v                v
                              +---------------+    +---------+
                              |   OPERATION   |    | VEHICLES|
                              |   INVENTORY   |    +---------+
                              +---------------+

Operation Logs
      |
      +--> Operation Log Edits
      |
      +--> Operation Log Archives

Inventory Items
      |
      +--> Inventory Archives

Response Team
      |
      +--> Operation Logs
```

---

# 19. ERD Domain Grouping

## User & Access Domain

- `users`

## Emergency Operations Domain

- `response_team`
- `operation_logs`
- `persons_involved`
- `medical_records`
- `vehicles`

## Patient & Transport Domain

- `patients`
- `patient_logs`
- `patient_transport`

## Inventory Domain

- `inventory_items`
- `inventory_transactions`
- `operation_inventory`
- `inventory_archives`

## Audit & Archive Domain

- `operation_log_edits`
- `operation_log_archives`
- `inventory_archives`

---

# 20. ERD-to-Proposal Alignment

The ERD provides database structures for most of the major modules defined in the project proposal.

| Proposal Feature | ERD Support |
|---|---|
| Operation Logs | `operation_logs` |
| People Involved | `persons_involved` |
| Medical Information | `medical_records` |
| Patient Logs | `patients`, `patient_logs` |
| Patient Transport | `patient_transport` |
| Vehicular Information | `vehicles` |
| Response Teams | `response_team` |
| Inventory | `inventory_items` |
| Inventory Transactions | `inventory_transactions` |
| Inventory Used in Operations | `operation_inventory` |
| Admin Edits | `operation_log_edits` |
| Operation Archives | `operation_log_archives` |
| Inventory Archives | `inventory_archives` |
| Users and Roles | `users` |
| Report Status | `operation_logs.status` |

The provided ERD does **not explicitly show a separate database entity for scheduled backups, dashboard KPIs/graphs, or PIN records**. Those features are present in the project proposal but are not represented as standalone entities in the provided ERD.

---

# 21. Notes

- Primary key and foreign key constraints are represented through the UUID fields and the relationships shown in the ERD.
- `operation_inventory` functions as the association between operations and inventory items.
- `inventory_transactions` records inventory movement such as stock-in, stock-out, and adjustments.
- `operation_log_edits`, `operation_log_archives`, and `inventory_archives` provide structures for administrative tracking and archiving.
- The ERD contains four user roles: `DEPARTMENT_HEAD`, `DEPUTY`, `TEAM_LEADER`, and `MEMBER`.
- The source ERD uses `datetime` for timestamp fields and `date` for patient birthdays.
