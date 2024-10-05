# Use the official MySQL image as the base image
# FROM mysql:latest
  # mysql:9
    # didn't work with the current version of node's mysql package
FROM mysql:5.7.44
  # 5.7 - worked
  # 5.7.44 - worked
    # Not consistent - there was a time that presented the connection issue:
      # mysqli::real_connect(): php_network_getaddresses: getaddrinfo for db-mysql-system failed: Temporary failure in name resolution
      # mysqli::real_connect(): (HY000/2002): php_network_getaddresses: getaddrinfo for db-mysql-system failed: Temporary failure in name resolution
  # 5.7.35 - didn't work
  # Note: 5.7.x is required because of the current version of the node's mysql package.
  # TODO: rename this file to ubuntu-container-mysql-build.dockerfile
  
  # Note: using mysql 5.7 caused issues: 
    # Cannot log in to the MySQL server
    # mysqli::real_connect(): php_network_getaddresses: getaddrinfo for db-mysql-system failed: Temporary failure in name resolution
    # mysqli::real_connect(): (HY000/2002): php_network_getaddresses: getaddrinfo for db-mysql-system failed: Temporary failure in name resolution

    # In the linux (host server) I get this when I run docker ps:
    # CONTAINER ID IMAGE COMMAND CREATED STATUS PORTS NAMES
    # 44edbcdd4803 phpmyadmin/phpmyadmin "/docker-entrypoint.…" 27 minutes ago Up 27 minutes 0.0.0.0:8080->80/tcp, :::8080->80/tcp syncsystem-multiplatform-phpmyadmin
    # 1d19e55ac88f syncsystem-docker-pipeline-v1-db-mysql-v1-dev "docker-entrypoint.s…" 27 minutes ago Restarting (1) 37 seconds ago syncsystem-multiplatform-db-mysql
    # d7decc71cfb0 jorgemauriciodev/syncsystem-docker-pipeline-v1-node-v1-dev:0.9.0-629935371ffad057fb5a0c10af6ffba8dced3cf2 "pm2-runtime start e…" About an hour ago Up About an hour 0.0.0.0:3000->3000/tcp, :::3000->3000/tcp syncsystem-multiplatform-backend-node-0.9.0-629935371ffad057fb5a0c10af6ffba8dced3cf2
    # TODO: find a way to fix this issue.
      # worked with the final arrangement (manuall container build)
      # in order to work in the github actions workflow, I had to define the network explicitly
    
  # TODO: test with FROM mysql:8.0.27  
  

# Add custom configuration if needed
# COPY syncsystem.cnf /etc/mysql/conf.d/
