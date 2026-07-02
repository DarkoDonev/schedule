# Shift Schedule Management

A small full-stack web application for managing company shift schedules. The app has one account type: Manager.

## Stack

- Frontend: Angular standalone components, Angular Material, Reactive Forms
- Backend: NestJS, TypeORM, MySQL, JWT auth
- Export: Excel `.xlsx` files generated with `exceljs`
- Local database: MySQL through Docker Compose

## Prerequisites

- Node.js 18+
- npm 10+
- Docker Desktop or compatible Docker runtime

## Quick Start

Start MySQL:

```bash
docker compose up -d mysql
```

Backend:

```bash
cd backend
cp .env.example .env
npm install
npm run seed
npm run start:dev
```

Frontend:

```bash
cd frontend
cp .env.example .env
npm install
npm run start
```

Open `http://localhost:4200`.

The seed script creates the default manager, example employees with Macedonian names, and Macedonian shift types:

- Email: `manager@example.com`
- Password: `ChangeMe123!`

Change this password before using the app outside local development.

## Project Structure

```text
backend/
  src/auth          JWT login and guards
  src/employees     Employee CRUD
  src/shift-types   Shift type CRUD
  src/schedules     Schedule generation, details, assignment edits, Excel export
  src/managers      Manager entity and lookup support
frontend/
  src/app/core      Auth, API services, guards, interceptor, app shell
  src/app/shared    Small reusable UI helpers
  src/app/features  Login, employees, shift types, schedules
docker-compose.yml  Local MySQL
```

## Schedule Generation

The generator accepts a title, date range, selected active employees, and selected shift types. For every Monday-Sunday week, each employee works at most five days and receives two free days when the full week is included. Shift types rotate by day and employee index so assignments stay evenly distributed and deterministic.

Manual assignment edits reject duplicate employee/date assignments.
