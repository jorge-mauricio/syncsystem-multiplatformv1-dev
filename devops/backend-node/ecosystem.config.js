// pm2 configuration file. Should be placed in the root of the project.
module.exports = {
  apps: [
    {
      name: 'syncsystem-multiplatform-backend-node',
      script: 'app.js',

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

/*
Start pm2 with the ecosystem file:
Terminal: pm2 start ecosystem.config.js
Terminal (production): pm2 start ecosystem.config.js --env production

env - guidelines:
env: An object containing environment variables for development.
env_production: Environment variables specifically for production.

max_memory_restart - guidelines:

Estimating a Suitable Value

There isn't a one-size-fits-all formula for setting max_memory_restart, but you can follow a general approach:

    Baseline Measurement: Initially, monitor your application's memory usage under normal and peak loads to understand its typical memory footprint.

    Buffer for Spikes: Add a buffer on top of the peak memory usage observed to accommodate unexpected spikes. For example, if your application's memory usage peaks at 800MB, you might set max_memory_restart to 1G as a buffer.

    Server Capacity: Ensure the sum of max_memory_restart values for all applications and services does not exceed 70-80% of the server's total memory, leaving room for the operating system and unforeseen spikes.

Practical Example

If your server has 8GB of RAM and you're running 4 instances of a Node.js application along with a database and other small services, you might allocate:

    1GB for the operating system and essential services.
    2GB for the database (assuming it's moderately loaded).
    The remaining 5GB can be divided among the Node.js instances, considering other minor services might also need memory.

If you decide to allocate 4GB to your Node.js application instances, and you have 4 instances running, you could set max_memory_restart to 1G per instance (4GB / 4 instances).


exec_mode: 'cluster'
Considerations for Cluster Mode

    Session Management: If your application relies on in-memory session storage, using cluster mode may cause issues since sessions might not be shared across instances. Consider using a shared session store like Redis.

    WebSocket Support: If your application uses WebSockets, ensure that your load balancer or reverse proxy supports WebSocket upgrades and is configured to handle sticky sessions if necessary.

    Database Connections: Each instance of your application will create its own database connections. Ensure your database configuration can handle the increased number of connections.

    Port Configuration: When using cluster mode, you don't need to change the port your application listens on for each instance; Node's cluster module and PM2 handle the port sharing automatically.

    Monitoring and Scaling: PM2 provides commands for managing and monitoring your clustered instances, such as pm2 list, pm2 reload, pm2 scale, and pm2 monit.
  
  
Logs guidelines:    
Volume for Logs: Consider specifying a volume for your logs directory if you want to preserve logs across container restarts or access them from the host system.
VOLUME ["/app/logs"]

Monitor guidelines:
Terminal: pm2 monit
Note: for advanced monitoring, use pm2 plus. 
To use PM2 Plus, you'll need to sign up for an account and link your PM2 instance with the service: https://app.pm2.io/
Terminal: pm2 plus
*/
