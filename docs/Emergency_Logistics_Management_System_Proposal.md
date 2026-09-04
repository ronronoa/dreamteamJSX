# Emergency Logistics Management System

## Project Proposal

**Project Title:** Emergency Logistics Management System for Barangay 176-E Disaster Risk Reduction and Management Office and Health Emergency Response Team (BDRRMO & BHERT)

**Submitted by:** DreamTeam Labs  
**Course:** CSE 101 - System Fundamentals  
**Institution:** University of Caloocan City – Congress Campus, Computer Studies Department  
**Date:** August 13, 2026

---

## 1. Project Objectives

### General Objective

To develop an **Emergency Logistics Management System** using:

- **Frontend:** React and Electron
- **Backend:** JavaScript, TypeScript, Prisma ORM, Node.js, and Express Framework
- **Database:** PostgreSQL
- **Authentication:** JWT
- **Development Period:** 4 months

### Specific Objectives

1. Log operation details, including:
   - Date
   - Name of user
   - Nature of operation
   - Response team
   - Name, age, and address of involved people
   - Image from the scene of operation
   - Event description

   For medical operations, also record:
   - Assessment/description
   - Blood pressure
   - Pulse rate
   - Oxygen saturation
   - Temperature

2. Log patient details, including:
   - Request type:
     - Transport Assistance
     - Emergency
     - Inter-Facility Transfer
     - First Aid
   - Date
   - Origin and destination
   - Patient name
   - Age
   - Gender
   - Birthday
   - Address (phase, package, block, lot)
   - Contact person
   - Contact number
   - Medical assessment
   - Blood pressure
   - Pulse rate
   - Oxygen saturation
   - Temperature
   - Ambulance driver
   - Responder/s
   - Barangay out/in time
   - Hospital out/in time
   - Odometer out/in
   - Hospital name
   - Hospital representative

3. Log vehicular dispatch details:
   - Date
   - Names of people in the vehicle
   - Destination
   - Departure time
   - Arrival time

4. Authorize report submission using a PIN:
   - Team Leader authorization routes the report to the System Admin for review and validation.
   - Department Head or Deputy authorization automatically validates the report.

5. Provide administrator login using credentials.

6. Manage inventory of:
   - Medical supplies
   - Drugs
   - Materials used in operations

7. Provide user account management:
   - Create user accounts
   - Assign roles
   - Reset passwords
   - Delete user accounts

8. Allow authorized administrators to:
   - Review entered logs
   - Edit logs
   - Validate logs
   - Save validated records to the database

9. Automatically update inventory stock counts.

10. Automatically create scheduled PostgreSQL database backups for data recovery.

11. Archive reports and inventory records with date-based filtering.

12. Display report records with smart filtering on the Admin Panel:
   - Operation Logs
   - Patient Logs
   - Vehicular Dispatch Records

13. Display inventory stock records with smart filtering.

14. Display dashboard KPIs and graphs based on:
   - Operation data
   - Inventory data

15. Print:
   - Operation logs
   - Patient logs
   - Vehicular dispatch records
   - Inventory records
   - KPIs and graphs

---

# 2. Scope

## 2.1 Report Forms

System users can select and complete one of the following forms:

- Operation Log Form
- Patient Log Form
- Vehicular Dispatch Form

After completing the required details, the user can submit the report.

## 2.2 Submitted Operation Log Authentication

An authorized system user enters a PIN to authorize a submitted report.

### Team Leader Authorization

If authorized by a Team Leader:

1. The report is submitted.
2. The report goes under System Admin review.
3. The System Admin validates the report.
4. Once validated, the data enters the database.

### System Admin Authorization

If authorized by a System Admin:

1. The report is authorized.
2. The report is automatically validated.
3. The validated data enters the database.

## 2.3 Admin Login

The Admin Panel is accessible to authorized administrative roles, including:

- Department Head
- Department Deputy
- IT Support personnel

### Super Admin

The Super Admin is intended for IT support personnel and can:

- Create user accounts
- Assign user roles
- Reset user passwords
- Delete user accounts

## 2.4 Admin Panel

The Admin Panel is used to:

- Validate submitted operation logs
- View records
- Manage inventory
- View dashboard KPIs
- Review reports
- Archive records
- Print records
- Manage users

### 2.4.1 Dashboard

The dashboard displays Key Performance Indicators (KPIs) based on operation and inventory data.

Examples include:

- Most recorded nature of operation
- Most frequently recorded operation area
- Most used inventory stock
- Other KPIs required by the department

### 2.4.2 Submitted Reports Validation

System administrators can review submitted reports.

If information is inaccurate:

1. The administrator may edit the report.
2. The report is labeled as **"edited by admin x."**
3. The validated data is entered into the database.

### 2.4.3 Reports Table of Records

Administrators can view database records for:

- Operation Logs
- Patient Logs
- Vehicular Dispatch Records

Records can be filtered using smart filtering.

### 2.4.4 Archive Records

Administrators can archive selected reports from the records.

### 2.4.5 Print Records

Administrators can print records, including:

- KPIs
- Graphs
- Report records

### 2.4.6 Inventory Management

Administrators can:

- Add stock items
- View inventory stocks
- Filter inventory records
- Archive inventory records
- Print inventory records

When adding stock items, the system records the name of the logged-in administrator.

### 2.4.7 User Management

Authorized administrators can:

- Create users
- Assign roles
- Reset passwords
- Delete users

---

# 3. User Roles

The system supports predefined user roles:

| Role | Main Responsibility |
|---|---|
| **Super Admin** | Manage user accounts and roles; intended for IT support personnel |
| **Department Head** | Administrative authorization and system operations |
| **Department Deputy** | Administrative authorization and system operations |
| **Team Leader** | Authorize submitted reports for System Admin review |
| **Team Member** | Enter and submit operational reports |

> The exact permissions of Department Head, Department Deputy, and Team Member beyond the behaviors explicitly stated in the proposal are not further specified.

---

# 4. Main System Modules

The proposal can be organized into the following major modules:

### 4.1 Authentication & Authorization

- User login
- JWT authentication
- PIN-based report authorization
- Role-based access control

### 4.2 Operation Log

- Operation details
- Response team information
- People involved
- Event description
- Scene image
- Medical information when applicable

### 4.3 Patient Log

- Patient information
- Request type
- Origin/destination
- Medical assessment
- Vital signs
- Response team
- Ambulance information
- Hospital information
- Time and odometer records

### 4.4 Vehicular Dispatch

- Vehicle occupants
- Destination
- Departure time
- Arrival time

### 4.5 Report Validation

- Submitted report review
- Admin editing
- Validation
- Authorization tracking

### 4.6 Inventory Management

- Medical supplies
- Drugs
- Materials
- Stock counts
- Stock filtering
- Inventory archiving
- Inventory printing

### 4.7 User Management

- Account creation
- Role assignment
- Password reset
- Account deletion

### 4.8 Records & Archives

- Report records
- Inventory records
- Smart filtering
- Date filtering
- Archiving
- Printing

### 4.9 Dashboard & Analytics

- KPIs
- Graphs
- Operation statistics
- Inventory statistics

### 4.10 Database Backup & Recovery

- Scheduled PostgreSQL backups
- Local backup storage
- Database restoration

---

# 5. Report Authorization Flow

```text
User completes report
        |
        v
   Submit Report
        |
        v
    PIN Entry
        |
        +----------------------+
        |                      |
        v                      v
 Team Leader             Department Head /
 Authorization              Deputy
        |                      |
        v                      v
 System Admin Review      Auto-Validation
        |                      |
        v                      |
 Edit if needed               |
        |                      |
        v                      |
     Validate <---------------+
        |
        v
 Database
```

---

# 6. Inventory Flow

```text
Operation Report
      |
      v
 Report Validation
      |
      v
 Update Inventory
      |
      v
 Updated Stock Count
```

The proposal specifies that inventory is updated **only after a report has been validated**.

---

# 7. Limitations

1. The system can only operate in an **offline environment**.

2. The system can only be accessed by authorized users with predefined roles:
   - Super Admin
   - Department Head
   - Department Deputy
   - Team Leader
   - Team Member

3. The system can only manage:
   - Operation logs
   - Patient logs
   - Vehicular dispatch reports
   - Inventory records
   - User accounts

   for **one emergency response department**.

4. Reports, details, and images must be manually entered by users.

5. Medical information can only be recorded for operations classified as medical.

6. Inventory can only be updated after a report has been validated.

7. Submitted reports can only be authorized through PIN entry by:
   - Team Leader, subject to Admin review
   - System Admin, with automatic validation

8. Only the Super Admin can create, modify, or delete user accounts and roles.

9. Only authorized administrators can validate, edit, archive, and print records according to their assigned roles.

10. The dashboard can only generate predefined KPIs based on recorded reports and inventory data.

11. Database backup and restoration can only use **local storage**.

12. Operation log and inventory records can only be printed with date-based filtering.

---

# 8. Technical Stack

| Layer | Technology |
|---|---|
| Desktop Frontend | React + Electron |
| Backend | Node.js + Express |
| Languages | JavaScript + TypeScript |
| Database | PostgreSQL |
| Authentication | JWT |
| Application Environment | Offline |
| Backup Storage | Local Storage |

---

# 9. Requirements Summary

## Functional Requirements

- [ ] User authentication
- [ ] Role-based access
- [ ] Operation log creation
- [ ] Patient log creation
- [ ] Vehicular dispatch logging
- [ ] Medical information recording
- [ ] Scene image recording
- [ ] PIN-based authorization
- [ ] Admin report validation
- [ ] Admin report editing
- [ ] Inventory management
- [ ] Automatic inventory stock updates
- [ ] User management
- [ ] Report filtering
- [ ] Inventory filtering
- [ ] Report archiving
- [ ] Inventory archiving
- [ ] Dashboard KPIs
- [ ] Dashboard graphs
- [ ] Report printing
- [ ] Inventory printing
- [ ] Scheduled database backups
- [ ] Database restoration

## Non-Functional / Operational Constraints

- [ ] Operates offline
- [ ] Uses predefined user roles
- [ ] Supports one emergency response department
- [ ] Uses local storage for database backups
- [ ] Uses PostgreSQL as the database
- [ ] Uses JWT for authentication

---

# 10. Proposal Analysis

## Strengths

### Clear system purpose

The proposal has a clearly defined purpose: managing emergency operation reports, patient records, vehicular dispatches, inventory, users, and administrative validation for Barangay 176-E BDRRMO/BHERT.

### Well-defined core records

The three primary operational records are clearly identified:

1. Operation Log
2. Patient Log
3. Vehicular Dispatch

This provides a good foundation for designing the database and application modules.

### Role-based authorization

The proposal clearly establishes different roles and introduces PIN-based authorization for submitted reports.

### Administrative workflow

The Team Leader → System Admin review process is clearly described, including the ability of administrators to edit inaccurate information before validation.

### Inventory integration

The proposal connects validated operational reports with inventory stock updates, allowing the system to support logistics management rather than simply functioning as a reporting system.

### Reporting and analytics

The inclusion of filtering, archiving, printing, KPIs, and graphs makes the system useful for administrative monitoring and historical record management.

---

# 11. Important Design Considerations

The proposal provides the functional requirements, but several implementation details are not explicitly defined and will need to be decided during system design.

### 11.1 Role Permissions

The proposal explicitly defines Super Admin capabilities and Team Leader authorization, but the exact permissions for every administrative role are not fully detailed.

A permission matrix should therefore be created before implementation.

### 11.2 Inventory Deduction Rules

The proposal states that inventory automatically updates after report validation, but it does not specify:

- Which inventory items are deducted by each operation
- How quantities are entered
- Whether deductions are manual or automatically calculated
- What happens when stock reaches zero
- Whether stock adjustments are tracked separately

These rules should be defined before implementing inventory automation.

### 11.3 PIN Management

The proposal specifies PIN-based authorization but does not define:

- Who receives a PIN
- Whether each user has an individual PIN
- How PINs are changed or reset
- Maximum failed attempts
- PIN expiration
- Whether PIN authorization is logged

These details should be specified for a complete authorization design.

### 11.4 Audit Trail

The proposal mentions that edited reports are labeled as **"edited by admin x."**

For implementation, an audit trail should define what information is recorded when a report is edited, such as:

- Administrator
- Date and time
- Changed field
- Previous value
- New value

The proposal itself does not specify the complete audit-trail structure.

### 11.5 Backup Strategy

The proposal requires scheduled PostgreSQL backups and local storage, but does not specify:

- Backup frequency
- Number of retained backups
- Backup file format
- Backup rotation
- Restoration procedure

These should be defined during system design.

### 11.6 Offline Architecture

Because the system is explicitly limited to an offline environment, the architecture needs to ensure that the React/Electron application, Node.js/Express backend, and PostgreSQL database can operate locally.

---

# 12. Suggested High-Level Architecture

```text
+---------------------------+
|       Electron App        |
|      React Frontend       |
+-------------+-------------+
              |
              v
+---------------------------+
|     Node.js + Express     |
|   Authentication / API    |
|   Business Logic / RBAC   |
+-------------+-------------+
              |
              v
+---------------------------+
|        PostgreSQL         |
| Reports / Users / Stock   |
|       / Audit Data        |
+-------------+-------------+
              |
              v
+---------------------------+
|     Local Backup Store    |
|   PostgreSQL Backups      |
+---------------------------+
```

---

# 13. Core Data Areas

Based strictly on the proposal, the system will need to manage information related to:

- Users
- Roles
- Operation Logs
- People involved in operations
- Medical assessments
- Vital signs
- Patients
- Patient requests
- Response teams
- Ambulance drivers
- Responders
- Hospitals
- Vehicular dispatches
- Vehicles/vehicle occupants
- Inventory items
- Stock records
- Report authorization
- Report validation
- Archived records
- Database backups
- Dashboard metrics

> The exact database table structure is not specified in the proposal and should be finalized during database design.

---

# 14. Project Summary

The proposed **Emergency Logistics Management System** is an offline desktop-based system designed for Barangay 176-E BDRRMO/BHERT. Its primary purpose is to centralize emergency operation reporting, patient records, vehicular dispatch records, inventory management, user management, administrative validation, reporting, analytics, and database backup.

The proposed technology stack consists of **React + Electron** for the frontend, **Node.js + Express** with JavaScript/TypeScript for the backend, **PostgreSQL** for data storage, and **JWT** for authentication.

The core workflow is based on manually entered reports that undergo PIN-based authorization and administrative validation before becoming validated database records. Inventory updates are tied to validated reports, while administrators can filter, archive, print, and analyze operational and inventory records.

The proposal defines the system's functional scope and limitations clearly, while implementation-specific details such as exact role permissions, inventory deduction rules, PIN management, audit logging, and backup policies still need to be specified during the system design phase.

---

## Approval

**Submitted by:** DreamTeam Labs

**Members:**
- Bebania, Jan Aryan C.
- Casenillo, Dwayne Ruper M.
- Fajardo, Maron E.
- Sollano, Shaira Marie A.
- Taeza, Rex V.

**Approved by:**  
Prof. Joemen G. Barrios, MIT  
Course Adviser

**Accepted by:**  
Barangay 176-E Disaster Risk Reduction and Management Office and Health Emergency Response Team
