# Manage Environment Variables Secrets
Make sure your `.env` file is configured and up to date.

## Pre-requisites:
- GitHub Personal Access Token generated for the repo
**Note:** check `.env.example` instructions for more details on how to generate and configure in the `.env` file.
- `.env` variables configured with data to be set as GitHub's Actions Secrets
**Tip:** use a separate terminal to run these scripts.

## Setup
- Terminal - navigate to the current directory
- Run: `npm install`

## Set/Sync GitHub Actions Repo's Secrets
- Run: `node environment-variables-remote-set.js`
  - Or: `node devops/environment-variables-secrets-manager/environment-variables-remote-set.js`, if ran from the project's root<br />
**Important**: Make sure the console log displays a success message for each secret key set. e.g.: `Secret key set successfully (123):  APP_DEBUG`. If any different message is displayed, there could have been an instability while setting the secrets. If that's the case, either run the script again or delete all (with the option below) and run the script again until the console message is displayed without errors.
- Check if the secrets have been set: 'https://github.com/{username}/{repo-name}/settings/secrets/actions'

From this point on, the console message will display and extensive list of environment variables in different formats. They'll be used to update the GitHub Workflow Files in a later step, so be sure to not close the terminal.<br />

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
  