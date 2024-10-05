'use strict';
const path = require('path');
const dotenv = require('dotenv');
// require('dotenv').config({ path: path.resolve(__dirname, '..', '..', '.env') });

// Load environment variables from .env file.
dotenv.config({ path: path.resolve(__dirname, '..', '..', '.env') });

// Instructions: 
  // terminal: node app
  // terminal (root): node devops\environment-variables-secrets-manage\app.js
// TODO: wire up with the environment variables and secrets set/delete files.
// TODO: refactor to select .env file.

const GITHUB_USER = process.env.REPO_USER;
const GITHUB_REPO_NAME = process.env.REPO_NAME;
const GITHUB_TOKEN = process.env.REPO_TOKEN;

// Debug.
console.log('GITHUB_USER=', GITHUB_USER);
// console.log('path=', path.resolve(__dirname, '..', '..', '.env'));
