# Star Wars Characters API
A GraphQL backend for managing characters from the Star Wars universe, built using NestJS, TypeORM, and SQLite. This project was developed as a recruitment assignment and demonstrates clean architecture, production readiness, and full test coverage.

## Features
- Full CRUD operations for characters
- Pagination support (limit, offset)
- GraphQL API with SDL auto-generation and Playground
- Initial data seeding
- Unit & E2E testing
- Clean architecture: Resolver → Service → Repository
- SQLite-based database (easily replaceable with PostgreSQL)

## Tech Stack
- NestJS + TypeScript
- GraphQL (Apollo Server 4, @nestjs/graphql)
- SQLite via TypeORM
- Jest + Supertest for testing

## Getting Started
1. Install dependencies
```
npm install
```

2. Run in development mode
```
npm run start:dev
```

3. Open GraphQL Playground at http://localhost:3000/graphql

### Example Queries
Get all characters
```
query {
  characters(limit: 3, offset: 0) {
    id
    name
    episodes
    planet
  }
}
```

Add a character
```
mutation {
  addCharacter(input: {
    name: "Ahsoka Tano",
    episodes: ["CLONEWARS", "REBELS"],
    planet: "Shili"
  }) {
    id
    name
  }
}
```

## Technical Decisions
- GraphQL over REST – Offers type safety, better tooling, and more flexible schema evolution.
- SQLite – Chosen for ease of use and zero setup; can be swapped with PostgreSQL.
- TypeORM – Works well with decorators and NestJS modules.
- Service layer – Centralized logic in services ensures testability and clean separation.
- Manual seeding – Seeding handled via main.ts in dev, and in test setup for E2E.
- Test isolation – E2E tests use a separate SQLite test.db to prevent interference with development data.

## Testing
1. Unit tests
```
npm run test
```

2. End-to-End tests
```
npm run test:e2e
```

## Production Readiness
While this repo uses synchronize: true and SQLite for dev/testing, production deployment should include:
- Use PostgreSQL or MySQL
- Use TypeORM migrations instead of synchronize: true
- Add authentication
- Add rate limiting (@nestjs/throttler)
- Add logging & monitoring
- Add Dockerization and .env-based config
- Deploy to cloud platforms

## Author
Maciej Syrek - [LinkedIn](https://www.linkedin.com/in/mcksyrek/)
