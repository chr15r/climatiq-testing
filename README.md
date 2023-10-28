# Climatiq

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.0.

## Set up

1. Before running this application, make sure you have a Climatiq API Key. Sign up for a Community plan here https://www.climatiq.io/pricing and generate an API key.

2. Navigate to the project directory and install the requirements
    ```
    npm install
    ```
    
4. In the terminal, navigate to the `app` folder
    ```
    cd src/app
    ```
5. Generate a secrets file to store your API Key (This file path is already in `.gitignore`)
   ```
    ng g class app.secrets
   ```

6. In the generated file, add the `CLIMATIQ_API_KEY` string property:
    ```
    export class AppSecrets {
      public static CLIMATIQ_API_KEY: string  = '';
    }
    ```
    And populate it with your API key.
   

**Note** - With the Community edition you have a maximum of 250 API calls per month. To reduce your API calls, save your searches (see below) which will store the emission factor search results in the browser cache. Emission factor estimates will NOT be cached (yet!) 

![image](https://github.com/chr15r/climatiq-testing/assets/15849914/efc788e4-7a8a-4710-b617-6e1781d52b52)


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.
