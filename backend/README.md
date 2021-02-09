## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript repository for **LetX** back-end application.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# production mode
$ yarn start:prod
```

## Running development docker

```bash
# - api
# - mysqldb
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
