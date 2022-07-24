# Home Library Service
## Installation

1. Clone repo `git clone {repository URL}`
2. Installation deps `npm install`
3. Rename `.env.example` to `.env`

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.

## Running

### Default
- `npm run start:dev` - dev 
- `npm run start:prod` - prod 

### In Docker container
- Install Docker
- Run multi-container - `npm run docker:run` or `docker-compose up -d --remove-orphans`
- Docker scan image - `npm run docker:scan` or `docker scan iurii1605/rest-service`
- Docker pull image from hub - `npm run docker:pull` or `docker pull iurii1605/rest-service`
- Stop multi-container - `npm run docker:stop` or `docker-compose down --remove-orphans`

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
