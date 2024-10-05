'use strict';
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '..', '..', '..', '..', '.env') }); // TODO: update to .env.prod.backend/.env.prod.frontend (or pass through a parameter)

// Function to get environment variables from file in selected data object.
// **************************************************************************************
/**
 * Function to get environment variables from file in selected data object.
 * @static
 * @param {string} envPath path to .env file
 * @param {integer} returnType 1 - key/value pair array
 * @returns {array|object|string}
 * @example
 * let apiSetSecretResult = getEnvironmentVariables();
 *     apiType: 'github-actions-secrets',
 *     user: 'owner',
 *     repo: 'repo-name',
 *      apiKeyID: 'key-from-api'
 * });
 */
const getEnvData = async (envFilePath, returnType = 1) => {
  /*
      returnType = 1
      [
          ['ENV_KEY1', 'envValue1'],
          ['ENV_KEY2', 'envValue2'],
          ['ENV_KEY3', 'envValue4'],
      ]
  */
  // Variables.
  // ----------------------
  let dataReturn = null;
  // ----------------------

  if (envFilePath) {
    // key/value pair array
    if (returnType === 1) {
      dataReturn = [];

      // Function to filter out keys not present in .env
      const filterEnvKeys = (keys) => {
        const envKeys = Object.keys(process.env);
        const filteredKeys = keys.filter(key => envKeys.includes(key));
        return filteredKeys;
      };

      // Read the content of the .env file
      // const envPath = path.resolve(__dirname, '../.env'); // adjust the path as needed
      const envContent = fs.readFileSync(envFilePath, 'utf-8');

      // Split the content into lines and filter out comments
      const envLines = envContent
        .split('\n')
        .filter(line => !line.trim().startsWith('#') && !line.trim().startsWith('//'));

      // Extract keys from .env file
      const envKeys = envLines.map(line => line.split('=')[0]);

      // Filter and print only .env variables
      const filteredKeys = filterEnvKeys(envKeys);
      filteredKeys.forEach(key => {
        dataReturn.push([`${key}`, `${process.env[key]}`]);
        // Debug.
        // console.log(`${key}=${process.env[key]}`);
      });
    }
  }

  return dataReturn;
};
// **************************************************************************************

module.exports = getEnvData;
