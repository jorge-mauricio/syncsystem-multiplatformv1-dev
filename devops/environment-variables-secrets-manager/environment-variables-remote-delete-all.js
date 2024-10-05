'use strict';
// Terminal: node environment-variables-remote-delete-all.js | node devops/environment-variables-remote-delete-all.js
// TODO: add a confirmation output with the repo's name before proceeding with the deletion.
const dotenv = require('dotenv');
// const fs = require('fs');
const path = require('path');

// const https = require('https');
// const { Octokit } = require("@octokit/core");
const { Octokit } = require('@octokit/rest');
// const sodium = require('libsodium-wrappers');

// Load environment variables from .env file.
// dotenv.config(); 
dotenv.config({ path: path.resolve(__dirname, '..', '..', '.env') }); // TODO: update to .env.prod.backend/.env.prod.frontend (or pass through a parameter)

// GitHub repo settings.
const GITHUB_USER = process.env.REPO_USER;
const GITHUB_REPO_NAME = process.env.REPO_NAME;
const GITHUB_TOKEN = process.env.REPO_TOKEN;

// Variables.
let arrSecretsDelete = null;
const arrSecretsPreserve = [
  'TEST_1',
  'TEST_2',
  'CONFIG_SERVER_SSH_KEY',
  'CONFIG_GITHUB_REPO_TOKEN',
];
let apiSecretDeleteResponse = null;
let countSecretsDelete = 0;

// Oktakit.
const octokit = new Octokit({
  auth: GITHUB_TOKEN
  });

(async function () {
  // const { data: { key, key_id } } = await octokit.actions.getRepoPublicKey({
  //   owner: GITHUB_USER,
  //   repo: GITHUB_REPO_NAME
  // });

  // const octokit = new Octokit({
  //   auth: process.env.GITHUB_TOKEN
  // })

  const apiResponse = await octokit.request(`GET /repos/${GITHUB_USER}/${GITHUB_REPO_NAME}/actions/secrets`, {
      owner: GITHUB_USER,
      repo: GITHUB_REPO_NAME,
      per_page: 100
      // headers: {
      //   'X-GitHub-Api-Version': '2022-11-28'
      // }
    });

  if (apiResponse.status === 200) {
    arrSecretsDelete = apiResponse.data.secrets;
    /*
      Data structure:
      [
        {
          name: 'APP_DEBUG',
          created_at: '2023-10-15T20:31:18Z',
          updated_at: '2023-10-15T21:03:09Z'
        },
      ]
    */

    // Loop through the secrets.
    for (const secret of arrSecretsDelete) {
      // Delete the secret.
      // await octokit.request(`DELETE /repos/${GITHUB_USER}/${GITHUB_REPO_NAME}/actions/secrets/${secret.name}`, {
      //   owner: GITHUB_USER,
      //   repo: GITHUB_REPO_NAME,
      //   secret_name: secret.name,
      //   headers: {
      //     'X-GitHub-Api-Version': '2022-11-28'
      //   }
      // });
      try {
        if (!arrSecretsPreserve.includes(secret.name)) {
          apiSecretDeleteResponse = await octokit.rest.actions.deleteRepoSecret({
            owner: GITHUB_USER,
            repo: GITHUB_REPO_NAME,
            secret_name: secret.name,
          });

          if (apiSecretDeleteResponse.status === 204) {
            countSecretsDelete++;
            // Debug.
            console.log(`Secret delete successfully(${countSecretsDelete}): `, secret.name);
            // console.log('apiSecretDeleteResponse=', apiSecretDeleteResponse);
          }
        }
      } catch (e) {
        // Debug.
        console.log('Secret delete error: ', secret.name);
        console.error('Secret delete error(error):', e.message);

        // Rethrow the error.
        // throw e;
      }
    }
  }

  // Debug.
  // console.log('arrSecrets=', arrSecrets);
  // console.log('Copying .env variables to GitHub Actions Secrets...');
})();

// Debug.
console.log('Environment variables (remote) delete...'); // TODO: replace with message from language file.
