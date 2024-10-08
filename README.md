# SyncSystem Multiplatform Framework – Version: 0.9.1-alpha

## Goal:
Open source framework target at small, medium and large projects that needs a CMS (content management system) as base and unlimited features for e-commerce, user management, subscription management, among others.

The final goal would be to offer the framework in most of the popular programming languages and be able to host on any server – windows or linux, while sharing the same basic architecture, multiple database types and assets.

## Languages:
For now, it has a functional version that can be applied to small and medium projects in JavaScript, Node.JS, React (SSR – Server Side Rendering) and MySQL. The Ultimate goal would be to encompass the following technologies:
- NPM
- JavaScript
- TypeScript
- Node.JS
- React
- Next
- Redux
- GraphQL
- Vue
- Angular
- ESLint
- PHP
- Composer
- Laravel
- .NET (C#)
- MySQL
- SQL Serve
- MongoDB
- HTML5
- CSS3
- BootStrap

## Structure:
One of the main advantages is the ability to define features that will be available to each project by simply switching on and of the variables in the main configuration file. This enables the admin dashboard to be clean and without endless features that could confuse a conventional user.

Besides being built on modern programming architecture (APIs / microservices), it also has a type of structure that allows developers to build / attach new modules and database tables so that it can aggregate countless features, as long as it follows the main architecture.

Another core feature that was maintained since the second version, was the ability to define multiple “master page” template style structure.

## History:
This is the fourth version of the platform. It started with classic ASP / Access database, around 2007. The core architecture was maintained, with modules being able to be set by a main configuration file.

Later, it was transcribed to .NET / SQL Server and mixed with functional programming and object oriented programming.

Next, it was transcribed again to PHP / MySQL, maintaining functions, database architecture and building a “master page” style feature similar to the one found on the .NET framework forms.

Finally, it received its final version to update the architecture style, migrate to modern web programming languages, incorporate NoSQL database and integrate with testing frameworks for higher quality coding.

## Requirements:
- npm (minimum: 6.9.0);
- node (minimum: 12.4.0);
- PHP server;

## Setup guide:
- Create folder for application
- Open terminal
- Terminal: Navigate to the folder created
- Initialize Git: git init
- Clone repository - terminal: git clone https://github.com/jorge-mauricio/syncsystem-multiplatformreactv1-dev
- Terminal: cd syncsystem-multiplatformreactv1-dev
- Install dependencies - terminal: npm install
- Build application – terminal: npm run react-build
- Run application - terminal: npm run app-start
- Create an instance of a MySQL database
- Set configuration files according to the project
- Run /setup/setup-db-run.php file to create all tables
- Access admin system - open web browser, access the following address: http://localhost:3000/system/;
- Access frontend - open web browser, access the following address: http://localhost:3001/

## Deploy notes:
Basic tips for deploying your application on a live server.

### Windows Server:
SyncSystem Multiplatform has already been tested in Windows 2016 hosting.

#### Node (backend):
- Create hosting space in the server
- Configure backend domain/subdomain (DNS zone) to point to the hosting space
- Install SSL certificate (optional)
- Edit .env file according to your project's setup (ports, domains, etc)
- Transfer files to hosting space
- Windows Server (configure dedicated pool for your application)
- Application pool: minimum .net 4.0
- Website configuration: enable allow parent folder
- Use special web.config file file in root of the public hosting directory (web.config.backendnode)
- Test endpoint: yourdomain.com/system/

#### React:
- Create hosting space in the server
- Configure backend domain/subdomain (DNS zone) to point to the hosting space
- Install SSL certificate (optional)
- Edit .env file according to your project's setup (ports, domains, etc)
- Transfer files to hosting space
- Windows Server (configure dedicated pool for your application)
- Application pool: minimum .net 4.0
- Application pool (advanced settings): .NET CLR Version: No Managed Code
- Copy bundle.react.js to root
- Website configuration: enable allow parent folder
- Use special web.config file file in root of the public hosting directory (web.config.frontendreact)
- Test endpoint: yourdomain.com

## Dedicated Server Deploy
We created GitHub Actions Workflow files to set up the project in a production dedicated server.
- [New project set up](devops/README.md)
- [Single server / docker container deploy](devops/linux-ubuntu-server-build/README.md)

## Best Practices
### Git Commit Messages
- Imperative mood: Phrase your commit as giving an order or instruction, e.g., "Fix bug" or "Add feature" rather than "Fixed bug" or "Added feature."
- Capitalization: Start the commit message with a capital letter.
- No period at the end: Commit messages are typically not full sentences, so you can skip the period.

## Author Information and Copyright License:
SyncSystem – less code, more logic. A product owned by the company Planejamento Visual – Arte, Tecnologia e Comunicação – all rights reserved.

Development and conception carried out by Jorge Mauricio (JM) – Full Stack Web Developer / Designer and company’s head partner.

Any modification or implementation in the github code must be informed / consulted and approved with the company or the author. The code is free for use commercially and personally, without the need of written or verbal authorization. 

The developer provides professional training for better understanding of its architecture and use of the code. Price quotes can be requested through the website.
