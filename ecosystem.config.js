// PM2 - Necessary for production deploy for multiple scripts with special parameters.
module.exports = {
  apps: [
    {
      name: 'syncsystem-multiplatform-backend-node-v1.0.0',
      script: 'app.js', // the path of the script you want to execute,
      // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
      instances: 1,
      autorestart: true,
      watch: false,
      error_file: 'backend-err.log',
      out_file: 'backend-out.log',
      log_file: 'backend-combined.log',
      time: true,
      /*
      env: {
      },
      */
    },
    {
      name: 'syncsystem-multiplatform-frontend-react-ssr-v1.0.0',
      script: 'node -r dotenv/config build/bundle.react.js', // the path of the script you want to execute,
      // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
      instances: 1,
      autorestart: true,
      watch: false,
      error_file: 'frontend-err.log',
      out_file: 'frontend-out.log',
      log_file: 'frontend-combined.log',
      time: true,
      /*
      env: {
        },
      */
    },
  ],
};
