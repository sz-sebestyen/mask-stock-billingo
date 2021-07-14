# Mask stock billingo

Team project within Codecools api developer course. User can register, login then add a hostipal with billing address. A hostpital can order masks. Invoices are generated by the billingo api.

## Installing

After cloning the repository, intall the dependencies.

```shell
npm install
```

### Initial Configuration

The app has to be registered on billingo. App billing informaiton has to be configured. The following environment variables need to be set:

- DB_CONNECTION : mongoDB connection string
- API_KEY : api key from billingo

## Start in development

Start the backend.

```shell
cd Backend
npm run start
```

Start the frontend. Open a new terminal.

```shell
cd Frontend
npm run start
```
