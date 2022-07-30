# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & Install Docker](https://docs.docker.com/get-docker/)

## Installation

1. Clone repo `git clone {repository URL}`
2. Rename `.env.example` to `.env`
3. Installation deps `npm install`

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.

## Running

### Default
- `npm run start:dev` - dev 
- `npm run start:prod` - prod 

### In Docker container
- Install Docker
- Run multi-container - `npm run docker:run`
- Run prisma migrations - `npm run prisma:migrate`
> Note: app starts on **localhost:4000**
- Stop multi-container - `npm run docker:stop`

## Postman testing

For testing with postman you can use the collection and environment from `./postman`

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

## Auto-fix and format

```
npm run lint
```

```
npm run format
```
