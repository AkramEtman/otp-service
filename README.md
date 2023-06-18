# OTP Service

## API Docs
[Docs](api-docs.md)

## Running the app

```bash
$ docker compose up --build
```

## Test

```bash
# unit tests
$ npm run test

```

## Basic Concepts

* OTP Module was based on Strategy pattern

### Add new Notification Channel Steps

1. create new class and implements [OtpProviderChannel Interface](src/otp/providers/provider.interface.ts)

Optional
2. add class reference to [OtpServiceModelEnum](src/otp/otp.constants.ts)
3. add class name to [OtpServiceType](src/otp/otp.constants.ts)
