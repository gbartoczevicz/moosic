# Accounts Server

## Getting started

- Create a `.env` file following the `.env.example` and:
  - Set *DATABASE_URL* with *PostgreSQL url connection*
  - Define a *PORT* to run server (3333 by default)
  - Set *JWT_SECRET* and *JWT_EXPIRESIN* to generate JWT tokens
  - Set *PASSWORD_SALT* to encode and decode password using *Bcrypt*
- Run `docker-compose up` to init a PostgreSQL server (Optional)
- Install the dependencies with `npm i`
- Run all the existing migrations with *Prisma* executing `npm run migrate`
- Run all *Jest* tests with `npm run test:coverage`
- Run the project with *tsnd* executing `npm run dev`

### Requests

Follow the files located at [.github/examples](../../../.github/examples) to send request to API via [Insomnia](https://insomnia.rest/download), importing the YAML files into the HTTP client.
