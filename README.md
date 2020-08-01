# Jest with global Dotenv configuration

<img src="https://img.shields.io/badge/Version-1.0.0-yellow" /> <img src="https://img.shields.io/badge/Jest-26.1.0-purple" /> <img src="https://img.shields.io/badge/dotenv-8.2.0-yellow" /> <img src="https://img.shields.io/badge/TypeScript-3.9.6-blue" /> <img src="https://img.shields.io/badge/Webpack-4.43.0-blue" />

## 📗 Description

This repository containes a demo aobut how to configure [Jest](https://github.com/facebook/jest) in order to use a [Dotenv](https://github.com/motdotla/dotenv) custom configuration globally for TypeScript with Webpack projects.

## 🎯 Target

I want to have several `.env` files in order to define different conditions depending on the environment where my code is running. Based on that, in my testing process I want to load a global configuration once for the whole testing suites.

## 😅 Overview

There are some options to load environment variables in my tests, using Dotenv.

-   `node -r dotenv/config node_modules/.bin/jest`

    That is one of the most usual approaches but I don't like it because this way, Dotenv literally needs a `.env` file defined at the root of the project so I cannot set a custom configuration file.

-   `require(dotenv).config({ path: 'path/to/env_file' }`

    This option requires to type this command in every testing file where I'm going to use environment variables. It could be a solution but I don't like it at all because I have to pay attention to the relative path for the environment file location in every testing file.

-   [`setupFiles`](https://jestjs.io/docs/en/configuration#setupfiles-array) Jest configuration property.

    That is fine but as the official documentation suggests, the environment is processed once per testing file. This conditions will dealy a little my tests execution and in addition, I don't want it. I want a global configuration at the very begining of the testing process.

## 😎 My best matching

After diving a little in the Jest documentation, I found this configuration propery: [`globalSetup`](https://jestjs.io/docs/en/configuration#globalsetup-string).

In order to use this property, I created the [`dotenv-test.js`](https://github.com/ddialar/testing.jest.global.dotenv/dotenv/dotenv-test.js) file into `dotenv` folder (located at the root of the project).

```js
// dotenv-test.js file content.

const path = require('path');
const dotenv = require('dotenv');

module.exports = async () => {
    dotenv.config({ path: path.resolve(__dirname, '../env/.env.test') });
};
```

Following the propery documentation guidelines, this file must export an asynchronous function that will be executed before the whole testing files.

When the testing framework run at the first time, this file is executed, loading the selected environment variables and setting them globally, for the whole testing files and just once. That's all.

Finally, I have just to introduce this property into the Jest configuration file ([`jest.config.json`](https://github.com/ddialar/testing.jest.global.dotenv/jest.config.json)) and provide the location of the Dotenv file.

```json
{
    ...
    "globalSetup": "<rootDir>/dotenv/dotenv-test.js",
    ...
}
```

## 💻 Commands

-   Install all modules.

    `npm i`

-   Generate the manifest file.

    `npm run manifest`

-   Run the application in development mode.

    `npm run build:dev`

-   Run the testing suite.

    `npm test`

    **Note: Requires you have generated the manifest file before it.**

-   Check the server is running in development mode.

    In your web browser surf to this URL: `http://localhost:4000/__/manifest`

## 💾 Resources

-   Jest configuration docs [https://jestjs.io/docs/en/configuration.html](https://jestjs.io/docs/en/configuration.html)
