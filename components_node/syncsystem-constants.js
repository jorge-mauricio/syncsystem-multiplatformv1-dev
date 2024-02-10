'use strict';

// Command line output.
const logMessageColors = {
  reset: '\x1b[0m',

  // Text colors.
  error: '\x1b[31m', // Red.
  success: '\x1b[32m', // Green.
  warning: '\x1b[33m', // Yellow.
  info: '\x1b[34m', // Blue.

  // Background colors.
  errorBG: '\x1b[41m', // Red.
  successBG: '\x1b[42m', // Green.
  warningBG: '\x1b[43m', // Yellow.
  infoBG: '\x1b[44m', // Blue.
};

module.exports = { logMessageColors };
