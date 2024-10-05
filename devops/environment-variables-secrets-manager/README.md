# Manage Environment Variables Secrets
Make sure your `.env` file is configured and up to date.

## Setup
- Terminal - navigate to the current directory
- Run: `npm install`

## Set/Sync GitHub Actions Repo's Secrets
- Run: `node environment-variables-remote-set.js`
  - Or: `node devops/environment-variables-secrets-manager/environment-variables-remote-set.js`, if ran from the project's root
- Check if the secrets have been set: 'https://github.com/{username}/{repo-name}/settings/secrets/actions'

## Reset GitHub Actions Repo's Secrets (Delete All Secrets)
- Run: `node environment-variables-remote-delete-all.js`
  - Or: `node devops/environment-variables-secrets-manager/environment-variables-remote-delete-all.js`, if ran from the project's root

## Troubleshoot
- Check GitHub's logs: https://github.com/settings/security-log
  