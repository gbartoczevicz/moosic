# Accounts Server

## Getting started

- Create a `.env` file following the `.env.example` and:
  - Set *DATABASE_URL* with *PostgreSQL url connection*
  - Define a *PORT* to run server (3333 by default)
  - Set *JWT_SECRET* and *JWT_EXPIRESIN* to generate JWT tokens
  - Set *PASSWORD_SALT* to encode and decode password using *Bcrypt*
- Run `docker-compose run accounts_db` at folder where [docker-compose.yml](../../../docker-compose.yml) is created (Opitional)
- Install the dependencies with `npm i`
- Run all the existing migrations with *Prisma* executing `npm run migrate`
- Run all *Jest* tests with `npm run test:coverage`
- Run the project with *tsnd* executing `npm run dev`
