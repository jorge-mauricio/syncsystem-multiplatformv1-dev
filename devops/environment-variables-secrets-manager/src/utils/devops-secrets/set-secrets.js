'use strict';
// const { Octokit } = require("@octokit/rest");
const sodium = require('libsodium-wrappers');

// Function to encrypt value for APIs.
// TODO: copy function to functions-crypto.
// **************************************************************************************
/**
 * Function to encrypt value for APIs.
 * @static
 * @param {string} strValue
 * @param {integer} encryptAPIConfig { apiType: '', apiPublicKey: '' }
 * @returns {object} { returnStatus: false }
 * @example
 * let encryptValueForAPIResult = await encryptValueForAPI('testing encryption', {
 *      apiType: 'github-actions-secrets',
 *      apiPublicKey: 'key123abc'
 * });
 */
const encryptValueForAPI = async function(strValue, encryptAPIConfig = {}) {
  /*
      encryptAPIConfig = {
          apiType: '', // github-actions-secrets
          apiPublicKey: '' // for github-actions-secrets, should be the the key returned by the repo API
      }
  */

  // Variables.
  // ----------------------
  let objReturn = {
    returnStatus: false,
    encryptedValue: '',
    errorMessage: null
  };
  // ----------------------

  // Logic.
  if (strValue !== '') {
    try {
      // GitHub.
      // ----------------------
      // ref: https://docs.github.com/en/rest/guides/encrypting-secrets-for-the-rest-api?apiVersion=2022-11-28
      if (
        encryptAPIConfig.apiType === 'github-actions-secrets' &&
        encryptAPIConfig.apiPublicKey !== ''
      ) {
        // Note: encryptAPIConfig.apiPublicKey must be requested from the github API.
        await sodium.ready;

        // Convert the secret and key to a Uint8Array.
        const binkey = sodium.from_base64(encryptAPIConfig.apiPublicKey, sodium.base64_variants.ORIGINAL);
        const binsec = sodium.from_string(strValue);

        // Encrypt the secret using libsodium.
        const encBytes = sodium.crypto_box_seal(binsec, binkey);

        // Convert the encrypted Uint8Array to Base64.
        // const encrypted = sodium.to_base64(encBytes, sodium.base64_variants.ORIGINAL);
        objReturn.encryptedValue = sodium.to_base64(encBytes, sodium.base64_variants.ORIGINAL);
        objReturn.returnStatus = true;
      }
      // ----------------------
    } catch (e) {
      // TODO: Condition to debug.
      // TODO: evaluate creating an abstract function helper to handle the errors.
      console.error('encryptValueForAPI(error):', e.message);
      objReturn.errorMessage = e.message;
      objReturn.returnStatus = false;

      // Rethrow the error.
      // throw e;
    }
  }

  return objReturn;
};
// **************************************************************************************

// Function to set secret.
// TODO: copy function to functions-api.
// **************************************************************************************
/**
 * Function to set secret.
 * @static
 * @param {string} strValue
 * @param {integer} apiDestinationConfig { apiType: '', user: '', repo: '', apiKeyID: null }
 * @returns {object} { returnStatus: false }
 * @example
 * let apiSetSecretResult = await apiSetSecret('secretKey', 'secretValue', {
 *     apiType: 'github-actions-secrets',
 *     apiObj: octokit,
 *     user: 'owner',
 *     repo: 'repo-name',
 *      apiKeyID: 'key-from-api'
 * });
 */
const apiSetSecret = async function(secretKey, secretValue, apiDestinationConfig = {}) {
  // Variables.
  // ----------------------
  let objReturn = {
    returnStatus: false,
    encryptedValue: '',
    errorMessage: null
  };
  // ----------------------

  // Logic.
  if (
    apiDestinationConfig.secretKey !== '' &&
    apiDestinationConfig.secretValue !== ''
  ) {
    try {
      // GitHub.
      // ----------------------
      // ref: https://docs.github.com/en/rest/actions/secrets?apiVersion=2022-11-28#create-or-update-a-repository-secret
      if (
        apiDestinationConfig.apiType === 'github-actions-secrets' &&
        apiDestinationConfig.apiKeyID !== ''
      ) {
        // Note: secretValue must come encrypted (function encryptValueForAPI).
        // Note: apiDestinationConfig.apiKeyID must be required through GitHub API.
        // await octokit.request(`PUT /repos/${apiDestinationConfig.user}/${apiDestinationConfig.repo}/actions/secrets/${secretKey}`, {
        await apiDestinationConfig.apiObj.request(`PUT /repos/${apiDestinationConfig.user}/${apiDestinationConfig.repo}/actions/secrets/${secretKey}`, {
          owner: apiDestinationConfig.user,
          repo: apiDestinationConfig.repo,
          secret_name: secretKey,
          encrypted_value: secretValue,
          key_id: apiDestinationConfig.apiKeyID,
          // headers: {
          //     'X-GitHub-Api-Version': '2022-11-28'
          // } // working
        });
        // TODO: update logic (cleaner: https://stackoverflow.com/questions/76551512/injecting-a-github-secrets-into-the-user-repository)

        objReturn.returnStatus = true;
      }
      // ----------------------
    } catch (e) {
      // TODO: Condition to debug.
      // TODO: evaluate creating an abstract function helper to handle the errors.
      console.error('apiSetSecret(error):', e.message);
      objReturn.errorMessage = e.message;
      objReturn.returnStatus = false;

      // Rethrow the error.
      // throw e;
    }
  }

  return objReturn;
};
// **************************************************************************************

module.exports = { encryptValueForAPI, apiSetSecret };
