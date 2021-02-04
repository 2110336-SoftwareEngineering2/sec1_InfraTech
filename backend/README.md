## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript repository for **LetX** back-end application.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Running docker

```bash
# mysql server for development only
# see docker-compose.development.yml for connection info

# docker-compose up
$ yarn updev

# docker-compose down
$ yarn downdev

# docker-compose down and remove all volumes
$ yarn downdev -v
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```
