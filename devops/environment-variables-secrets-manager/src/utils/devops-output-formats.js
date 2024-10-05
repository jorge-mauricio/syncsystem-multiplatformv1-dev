'use strict';

/*
call function example: 
htaccessFormat(arrSecrets, {
    APP_ENV: 'production',
    APP_DEBUG: 'false',
    APP_URL: appURLFrontend,
    CONFIG_SYSTEM_URL: appURLFrontend,
    CONFIG_API_URL: appURLBackend,
    CONFIG_URL_FRONTEND_LARAVEL: appURLFrontend,
  })
*/

/**
 * Function to format .htaccess file content.
 * @static
 * @param {array} arrSecrets array of key/value pairs
 * @param {object} keyValuePairReplace object with key/value pairs to replace
 * @returns {string}
 * @example
 * let htaccessFormatResult = htaccessFormat(arrSecrets, {
 *     APP_ENV: 'production',
 *     APP_DEBUG: 'false',
 *     APP_URL: appURLFrontend,
 *     CONFIG_SYSTEM_URL: appURLFrontend,
 *     CONFIG_API_URL: appURLBackend,
 *     CONFIG_URL_FRONTEND_LARAVEL: appURLFrontend,
 *   });
 */
const htaccessFormat = (arrSecrets, keyValuePairReplace = {}) => {
  // Variables.
  // ----------------------
  let strReturn = '';
  // ----------------------

  // let envKeysParsed = '(' + arrSecrets.map(keyPair => `'${keyPair[0]}'`).join(' ') + ')'; // bash script array format
  strReturn = arrSecrets.filter(keyPair => keyPair[1] !== '')
    .map((keyPair) => {
      // switch (keyPair[0]) {
      //   case 'APP_ENV':
      //     return `echo "SetEnv ${keyPair[0]} 'production'" >> .htaccess;`;
      //   case 'APP_DEBUG':
      //     return `echo "SetEnv ${keyPair[0]} false" >> .htaccess;`;
      //   case 'APP_URL':
      //     return `echo "SetEnv ${keyPair[0]} '${appURLFrontend}'" >> .htaccess;`;
      //   case 'CONFIG_SYSTEM_URL':
      //     return `echo "SetEnv ${keyPair[0]} '${appURLFrontend}'" >> .htaccess;`;
      //   case 'CONFIG_API_URL':
      //     return `echo "SetEnv ${keyPair[0]} '${appURLBackend}'" >> .htaccess;`;
      //   case 'CONFIG_URL_FRONTEND_LARAVEL':
      //     return `echo "SetEnv ${keyPair[0]} '${appURLFrontend}'" >> .htaccess;`;
      //   default:
      //     return `echo "SetEnv ${keyPair[0]} '\${{ secrets.${keyPair[0]} }}'" >> .htaccess;`;
      // }
      
      // const secretKey = keyValuePairReplace[keyPair[0]] || keyPair[0];
      const secretFormatValue = keyValuePairReplace.hasOwnProperty(keyPair[0]) ? keyValuePairReplace[keyPair[0]] : `\${{ secrets.${keyPair[0]} }}`;
      // const secretFormatValue = keyValuePairReplace[keyPair[0]] || `\${{ secrets.${keyPair[0]} }}`; // not sure if it would work with the false value
      if (secretFormatValue === false || secretFormatValue === true) {
        // Boolean values are not quoted.
        return `echo "SetEnv ${keyPair[0]} ${secretFormatValue}" >> .htaccess;`;
      } else {
        return `echo "SetEnv ${keyPair[0]} '${secretFormatValue}'" >> .htaccess;`;
      }
    })
    .join(' \\\n'); // bash script .htaccess record format;
  
  return strReturn;
};


/**
 * Function to format .htaccess file content.
 * @static
 * @param {array} arrSecrets array of key/value pairs
 * @param {object} keyValuePairReplace object with key/value pairs to replace (Key - .env/secret to be replaced, value - override .env/secret value)
 * @param {string} formatType htaccess | yml-github-actions | yml-docker-compose | yml-docker-container-cli (docker container command line, inside yml file)
 * @returns {string}
 * @example
 * let htaccessFormatResult = htaccessFormat(arrSecrets, {
 *     APP_ENV: 'production',
 *     APP_DEBUG: 'false',
 *     APP_URL: appURLFrontend,
 *     CONFIG_SYSTEM_URL: appURLFrontend,
 *     CONFIG_API_URL: appURLBackend,
 *     CONFIG_URL_FRONTEND_LARAVEL: appURLFrontend,
 *   });
 */
const formatSecrets = (arrSecrets, formatType, keyValuePairReplace = {}) => {
  // Variables.
  // ----------------------
  let strReturn = '';
  // ----------------------

  // let envKeysParsed = '(' + arrSecrets.map(keyPair => `'${keyPair[0]}'`).join(' ') + ')'; // bash script array format
    switch (formatType) {
      case 'htaccess':
        strReturn = arrSecrets.filter(keyPair => keyPair[1] !== '')
          .map((keyPair) => {
            // const secretKey = keyValuePairReplace[keyPair[0]] || keyPair[0];
            const secretFormatValue = keyValuePairReplace.hasOwnProperty(keyPair[0]) ? keyValuePairReplace[keyPair[0]] : `\${{ secrets.${keyPair[0]} }}`;
            // const secretFormatValue = keyValuePairReplace[keyPair[0]] || `\${{ secrets.${keyPair[0]} }}`; // not sure if it would work with the false value
            if (secretFormatValue === false || secretFormatValue === true) {
              // Boolean values are not quoted.
              return `echo "SetEnv ${keyPair[0]} ${secretFormatValue}" >> .htaccess;`;
            } else {
              return `echo "SetEnv ${keyPair[0]} '${secretFormatValue}'" >> .htaccess;`;
            }
          })
          .join(' \\\n');
        break;
      case 'yml-github-actions':
        strReturn = arrSecrets.filter(keyPair => keyPair[1] !== '')
          .map((keyPair) => {
            const secretFormatValue = keyValuePairReplace.hasOwnProperty(keyPair[0]) ? keyValuePairReplace[keyPair[0]] : `\${{ secrets.${keyPair[0]} }}`;
            
            // return `${keyPair[0]}: '\${{ secrets.${ keyPair[0] } }}'`;
            return `${keyPair[0]}: '${secretFormatValue}'`;
          })
          .join('\n');
        break;
      case 'yml-docker-compose':
        strReturn = arrSecrets.filter(keyPair => keyPair[1] !== '')
          .map((keyPair) => {
            const secretFormatValue = keyValuePairReplace.hasOwnProperty(keyPair[0]) ? keyValuePairReplace[keyPair[0]] : `\$${keyPair[0]}`;
            
            return `- ${keyPair[0]}=${secretFormatValue}`;
          })
          .join('\n'); // TODO: test if yml format works.
        break;
      case 'yml-docker-container-cli':
        strReturn = arrSecrets.filter(keyPair => keyPair[1] !== '')
          .map((keyPair) => {
            const secretFormatValue = keyValuePairReplace.hasOwnProperty(keyPair[0]) ? keyValuePairReplace[keyPair[0]] : `\${{ secrets.${keyPair[0]} }}`;
            
            // return `${keyPair[0]}: '\${{ secrets.${ keyPair[0] } }}'`;
            return `${keyPair[0]}="${secretFormatValue}" \\`;
          })
          .join('\n');
        break;
      case 'debug':
        strReturn = arrSecrets.filter(keyPair => keyPair[1] !== '')
          .map((keyPair) => {
            return `${keyPair[0]}="${keyPair[1]}"`;
          })
          .join('\n');
        break;
      default:
        strReturn = 'No values found in the environment variables source.';
    }
  
  return strReturn;
};

module.exports = { htaccessFormat, formatSecrets };
// **************************************************************************************
