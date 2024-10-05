'use strict';
// Terminal: npm install -D @octokit/core
    // May require node 16
    // May not need
// Terminal: npm install -D @octokit/rest
    // May require node 18
// Terminal: npm install -D tweetsodium
    // deprecated
// Terminal: npm install -D libsodium-wrappers
    // Not sure if it worked // worked
// terminal: npm install -D sodium
    // Error visual studio 2015
// terminal: npm install libsodium-wrappers-sumo
    // Worked also, but better the upper one
// terminal: npm install -D dotenv
// Terminal: node environment-variables-remote-set.js | node devops/environment-variables-remote-set.js
// TODO: Maybe, decouple this logic. One file environment-variables-remote-set.js and one file environment-variables-output (with the proper formatting) and maybe wire them up with a package json script.
// console.log('testing=', true);
// Note: Make sure all your .env file is present and variables are set with the correct values.

//require('dotenv').config();
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

// const https = require('https');
// const { Octokit } = require("@octokit/core");
const { Octokit } = require('@octokit/rest');
// const sodium = require('libsodium-wrappers');
//const sodium = require('libsodium-wrappers-sumo');

const { encryptValueForAPI, apiSetSecret } = require('./src/utils/devops-secrets/set-secrets');
const getEnvData = require('./src/scripts/get-env-data');
const { htaccessFormat, formatSecrets } = require('./src/utils/devops-output-formats');
const { logMessageColors } = require('../../components_node/syncsystem-constants');

// Load environment variables from .env file.
// dotenv.config();
dotenv.config({ path: path.resolve(__dirname, '..', '..', '.env') }); // TODO: update to .env.prod.backend/.env.prod.frontend (or pass through a parameter)

// Bash coloring flags.
// const logMessageColors = {
//   reset: '\x1b[0m',

//   // Text colors.
//   error: '\x1b[31m', // Red.
//   success: '\x1b[32m', // Green.
//   warning: '\x1b[33m', // Yellow.
//   info: '\x1b[34m', // Blue.

//   // Background colors.
//   errorBG: '\x1b[41m', // Red.
//   successBG: '\x1b[42m', // Green.
//   warningBG: '\x1b[43m', // Yellow.
//   infoBG: '\x1b[44m', // Blue.
// };

// module.exports = { logMessageColors };
// TODO: move to separate directory.

// GitHub repo settings.
const GITHUB_USER = process.env.REPO_USER;
const GITHUB_REPO_NAME = process.env.REPO_NAME;
const GITHUB_TOKEN = process.env.REPO_TOKEN;
// TODO: consider changing to camelCase.

// Variables.
let encryptValueForAPIResult = null;
let apiSetSecretResult = null;
let secretValueEncrypted = null;
let countKeysSuccessful = 0;

const envKeysParsed = {
  // FTP deployment.
  htaccessFormatFrontend: '',
  htaccessFormatBackend: '',
  
  // GitHub actions.
  ymlFormat: '',
  
  // Docker-compose.
  ymlDockerComposeFormatFrontend: '',
  ymlDockerComposeFormatBackend: '',
  
  // Docker container build/run.
  dockerContainerCMDYmlFrontend: '',
  dockerContainerCMDYmlBackend: '',
  
  // Debug.
  debug: '',
}; // TODO: change name to envKeysParsedFormatted

// const appURLFrontend = 'https://www.mydomain.com';
const appURLFrontend = process.env.CONFIG_URL_FRONTEND_REACT;
// const appURLBackend = 'https://backend.mydomain.com';
const appURLBackend = process.env.CONFIG_API_URL;
// TODO: replace with .env or from github actions variables.

// Secrets (debug data).
// const arrSecrets = [];
// arrSecrets.push(['KEY_NAME1', 'secretValue1']);
// arrSecrets.push(['KEY_NAME2', 'secretValue2']);

// Oktakit.
// ref: https://octokit.github.io/rest.js/v20
const octokit = new Octokit({
  auth: GITHUB_TOKEN
});

// TODO: modify this to an async function.
(async () => {
  const { data: { key, key_id } } = await octokit.actions.getRepoPublicKey({
    owner: GITHUB_USER,
    repo: GITHUB_REPO_NAME
  });

  // Import variables form .env file.
  // let getEnvironmentVariablesTest = getEnvData(path.resolve(__dirname, '../.env'));
  // const arrSecrets = await getEnvData(path.resolve(__dirname, '../.env'));
  const arrSecrets = await getEnvData(path.resolve(__dirname, '..', '..', '.env'));
  
  // Format for .htaccess file (front-end).
  // let envKeysParsed = '(' + arrSecrets.map(keyPair => `'${keyPair[0]}'`).join(' ') + ')'; // bash script array format
  // envKeysParsed.htaccessFormatFrontend = arrSecrets.filter(keyPair => keyPair[1] !== '')
  //   .map((keyPair) => {
  //     switch (keyPair[0]) {
  //       case 'APP_ENV':
  //         return `echo "SetEnv ${ keyPair[0] } 'production'" >> .htaccess;`;
  //       case 'APP_DEBUG':
  //         return `echo "SetEnv ${ keyPair[0] } false" >> .htaccess;`;
  //       case 'APP_URL':
  //         return `echo "SetEnv ${ keyPair[0] } '${ appURLFrontend }'" >> .htaccess;`;
  //       case 'CONFIG_SYSTEM_URL':
  //         return `echo "SetEnv ${ keyPair[0] } '${ appURLFrontend }'" >> .htaccess;`;
  //       case 'CONFIG_API_URL':
  //         return `echo "SetEnv ${ keyPair[0] } '${ appURLBackend }'" >> .htaccess;`;
  //       case 'CONFIG_URL_FRONTEND_LARAVEL':
  //         return `echo "SetEnv ${ keyPair[0] } '${ appURLFrontend }'" >> .htaccess;`;
  //       default:
  //         return `echo "SetEnv ${ keyPair[0] } '\${{ secrets.${ keyPair[0] } }}'" >> .htaccess;`;
  //     }
  //   })
  //   .join(' \\\n'); // bash script .htaccess record format;
  const htaccessFormatFrontendReplace = {
    APP_ENV: 'production',
    APP_DEBUG: false,
    APP_URL: appURLFrontend,
    CONFIG_SYSTEM_URL: appURLFrontend,
    CONFIG_API_URL: appURLBackend,
    CONFIG_URL_FRONTEND_LARAVEL: appURLFrontend,
  };
  // envKeysParsed.htaccessFormatFrontend = htaccessFormat(arrSecrets, htaccessFormatFrontendReplace);
  envKeysParsed.htaccessFormatFrontend = formatSecrets(arrSecrets, 'htaccess', htaccessFormatFrontendReplace);

  // Format for .htaccess file (back-end).
  // envKeysParsed.htaccessFormatBackend = arrSecrets.filter(keyPair => keyPair[1] !== '')
  //   .map((keyPair) => {
  //     switch (keyPair[0]) {
  //       case 'APP_ENV':
  //         return `echo "SetEnv ${ keyPair[0] } 'production'" >> .htaccess;`;
  //       case 'APP_DEBUG':
  //         return `echo "SetEnv ${ keyPair[0] } false" >> .htaccess;`;
  //       case 'APP_URL':
  //         return `echo "SetEnv ${ keyPair[0] } '${ appURLBackend }'" >> .htaccess;`;
  //       case 'CONFIG_SYSTEM_URL':
  //         return `echo "SetEnv ${ keyPair[0] } '${ appURLFrontend }'" >> .htaccess;`;
  //       case 'CONFIG_API_URL':
  //         return `echo "SetEnv ${ keyPair[0] } '${ appURLBackend }'" >> .htaccess;`;
  //       case 'CONFIG_URL_FRONTEND_LARAVEL':
  //         return `echo "SetEnv ${ keyPair[0] } '${ appURLFrontend }'" >> .htaccess;`;
  //       default:
  //         return `echo "SetEnv ${ keyPair[0] } '\${{ secrets.${ keyPair[0] } }}'" >> .htaccess;`;
  //     }
  //   })
  //   .join(' \\\n'); // bash script .htaccess record format;
  const htaccessFormatBackendReplace = {
    APP_ENV: 'production',
    APP_DEBUG: false,
    APP_URL: appURLBackend,
    CONFIG_SYSTEM_URL: appURLFrontend,
    CONFIG_API_URL: appURLBackend,
    CONFIG_URL_FRONTEND_LARAVEL: appURLFrontend,
  };
  // envKeysParsed.htaccessFormatBackend = htaccessFormat(arrSecrets, htaccessFormatBackendReplace);
  envKeysParsed.htaccessFormatBackend = formatSecrets(arrSecrets, 'htaccess', htaccessFormatBackendReplace);

  // Format for yml file (GitHub Workflow or Docker Compose). TODO: check if dockerfile shares the same format.
  // envKeysParsed.ymlFormat = arrSecrets.filter(keyPair => keyPair[1] !== '')
  //   .map((keyPair) => {
  //     return `${ keyPair[0] }: '\${{ secrets.${ keyPair[0] } }}'`;
  //   })
  //   .join('\n');
  const ymlFormatReplace = {};
  envKeysParsed.ymlFormat = formatSecrets(arrSecrets, 'yml-github-actions', ymlFormatReplace);
  
  // Format for docker compose yml (front-end).
  const dockerComposeFormatFrontendReplace = {}; // Bridge to the .env file - no need to override.
  envKeysParsed.ymlDockerComposeFormatFrontend = formatSecrets(arrSecrets, 'yml-docker-compose', dockerComposeFormatFrontendReplace);
  
  // Format for docker compose yml (back-end).
  const dockerComposeFormatBackendReplace = {}; // Bridge to the .env file - no need to override.
  envKeysParsed.ymlDockerComposeFormatBackend = formatSecrets(arrSecrets, 'yml-docker-compose', dockerComposeFormatBackendReplace);
  
  // Format for docker container command line (inside yml file) (front-end).
  const dockerContainerCMDYmlFrontendReplace = {
    APP_ENV: 'production',
    CONFIG_SYSTEM_URL: appURLBackend,
    CONFIG_API_URL: appURLBackend,
    CONFIG_URL_FRONTEND_LARAVEL: appURLFrontend,
    CONFIG_URL_FRONTEND_REACT: appURLFrontend,
  };
  envKeysParsed.dockerContainerCMDYmlFrontend = formatSecrets(arrSecrets, 'yml-docker-container-cli', dockerContainerCMDYmlFrontendReplace);
  
  // Format for docker container command line (inside yml file) (back-end).
  const dockerContainerCMDYmlBackendReplace = {
    APP_ENV: 'production',
    CONFIG_SYSTEM_URL: appURLBackend,
    CONFIG_API_URL: appURLBackend,
    CONFIG_URL_FRONTEND_LARAVEL: appURLFrontend,
    CONFIG_URL_FRONTEND_REACT: appURLFrontend,
  };
  envKeysParsed.dockerContainerCMDYmlBackend = formatSecrets(arrSecrets, 'yml-docker-container-cli', dockerContainerCMDYmlBackendReplace);
  
  // Debug.
  envKeysParsed.debug = formatSecrets(arrSecrets, 'debug', dockerContainerCMDYmlBackendReplace);
  
  // Loop through the key/value arrays.
  // TODO: evaluate leaving some .env variables out. Example: repo, etc.
  arrSecrets.forEach(async ([secretKey, secretValue]) => {
    // Encrypt secret value.
    encryptValueForAPIResult = await encryptValueForAPI(
      secretValue, {
        apiType: 'github-actions-secrets',
        apiPublicKey: key
      }
    );

    //
    if (encryptValueForAPIResult.returnStatus) {
      // Set encrypted.
      secretValueEncrypted = encryptValueForAPIResult.encryptedValue;

      // Set secret key/value.
      apiSetSecretResult = await apiSetSecret(secretKey, secretValueEncrypted, {
        apiType: 'github-actions-secrets',
        apiObj: octokit,
        user: GITHUB_USER,
        repo: GITHUB_REPO_NAME,
        apiKeyID: key_id
      });
      if (apiSetSecretResult.returnStatus === true) {
        countKeysSuccessful++;
        console.log(`Secret key set successfully (${countKeysSuccessful}): `, secretKey);
      }
    }
  });

  // Output for GitHub actions workflow iteration.
  // console.log('Array with the .env keys:');
  // .htaccess format.
  console.log(logMessageColors.warning, 'String with bash script for setting the .env keys (front-end):');
  console.log(logMessageColors.reset, envKeysParsed.htaccessFormatFrontend, '\n');
  console.log(logMessageColors.warning, 'String with bash script for setting the .env keys (back-end):');
  console.log(logMessageColors.reset, envKeysParsed.htaccessFormatBackend, '\n');
  
  // GitHub Actions yml format.
  console.log(logMessageColors.warning, 'String with yml file for setting the .env keys:');
  console.log(logMessageColors.reset, envKeysParsed.ymlFormat, '\n');
  console.log(`${ logMessageColors.warning }Action: ${ logMessageColors.reset }Update GitHub actions workflow files.`, '\n');

  // Docker compose yml format.
  console.log(logMessageColors.warning, 'String with docker compose yml file setting the .env keys (front-end):');
  console.log(logMessageColors.reset, envKeysParsed.ymlDockerComposeFormatFrontend, '\n');

  console.log(logMessageColors.warning, 'String with docker container command line setting the .env keys (back-end):');
  console.log(logMessageColors.reset, envKeysParsed.ymlDockerComposeFormatBackend, '\n');
  
  console.log(`${logMessageColors.warning}Action: ${logMessageColors.reset}Update docker compose files.`, '\n');

  // Docker container command line (inside yml file) format.
  console.log(logMessageColors.warning, 'String with docker container command line setting the .env keys (front-end):');
  console.log(logMessageColors.reset, envKeysParsed.dockerContainerCMDYmlFrontend, '\n');
  
  console.log(logMessageColors.warning, 'String with docker container command line setting the .env keys (back-end):');
  console.log(logMessageColors.reset, envKeysParsed.dockerContainerCMDYmlBackend, '\n');

  console.log(`${logMessageColors.warning}Action: ${logMessageColors.reset}Update docker container command lines.`, '\n');
  
  console.log(`${logMessageColors.warning}Important: ${logMessageColors.reset}Review output after pasted to trim any extra spaces.`, '\n');
  
  // Debug.
  // console.log(logMessageColors.warning, 'Debug:');
  // console.log(logMessageColors.reset, envKeysParsed.debug, '\n');
  
  // console.log(logMessageColors.warning,'Action: ',logMessageColors.reset,'Update GitHub actions workflow file.');
  // console.log(`${ logMessageColors.warning }Action: ${ logMessageColors.reset }Update GitHub actions workflow files.`);
  // TODO: Evaluate writing the array output to the GitHub workflow file.
})();

// Debug.
// console.log('FRONTEND_FTP_PASSWORD=', process.env.FRONTEND_FTP_PASSWORD);
// console.log('FRONTEND_FTP_PASSWORD=', process.env);
// console.log('getEnvironmentVariablesTest=', getEnvironmentVariablesTest);
console.log('Copying .env variables to GitHub Actions Secrets...');
