# str-c

A NestJS + Prisma starter with modular structure (auth, user, payment) and configuration management.

## Prerequisites
- Node.js LTS (>=18)
- PostgreSQL

## Getting Started
1. Install dependencies
   npm install

2. Configure environment variables
   cp .env.example .env
   # Update DATABASE_URL, JWT_SECRET, STRIPE_SECRET, etc.

3. Generate Prisma client and run migrations
   npx prisma generate
   npx prisma migrate dev --name init

4. Seed the database (optional)
   npx ts-node prisma/seed.ts

5. Start the app
   npm run start:dev

## Scripts
- build: Compile TypeScript
- start: Start compiled app
- start:dev: Run in watch mode with ts-node
- lint: Lint sources with ESLint (if configured)
- prisma:generate: Generate Prisma Client
- prisma:migrate: Run Prisma migrations
- prisma:studio: Open Prisma Studio

## Project Structure
Refer to the tree in the issue/description. Key parts:
- prisma/: Prisma schema and migrations
- src/common/: Shared utilities
- src/config/: Config module and service
- src/database/: Prisma service and database module
- src/modules/: Feature modules (auth, user, payment)

## Notes
- Payment module includes a placeholder service; wire up your payment provider (e.g., Stripe) as needed.
- Auth is a minimal placeholder without JWT strategy; extend with Passport/JWT for real use.

