# Tourism CRM — Codex Project Context

## Mission
Build a secure, local-first fullstack CRM system for a tourism company.

This is a browser-based internal web application. The production environment has **no internet access**. The app and database must run entirely on a local machine, company server, or internal network. Do not assume any cloud services, external APIs, or third-party hosted infrastructure.

Your role is to act as a **senior fullstack engineer and system architect**. Prefer robust, production-like solutions, but avoid unnecessary complexity. Explain tradeoffs clearly when multiple approaches are viable.

Codex should read this file as the primary project context and follow it before making code, architecture, or refactoring decisions. OpenAI documents confirm that Codex reads `AGENTS.md` files before doing work, and that these files are intended to provide project-specific guidance and standards. ([developers.openai.com](https://developers.openai.com/codex/guides/agents-md/?utm_source=chatgpt.com))

---

## Product Overview
This project is a **Tourism CRM** used only by an internal **manager** user.

The manager must be able to:
- log in and log out
- manage staff
- manage tours
- view a timeline calendar
- upload and manage documents
- inspect change history and audit logs
- use dashboards and reports
- export data to Excel and PDF

At the current stage:
- only **manager** logs into the system
- no staff self-service portal is needed
- tourists are **not** stored as individual people
- each tour stores only **touristsCount**
- one tour can have **multiple guides, multiple drivers, and multiple cooks**
- cars belong to drivers and are **not assigned to tours**
- scheduling conflicts must be checked for staff only, not cars
- timeline precision must support **hours and minutes**
- currency is **USD ($)**
- UI language is **English**

---

## Recommended Tech Stack
Use this stack by default unless a specific task clearly requires a different choice.

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- React Hook Form
- Zod
- TanStack Query
- TanStack Table

### Backend
- Next.js Route Handlers or a clean server layer inside Next.js
- TypeScript
- Drizzle ORM
- Zod for server-side validation

### Database
- PostgreSQL
- Drizzle Kit migrations

### Local infrastructure
- Docker
- docker-compose
- `.env` based local configuration

### Testing
- Vitest
- React Testing Library
- Playwright for e2e when needed

### File handling and exports
- local file storage on disk
- Excel export
- PDF export

---

## Why PostgreSQL, not SQLite
Prefer **PostgreSQL** as the local database.

Reasons:
- this is a CRM, not a tiny single-user toy project
- the domain includes many-to-many relations, audit logs, file metadata, filtering, scheduling queries, and future growth
- PostgreSQL is more robust for integrity, transactions, indexing, and scaling
- it can still run completely offline on a local machine or company server
- it avoids painful migration later if the project grows

SQLite is acceptable only for throwaway prototyping. The default architecture should assume PostgreSQL. This is an engineering recommendation based on the stated system requirements.

---

## Architecture Principles
Design the project as a **local-first, modular, type-safe fullstack application**.

### Goals
- clean architecture
- strong typing
- predictable business rules
- easy maintenance
- scalable data model
- safe offline deployment

### Frontend architecture
Use a pragmatic modular structure inspired by FSD where it helps, but do not force FSD dogmatically into backend code.

Suggested frontend layers:
- `app/` — routes, layouts, providers
- `pages/` or route segments in `app/`
- `widgets/` — large UI blocks
- `features/` — user scenarios
- `entities/` — domain-focused UI/data pieces
- `shared/` — common UI, utils, hooks, config

### Backend architecture
Use a domain-oriented server structure.

Suggested backend folders:
- `server/auth`
- `server/services`
- `server/repositories`
- `server/validators`
- `server/lib`
- `db/schema`
- `db/migrations`
- `db/seeds`

### Rule of thumb
- frontend may use FSD-style modularity
- backend should use service/repository/validator/domain separation
- business rules must never be hidden inside UI components
- database access should not leak everywhere
- validation must exist both at form level and server level

---

## Core Domain Model
The system has these core business areas:
- manager authentication
- staff management
- driver cars
- tour planning
- timeline scheduling
- document storage
- audit history
- reporting and exports

### Important modeling decision
Do **not** create separate `guides`, `drivers`, and `cooks` tables unless a later requirement truly demands different schemas.

Prefer a single `staff` table with a `role` field.

Allowed staff roles for now:
- `guide`
- `driver`
- `cook`

Benefits:
- simpler CRUD
- simpler filtering
- simpler many-to-many assignments
- easier extension in the future

Cars remain a separate entity because they belong only to drivers.

---

## Entities and Fields

### Manager
Fields:
- id
- firstName
- lastName
- email
- phone
- login
- passwordHash
- activeStatus
- createdAt
- updatedAt

### Staff
Fields:
- id
- role (`guide` | `driver` | `cook`)
- firstName
- lastName
- age
- language
- salary
- phone
- isActive
- notes
- createdAt
- updatedAt

### Car
Cars belong to drivers only.

Fields:
- id
- driverId
- mark
- model
- licensePlate
- placesCount
- notes
- isActive
- createdAt
- updatedAt

Constraints:
- a driver can own multiple cars
- a car is not required to be assigned to a tour
- car scheduling conflicts are not checked

### Tour
Fields:
- id
- tourName
- startDateTime
- finishDateTime
- durationMinutes
- touristsCount
- tourPrice
- status
- description
- notes
- createdAt
- updatedAt

Notes:
- `tourPrice` is entered manually by manager
- `touristsCount` is a number only
- there is no separate tourist entity at this stage

### Document
Fields:
- id
- entityType
- entityId
- fileName
- originalName
- mimeType
- filePath
- fileSize
- uploadedByManagerId
- createdAt

`entityType` may include:
- `tour`
- `staff`

### AuditLog
Fields:
- id
- entityType
- entityId
- actionType
- changedByManagerId
- oldValuesJson
- newValuesJson
- createdAt

---

## Database Design
Use relational modeling with explicit foreign keys and indexes.

### Tables

#### `managers`
Columns:
- id
- first_name
- last_name
- email
- phone
- login
- password_hash
- active_status
- created_at
- updated_at

#### `staff`
Columns:
- id
- role
- first_name
- last_name
- age
- language
- salary
- phone
- is_active
- notes
- created_at
- updated_at

#### `cars`
Columns:
- id
- driver_id
- mark
- model
- license_plate
- places_count
- notes
- is_active
- created_at
- updated_at

Constraint:
- `driver_id` must reference a `staff.id` whose role is `driver`

#### `tours`
Columns:
- id
- tour_name
- start_datetime
- finish_datetime
- duration_minutes
- tourists_count
- tour_price
- status
- description
- notes
- created_at
- updated_at

#### `tour_staff_assignments`
Use one flexible join table instead of separate `tour_guides`, `tour_drivers`, `tour_cooks` tables.

Columns:
- id
- tour_id
- staff_id
- assignment_role
- created_at

Constraints:
- `assignment_role` must match the assigned staff role
- one staff member can be assigned to many tours
- one tour can have many staff members

#### `documents`
Columns:
- id
- entity_type
- entity_id
- file_name
- original_name
- mime_type
- file_path
- file_size
- uploaded_by_manager_id
- created_at

#### `audit_logs`
Columns:
- id
- entity_type
- entity_id
- action_type
- changed_by_manager_id
- old_values_json
- new_values_json
- created_at

#### Optional auth/session tables
Depending on auth implementation, include session storage tables as needed.

---

## Data Relationships
- one manager uses the system
- one driver can own many cars
- one tour can have many staff assignments
- one staff member can belong to many tours
- one tour can have many documents
- one staff member can have many documents
- tours and staff can each have many audit log entries

Important:
- tours ↔ staff is many-to-many
- drivers ↔ cars is one-to-many

---

## Business Rules
These rules are critical and must be enforced server-side.

### Scheduling conflict rule
A single staff member cannot be assigned to two tours whose time intervals overlap.

Allowed example:
- tour A ends at `2026-04-25 13:15`
- tour B starts at `2026-04-25 15:15`
- this is valid

Blocked example:
- tour A ends at `2026-04-25 16:00`
- tour B starts at `2026-04-25 15:15`
- this is invalid

### Conflict checking applies to
- guides
- drivers
- cooks

### Conflict checking does not apply to
- cars

### Pricing rule
- `tourPrice` is manual input only
- do not auto-calculate price unless requirements change later

### Tourists rule
- store only `touristsCount`
- do not model individual tourists now

### Car rule
- cars belong to drivers
- cars are not assigned to tours by default

---

## Main Pages

### Dashboard
Show overview metrics such as:
- total tours
- upcoming tours
- active tours
- completed tours
- total staff
- staff by role
- revenue totals
- period-based statistics
- staff utilization

### Timeline Calendar Page
This is a major product feature.

Requirements:
- horizontal left-to-right timeline
- tours displayed as bars across a date-time range
- precision down to hours and minutes
- hover preview with summary details
- easy navigation by time range

Later-phase enhancements:
- drag-and-drop rescheduling
- resizing bars to change dates
- interactive edit mode

### Tours Page
Requirements:
- list view
- filters
- search
- sorting
- pagination
- create form
- edit form
- details view
- multiple staff assignment
- validation against overlapping schedules
- document attachments

### Staff Page
Requirements:
- list view
- filters
- search
- sorting
- pagination
- create form
- edit form
- details view
- driver car management
- document attachments

### Audit / History Page
Requirements:
- who changed what
- before/after values
- timestamp
- entity type
- entity id

---

## Filters and Search
Implement at least these filters.

### Tours filters
- date range
- status
- guide
- driver
- cook
- price range
- tour name
- created date

### Staff filters
- role
- language
- active status
- phone
- name
- salary range
- created date

Also include:
- pagination
- sorting
- text search

---

## Suggested Statuses
### Tour statuses
Use a clear enum, for example:
- `draft`
- `planned`
- `active`
- `completed`
- `cancelled`

### Staff statuses
- active
- inactive

---

## Security and Reliability Requirements
Even though this is an internal system, do not treat it as a toy.

### Security
- hash passwords securely
- validate input on the server
- protect routes
- sanitize user-controlled values where needed
- avoid trusting client-side checks

### Reliability
- use transactions for multi-step writes
- enforce DB constraints where possible
- keep business rules on the server
- create indexes for filters and date-range lookups
- produce clear, debuggable error messages

### Offline-first infrastructure
- do not depend on cloud APIs
- do not assume internet connectivity
- prefer libraries that can run fully offline

---

## Files and Documents
Documents must be stored locally on disk, with metadata in the database.

Requirements:
- upload files
- download files
- attach files to tours
- attach files to staff
- persist file metadata in DB
- support internal/local deployment only

Consider:
- safe filenames
- storage directories by entity type
- file size limits
- MIME type checks

---

## Exports
Support:
- Excel export
- PDF export

Exports should be available for at least:
- tours lists
- staff lists
- possibly detailed single-entity reports later

---

## Implementation Priorities
When planning work, favor this order.

### Phase 1 — Foundation
- scaffold Next.js + TypeScript project
- configure Docker and PostgreSQL
- configure Drizzle ORM and migrations
- define DB schema
- prepare seed data

### Phase 2 — Auth and layout
- manager authentication
- protected routes
- admin layout shell
- navigation

### Phase 3 — Staff module
- staff CRUD
- role support
- cars for drivers
- list/search/filter/sort/pagination

### Phase 4 — Tours module
- tours CRUD
- assign multiple staff
- overlap validation
- details page

### Phase 5 — Timeline
- horizontal timeline calendar
- hover previews
- date/time navigation

### Phase 6 — Supporting systems
- documents
- audit logs
- dashboard

### Phase 7 — Finish and harden
- exports
- polishing
- tests
- internal deployment setup

---

## Coding Guidance for Codex
When working in this repository:
- prefer clear and typed code over clever code
- keep domain logic out of presentational components
- avoid hidden coupling between pages and database code
- create reusable validators and DTOs
- centralize date-overlap logic so it is not duplicated
- keep form schemas close to domain rules
- document assumptions in code comments only when useful
- use consistent naming across DB schema, API contracts, and UI models

Before introducing a new package or pattern, ask:
1. Does it work offline?
2. Does it materially improve maintainability?
3. Is it justified for this project stage?

If the answer is no, do not add it.

---

## Default Assumptions
Unless explicitly changed later, assume:
- framework: Next.js
- language: TypeScript
- database: PostgreSQL
- ORM: Drizzle
- UI: Tailwind + shadcn/ui
- forms: React Hook Form + Zod
- server state: TanStack Query
- storage: local disk + local PostgreSQL
- auth user: manager only
- staff roles: guide, driver, cook
- tourists: count only
- cars: attached to drivers only
- scheduling conflicts: staff only
- language: English
- currency: USD ($)

---

## How Codex Should Collaborate
When asked to help with this project, Codex should:
- think like a senior engineer, not just a code generator
- compare good options when tradeoffs matter
- prefer maintainable architecture
- preserve type safety
- propose DB-safe solutions
- explain weak spots in a design before implementing it
- help iteratively, starting from a solid foundation

When a requirement is ambiguous, choose the safest reasonable interpretation and state the assumption clearly.

