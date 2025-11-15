# PayTM Clone - Wallet Application

A full-featured digital wallet application built with Next.js, Prisma, and PostgreSQL in a Turborepo monorepo structure.

## Setup Instructions

### 1. Clone and Install

```bash
git clone <repository-url>
cd paytm-project-starter-monorepo
npm install
```

### 2. Setup PostgreSQL Database

Run PostgreSQL either locally or on the cloud (e.g., neon.tech):

```bash
docker run -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres
```

### 3. Configure Environment Variables

- Copy over all `.env.example` files to `.env`
- Update `.env` files everywhere with the correct database URL

Example database URL:
```
DATABASE_URL="postgresql://postgres:mysecretpassword@localhost:5432/paytm"
```

### 4. Setup Database Schema and Seed Data

Navigate to the database package and run migrations:

```bash
cd packages/db
npx prisma migrate dev
npx prisma db seed
```

### 5. Run the Application

Go to the user app and start the development server:

```bash
cd apps/user-app
npm run dev
```

### 6. Login to the Application

Try logging in with the following test credentials:

- **Phone**: 1111111111
- **Password**: alice

Or:

- **Phone**: 2222222222
- **Password**: bob

(See `packages/db/prisma/seed.ts` for all test users)

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `user-app`: Main user-facing Next.js application with wallet features
- `merchant-app`: Merchant dashboard application
- `bank-webhook`: Express.js server handling bank webhook callbacks
- `@repo/ui`: Shared React component library (Button, Card, TextInput, Select, etc.)
- `@repo/db`: Shared database package with Prisma client
- `@repo/eslint-config`: Shared ESLint configurations
- `@repo/typescript-config`: Shared TypeScript configurations

### Features

- **User Authentication**: NextAuth.js integration with credential-based login
- **Dashboard**: User dashboard with balance overview and navigation
- **Add Money**: Transfer money from bank accounts (HDFC, Axis Bank)
- **Balance Management**: View unlocked, locked, and total balance
- **Transaction History**: View all on-ramp transactions with status
- **Bank Webhook**: Secure webhook handler for processing bank callbacks
- **Database Seeding**: Pre-populated test users and transactions

## Architecture

- **Monorepo**: Turborepo for efficient build caching and parallel execution
- **Frontend**: Next.js 14 with App Router
- **Backend**: Express.js for webhook handling
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS

## Development

To develop all apps and packages:

```bash
npm run dev
```

To build all apps and packages:

```bash
npm run build
```
