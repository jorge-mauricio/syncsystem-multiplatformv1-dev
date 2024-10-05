# Manage Environment Variables Secrets
Make sure your `.env` file is configured and up to date.

## Pre-requisites:
- GitHub Personal Access Token generated for the repo
**Note:** check `.env.example` instructions for more details on how to generate and configure in the `.env` file.
- `.env` variables configured with data to be set as GitHub's Actions Secrets

## Setup
- Terminal - navigate to the current directory
- Run: `npm install`

## Set/Sync GitHub Actions Repo's Secrets
- Run: `node environment-variables-remote-set.js`
  - Or: `node devops/environment-variables-secrets-manager/environment-variables-remote-set.js`, if ran from the project's root
- Check if the secrets have been set: 'https://github.com/{username}/{repo-name}/settings/secrets/actions'<br />

## Reset GitHub Actions Repo's Secrets (Delete All Secrets)
- Run: `node environment-variables-remote-delete-all.js`
  - Or: `node devops/environment-variables-secrets-manager/environment-variables-remote-delete-all.js`, if ran from the project's root

## Troubleshoot
- Check GitHub's logs: https://github.com/settings/security-log
- Error when running `node environment-variables-remote-set.js` for the first time
  - If the error looks something like:
  ```bash
  const error = new import_request_error.RequestError(toErrorMessage(data), status, {
                    ^

  RequestError [HttpError]: Not Found - https://docs.github.com/rest/actions/secrets#get-a-repository-public-key
      at K:\syncsystem\tecnologias\pipeline\docker\multiplatform-node-v1\poc2\syncsystem-multiplatformv1-poc2\devops\environment-variables-secrets-manager\node_modules\@octokit\request\dist-node\index.js:125:21
      at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
      at async K:\syncsystem\tecnologias\pipeline\docker\multiplatform-node-v1\poc2\syncsystem-multiplatformv1-poc2\devops\environment-variables-secrets-manager\environment-variables-remote-set.js:112:37 {
    status: 404,
    ...
    authorization: 'token [REDACTED]'
  ```
    - It's probably related to invalid access token. Generate a new one with the described privileges (if fine-grained).<br />
    **Note:** this can occur if you had an existing fine-grained token and just added the repo to it without regenerating the token.
  