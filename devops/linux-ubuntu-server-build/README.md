# DevOps - Host Server Build
In order to host you application, it's necessary to build a server for the containers to run on. It can be accomplished either by a single server or multiple server setup.

## Single Instance Server Setup
In this setup, we use a single server for hosting all containers.

### Prepare Server Instance
Choose your dedicated or cloud hosting provider. Below, are a few examples of providers that can be used.

#### AWS
Step-by-step for using AWS as a cloud virtual private server provider.

##### Pre-requisites
Overview of what will be required.
- EC2
- Key pair
- Security Group
- Elastic IP
- DockerHub Account

##### Create Key Pairs
- AWS -> Network & Security -> Key Pairs
- Click _Create key pair_
  - Name: `id_rsa_aws_name-of-your-project-key`
  - Key pair type: RSA
  - Private key file format: .pem
- Click _Create key pair_
**Important:** after you click create, a file will be downloaded. Be sure to save this file in a safe location to be accessed later.

##### Create and Configure Security Group
- AWS -> Network & Security -> Security Groups
- Click _Create security group_
  - Security group name: `name-of-project`
  - Description: (optional)
  - VPC: (select default or existing one)
- Click _Create security group_
- Continue configuration on the "Inbound rules" tab
- Click _Edit inbound rules_
- Click _Add rules_<br />
**Note:** provide these settings for each one of these configurations
  - SSH:
    - Type: SSH
    - Protocol: TCP
    - Port Range: `22`
    - Source: `0.0.0.0/0`
   
  - HTTP (Nginx reverse proxy):
    - Type: HTTP
    - Protocol: TCP
    - Port Range: `80`
    - Source: `0.0.0.0/0`

  - HTTPS (Nginx reverse proxy):
    - Type: HTTPS
    - Protocol: TCP
    - Port Range: `443`
    - Source: `0.0.0.0/0`

  - Allow Ping (consider security risks):
    - Type: All ICMP (IPv4 and IPv6)
    - Protocol: ICMP
    - Port Range: All
    - Source: `0.0.0.0/0`<br />
    Note: consider restricting.

  - MySQL:
    - Type: MYSQL/Aurora
    - Protocol: TCP
    - Port Range: `3306`
    - Source: `0.0.0.0/0`

  - phpMyAdmin:
    - Type: Custom TCP
    - Protocol: TCP
    - Port Range: `8080`
    - Source: `0.0.0.0/0`

  - Docker (metrics):
    - Type: Custom TCP
    - Protocol: TCP
    - Port Range: `9323`
    - Source: `0.0.0.0/0`<br />
    Note: for production, allow only the host server IP.

  - Prometheus (monitoring):
    - Type: Custom TCP
    - Protocol: TCP
    - Port Range: `9090`
    - Source: `0.0.0.0/0`<br />
    Note: for production, allow only the host server IP. If troubleshoot is required where you need to log into prometheus dashboard, temporarily change the source to `0.0.0.0/0` 
    
  - Grafana (monitoring):
    - Type: Custom TCP
    - Protocol: TCP
    - Port Range: `9094`
    - Source: `0.0.0.0/0`

  - Node Exporter (metrics):
    - Type: Custom TCP
    - Protocol: TCP
    - Port Range: `9100`
    - Source: `0.0.0.0/0`<br />
    Note: for production, allow only the host server IP.
    
  - cAdvisor (metrics):
    - Type: Custom TCP
    - Protocol: TCP
    - Port Range: `9095`
    - Source: `0.0.0.0/0`<br />
    Note: for production, allow only the host server IP.

##### Launch EC2 Instance
- AWS -> Instances -> Instances
- Click _Launch instances_
  - Name: `name-of-project`
  - Application OS: `ubuntu`
  - Amazon Machine Image: `Ubuntu Server 22.04 LTS`
  - Instance type: `t2.medium`<br />
  **Note:** minimum requirement - 2vCPU, 4GiB Memory
  - Key pair: (select the newly created key pair in the step above)
  - Network settings: `Select existing security group` (select the newly created security group in the step above)
  - Configure storage: 30 GiB (minimum requirement)
  - Click _Launch instances_

##### Create and Associate Elastic IP
- AWS -> Network & Security -> Elastic IPs
- Click _Allocate Elastic IP Address_
  - Network border group: (select the region)
- Click _Allocate_
- After the IP has been allocated, edit the Name of the IP to the project's name
**Important:** this IP will be used to configure the domains for your project, so copy it to a safe location.
- Refresh the list of IPs (or click again in the Elastic IPs link in the left menu)
- Select the newly created IP
- Click _Actions_ -> Associate Elastic IP address
  - Resource type: `Instance`
  - Instance: (select the newly launched EC2 instance)
  - Click _Associate_

##### Configure Domains/Subdomains
In your domain register or hosting provider DNS zone, configure the domains and subdomains to point to the newly created/associated Elastic IPs. Example.
- Front-end:
  - Record Type: A
  - Domain Name: mydomain.com
  - IP Address: (provide the newly created/associated Elastic IP address)
- Back-end:
  - Record Type: A
  - Domain Name: backend.mydomain.com
  - IP Address: (provide the newly created/associated Elastic IP address)

## Environment Variables Configuration
- Local (dev) environment: create an `.env` file using the `.env.example` as the template
- In your `.env`
  - Update the environment variables `DB_SYSTEM_HOST`, `CONFIG_SERVER_BACKEND_IP`, `CONFIG_SERVER_FRONTEND_IP` with the newly created/associated Elastic IP
  - Update the following environment variables:
    - `CONFIG_SYSTEM_URL`='http://backend.mydomain.com'
    - `CONFIG_SYSTEM_URL_SSL`='https://backend.mydomain.com:3000'
    - `CONFIG_API_URL`='https://backend.mydomain.com:3000'
    - `CONFIG_URL_FRONTEND_REACT`='http://www.mydomain.com:3001'<br />
    **Note:** after updating these, your local (dev) environment may stop working, so only update for deploying the configuration and the values on these blocks can be changed back to development. Or create a separate .env file for development/production.
  - Update the following environment variables:
      - `CONFIG_SERVER_BACKEND_DOMAIN`='backend.mydomain.com'
      - `CONFIG_SERVER_FRONTEND_DOMAIN`='mydomain.com'
  - Update the following environment variables:
      - `CONFIG_SERVER_PUBLIC_KEY`: "newly created key pair file content, with the line breaks replaced by \n"
  - Update the following environment variables:
    - `REPO_USER`='repo-username'
    - `REPO_NAME`='repo-project-name'
    - `REPO_TOKEN`='github_pat_123_xyz' (generate the token following the steps in the `.env.example` file)
    - `CONFIG_DOCKER_IMAGE_BACKEND`='your-project-name-node-v1'
    - `CONFIG_DOCKER_IMAGE_FRONTEND`='your-project-name-react-ssr-v1'

  - Update the following environment variables:
      - REPO_DOCKER_USER='docker-user-name'
      - REPO_DOCKER_PASSWORD='change123'

## GitHub Secrets Deploy / Sync 
After all the production environment variables are ready, it's time for setting/updating the GitHub's repo's secrets before running the GitHub Actions Workflows.
- [Deploy / Sync Environment Variables](../environment-variables-secrets-manager/README.md)
- Update the workflow files<br />
**Note:** this step is only necessary if new environment variables were set.
  - Copy / paste the environment secret's output to the respective files:
    - `.github\workflows\backend-node-single-server-ubuntu-docker-build-server-v1.yml`
      - Look for the output under `String with yml file for setting the .env keys:`
      - Copy output block
      - Paste under `- env:` section
    - `.github\workflows\db-server-build-mysql-v1.yml`
      - Look for the output under `String with yml file for setting the .env keys:`
      - Copy output block
      - Paste under `- env:` section
      - Look for the output under `String with docker container command line setting the .env keys (back-end):`
      - Copy output block
      - Paste under `Host Server - Deploy Container (DB - MySQL) - PoC (build container in host server)` step
    - `.github\workflows\backend-node-single-server-ubuntu-docker-deploy-v1.yml`
      - Look for the output under `String with yml file for setting the .env keys:`
      - Copy output block
      - Paste under `- env:` section
      - Look for the output under `String with docker container command line setting the .env keys (back-end):`
      - Copy output block
      - Paste under `Host Server - Deploy Container (back-end)` step
    - `.github\workflows\frontend-react-ssr-single-server-ubuntu-docker-deploy-v1.yml`
      - Look for the output under `String with yml file for setting the .env keys:`
      - Copy output block
      - Paste under `- env:` section
      - Look for the output under `String with docker container command line setting the .env keys (front-end):`
      - Copy output block
      - Paste under `Host Server - Deploy Container (Front-end React SSR)` step
    - `.github\workflows\backend-node-single-server-ubuntu-docker-server-monitor-v1.yml`
      - Look for the output under `String with yml file for setting the .env keys:`
      - Copy output block
      - Paste under `- env:` section
      - Look for the output under `String with docker container command line setting the .env keys (back-end):`
      - Copy output block
      - Paste under `Monitoring - Deploy Containers` step
  - Commit all changes to the project's repo

## Run the GitHub Actions Workflows
- Trigger the GitHub Actions Workflows in the following order:
  - Build the single host server:
    - https://github.com/{user}/{project-name}/actions/workflows/backend-node-single-server-ubuntu-docker-build-server-v1.yml
  - Deploy the MySQL DB containers:
    - https://github.com/{user}/{project-name}/actions/workflows/db-server-build-mysql-v1.yml<br />
    **Note:** From this point on, you can log into the phpMyAdmin and check the database build through the endpoint `http://{host-server-ip}:8080`. User and password defined in the .env file used to set the GitHub Actions secrets.
  - Deploy the back-end admin container:
    - https://github.com/{user}/{project-name}/actions/workflows/backend-node-single-server-ubuntu-docker-deploy-v1.yml<br />
    **Note:** From this point on, you can log into the back-end admin through the endpoint `https://{backend.mydomain.com}/system` or `https://{backend.mydomain.com}/system/users` (assuming the routes haven't been changed from the default). User `root` and password defined in the `setup\setup-db-build.php` file.
  - Deploy the front-end container:
    - https://github.com/{user}/{project-name}/actions/workflows/frontend-react-ssr-single-server-ubuntu-docker-deploy-v1.yml<br />
    **Note:** From this point on, you can log into the front-end through the endpoint `https://{mydomain.com}`.
  - Deploy the monitor/metrics container:
    - https://github.com/{user}/{project-name}/actions/workflows/backend-node-single-server-ubuntu-docker-server-monitor-v1.yml<br />
    **Note:** From this point on, you can log into:
      - Grafana endpoint: `http://{host-server-ip}:9094` with user: `admin` and password: `admin` (change after first login).
      - Prometheus endpoint: `http://{host-server-ip}:9323/metrics`.<br />
      **Note:** if using cloud platforms, make sure the ports are accessible from any IP or your specific IP.
      
If all GitHub Actions Workflow files complete successfully, your application should be ready for use.

### First Access
- Log into: `https://{backend.mydomain.com}/system/users`
  - User: `root`
  - Password: (defined in the `setup\setup-db-build.php` file)
- Create user
- Log into `https://{backend.mydomain.com}/system` with the newly created user
- Start creating structure and content for your project

## Notes:

### Estimated Traffic Levels as a Rough Guide:
- Under 10,000 daily visits: Docker Compose can typically handle this level of traffic, especially if the application architecture is relatively simple.
- 10,000 - 100,000 daily visits: You might start encountering limitations with Docker Compose, especially if your application requires scalability, high availability, or complex deployments. Begin evaluating Kubernetes or similar solutions.
- Over 100,000 daily visits: At this scale, the benefits of Kubernetes become increasingly apparent. The need for auto-scaling, efficient resource utilization, and managing complex deployments likely necessitates a move to Kubernetes or a managed orchestration service. 
