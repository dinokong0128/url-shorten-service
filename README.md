# Url Shorten Service

## Endpoints
```
/**
 * Access the shorten url
 * @param :code
 */
GET /:code

/**
 * Creates shorten Url
 * @requestBody { url: String }
 */
POST /urls
```

## Getting Started

prerequisite: Node.js, Docker compose, Yarn installed globally

Install dependencies:

```bash
yarn install
```

Set environment variables:

```bash
cp .env.example .env
```

## Running Locally (with instant update)

```bash
# run mongodb instance
docker-compose up -d

yarn dev
```

## Lint

```bash
# lint code with ESLint
yarn lint

# try to fix ESLint errors
yarn lint --fix
```

## Test

```bash
# run mongodb instance
docker-compose up -d

# run integration tests
yarn test:integration
```

## Try it with (really simple) HTML form
```
<your base url>/html/form.htm
```
