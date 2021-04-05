[![Moleculer](https://badgen.net/badge/Powered%20by/Moleculer/0e83cd)](https://moleculer.services)

# Moleculer Current Weather App
This is a [Moleculer](https://moleculer.services/)-based microservices project. Generated with the [Moleculer CLI](https://moleculer.services/docs/0.14/moleculer-cli.html).

## Getting started

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

### Installation

```bash
$ npm install
```
<br />

### Running the app

```bash
# development
$ npm run dev

# debugging mode
$ npm run start
```

### Open http://localhost:3000 to test this app

## Services
- **api**: API Gateway services
- **weather**: Service with `temperature` and `temperatureDiff` actions.
- **mail**: Service with `send` method.

## NPM scripts
- `npm run dev`: Start development mode (load all services locally with hot-reload & REPL)
- `npm run start`: Start production mode (set `SERVICES` env variable to load certain services)
- `npm run cli`: Start a CLI and connect to production. Don't forget to set production namespace with `--ns` argument in script
- `npm run lint`: Run ESLint
