[![Moleculer](https://badgen.net/badge/Powered%20by/Moleculer/0e83cd)](https://moleculer.services)

# Moleculer Current Weather App
This is a [Moleculer](https://moleculer.services/)-based microservices project. Generated with the [Moleculer CLI](https://moleculer.services/docs/0.14/moleculer-cli.html).

## Getting started

The application can be started using either Docker or Manual set up.

### Set up environment variables
<details>
    <summary>For local development</summary>
    <ul>
        <li>Copy .env.example file</li>
        <li>Rename it to .env</li>
        <li>Edit environment variables inside the file</li>
    </ul>
</details>

<details>
    <summary>For external development</summary>
    <ul>
        <li>Use .env.example file to set up environment variables</li>
    </ul>
</details>
<br />

Note:
- OPEN_WEATHER_API_KEY is an api key to use http://api.openweathermap.org
- SEND_MAIL_TO is an email which will receive notifications from the app

### Docker
#### 1. Make sure you did the step "Set up environment variables"

#### 2. Build and run docker containers
```bash
$ npm run dc:up
```

#### 3. Visit http://localhost:3000 to test this app

### Manual set up
#### 1. Make sure you did the step "Set up environment variables"

#### 2. Installation

```bash
$ npm install
```
<br />

#### 3. Running the app

```bash
# development
$ npm run dev

# start
$ npm run start
```

#### 4. Open http://localhost:3000 to test this app

## Services
- **api**: API Gateway services
- **weather**: Service with `temperature` and `temperatureDiff` actions.
- **mail**: Service with `need:warm` event and `send` method.

## NPM scripts
- `npm run dev`: Start development mode (load all services locally with hot-reload & REPL)
- `npm run start`: Start production mode (set `SERVICES` env variable to load certain services)
- `npm run cli`: Start a CLI and connect to production. Don't forget to set production namespace with `--ns` argument in script
- `npm run lint`: Run ESLint
- `npm run dc:up`: Start the stack with Docker Compose
- `npm run dc:down`: Stop the stack with Docker Compose
- `npm run dc:logs`: View Docker Compose logs
