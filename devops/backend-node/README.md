# Host Server Build
- Validated:
  - AWS Linux / Ubuntu 22.04

## Troubleshoot
  - Note: For a fresh new IP configured for the host server, it may take one or two hours for the change to propagate to certbot's servers and the certbot to work, so if the GitHub workflow fails, try again after a few minutes.
    - Trouble shoot: if the IP hasn't been fully propagated yet, you may see a message similar to the following in the GitHub workflow console:
      - Hint: The Certificate Authority failed to verify the temporary nginx configuration changes made by Certbot. Ensure the listed domains point to this nginx server and that it is accessible from the internet.
    <!-- # TODO: evaluate creating a loop to check if the domain pings with the correct IP before proceeding with the certbot command.  -->
    - Debug: check the domain propagation through this online tool: example: https://dnschecker.org/#A/dockerpipelinev1nodev1devbeaws.syncsystem.com.br
