# Home Library Service
## Installation

1. Clone repo `git clone {repository URL}`
2. Installation deps `npm install`
3. Rename `.env.example` to `.env`
3. Run server `npm start`

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.

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
