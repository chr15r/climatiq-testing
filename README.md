# Climatiq

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.0.

## Climatiq API Key

Before running this application, make sure you have a Climatiq API Key:

- Sign up for a Community plan here https://www.climatiq.io/pricing and generate an API key,
- In `/src/app`, create a file called `app.secrets.ts` and declare the following class with your generated API Key:
  
```
export class Secrets {
  public static CLIMATIQ_API_KEY = '** Your API Key **';
}
```

**Note** - With the Community edition you have a maximum of 250 API calls per month. To reduce your API calls, save your searches (see below) which will store the emission factor search results in the browser cache. Emission factor estimates will NOT be cached (yet!) 

![image](https://github.com/chr15r/climatiq-testing/assets/15849914/efc788e4-7a8a-4710-b617-6e1781d52b52)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.
