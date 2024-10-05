## New Project Setup and Configuration
Create and configure the code base.

### Local Git Verification
- Make sure you have the correct user configured:
  - `git config --global --get user.name`
  - `git config --global --get user.email`<br />
  **Note:** replace `--global` with `--local` for setup with per repo configuration.

### SSH Private Access Setup
Optional step, if repo is private.

#### Windows 10
  - Local (dev) environment (Git Bash): `ssh-keygen -t rsa -b 4096 -C "your_email@example.com"`
    - Enter file in which to save the key (/c/Users/USER/.ssh/id_rsa): e.g.: `/c/Users/USER/.ssh/id_ed25519_github_web-username-project-name`<br />
    **Note:** If you don't provide the full path, it will generate the keys in the directory. 
    - Enter passphrase (empty for no passphrase): (optional - leave empty)
    - Confirm that the files were generated in the correct location
  - GitHub - configure the SSH key: Settings -> SSH and GPG keys
    - New SSH key
    - Copy contents from the newly create file (.pub)
  - GitBash agent configuration
    - Local (dev) environment - start the ssh-agent (Git Bash): `eval $(ssh-agent -s)`
    - Add the key (Git Bash): `ssh-add /c/Users/USER/.ssh/id_ed25519_github_web-username-project-name`<br />
    **Note:** without the .pub extension.
    - Observe it the success message was displayed: `Identity added: xxx`

### GitHub - Create New Project Repo
  - GitHub: create new repository.
    - Public or Private <br />
    **Note:** if private, it will require the SSH private access setup.
    - Preferably, without a README file, no license and no .gitignore
    - Copy the HTTPS and SSH addresses to a secure location

### Clone Boiler Plate Repo
- Local (dev) environment: create the project director. i.g. `my-project`
- Terminal: navigate to the directory created
- Clone boiler plate repo: `git clone git@github.com:jorge-mauricio/syncsystem-multiplatformv1-dev.git .`<br />
**Note:** with the `.` in the end, it will clone into the directory, instead of creating a separate directory for it.

### Configure Local Environment With the Newly Created GitHub Repo
- Delete the original `.git` reference to reset commit history (optional)
  - In your local directory, delete the `.git` folder
  - Initiate git: `git init`
  - Add files to staging for the initial commit: `git add .`
  - Commit: `git commit -m "chore(setup): Initial commit from boilerplate"`
- Set git remote address: `git remote set-url origin git@github.com:user-name/project-name.git` (copied in the earlier step)
  - Or add git remote, in case of deleting the original `.git` history: `git remote add origin git@github.com:user-name/project-name.git`<br />
  **Note:** https address can also be used.
- Check if remote address: `git remote -v`
- Push the files to the GitHub: `git push origin main`
- Check if GitHub repo contains the files with the respective commit history
