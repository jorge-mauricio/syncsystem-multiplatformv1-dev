// pm2 configuration file. Should be placed in the root of the project.
module.exports = {
  apps: [
    {
      name: 'syncsystem-multiplatform-frontend-react-ssr',
      script: 'build/bundle.react.js',
      node_args: "-r dotenv/config", // Load environment variables from .env file (debug / poc)
        // Note: ot needed in production, if environment variables have been set through the command line (container build/spin up).
        // -r flag is used to preload dotenv/config module to load environment variables from .env file.

      autorestart: true,
      watch: false, //  It's recommended to keep this disabled (false) in production.
      max_memory_restart: '1G',

      // Mode configuration.
      // Note: backend node worked with cluster mode (only spun up 1 instance). TODO: test with multiple instances.
      exec_mode: 'cluster', // In cluster mode, will spawn as many instances of your app as there are CPU cores (or as many instances as you specify), and automatically load-balances incoming connections across all instances.
      instances: 'max',

      // Logs.
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      out_file: './ss-logs/pm2/out.log', // Standard output log (console.log)
      error_file: './ss-logs/pm2/error.log', // Error log (console.error)
      merge_logs: true, // Merge logs from all instances (useful in cluster mode)

      // Override environment variables.
      /*
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      }
      */
    },
  ],
};
