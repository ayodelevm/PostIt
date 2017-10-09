# PostIt
[![Build Status](https://travis-ci.org/ayodelevm/PostIt.svg?branch=development)](https://travis-ci.org/ayodelevm/PostIt)  [![Coverage Status](https://coveralls.io/repos/github/ayodelevm/PostIt/badge.svg?branch=development)](https://coveralls.io/github/ayodelevm/PostIt?branch=development)  [![Code Climate](https://codeclimate.com/github/ayodelevm/PostIt/badges/gpa.svg)](https://codeclimate.com/github/ayodelevm/PostIt)  [![Issue Count](https://codeclimate.com/github/ayodelevm/PostIt/badges/issue_count.svg)](https://codeclimate.com/github/ayodelevm/PostIt)

## Introduction
**`PostIt`** is a simple application that allows friends and colleagues create groups for notifications. It allows a person post notifications to everyone in his group by sending a message once.
  It has the following features;
  * Creating of an account
  * Signing in a registerd user
  * Sign-up and Sign-in through google authentication
  * Reset password
  * Create Groups and be added to groups by other users
  * Add users to the group
  * View group members
  * Post messages in member groups in real-time
  * Upload profile pictures
  * Archive Messages and view Archived messages
  * Recieve in-app, email and sms notification when a message is posted in the group you belong to, based on the message's priority level. The different priority levels are `Normal`, `Urgent`, `Critical`

## Dependencies

### System Dependencies
This app's functionality depends on multiple NPM packages including;
  *  **[Node](https://nodejs.org/en/)** - A JavaScript runtime built on Chrome's V8 JavaScript engine.
  *  **[Express](https://www.npmjs.com/package/express)** - This framework enables robust routing and building web Applications and API's with focus on high performance
  *  **[Postgres](https://www.postgresql.org/)** - A promise-based ORM for Node.js and io.js. Used in this project as ORM for postgres

## Installation and Setup
*  Navigate to a directory of choice on `terminal`.
*  Clone this repository on that directory.
  *  Using SSH;

    > git clone git@github.com:ayodelevm/PostIt.git

  *  Using HTTPS;

    > git clone https://github.com/ayodelevm/PostIt.git

*  Navigate to the repo's folder on your computer
  *  `cd PostIt/`
* Install the app's backend dependencies using `npm install`

  #### Note
  * In order to begin using, you need to have __nodeJs__ and **npm** installed on your system.
  * For database you need to install __PostGres__ locally or setup with an online client eg. **ElephantSql**
  * Create two (2) databases one for __development__ and the other for **testing**
  * Change database config variables in the config.json file, based on your own db set-up
  * In other to interact effectively with endpoints, install and use __Postman__

* Run the app
  *  `npm start`
  *  Running the command above will run the app at localhost://3002.

## Endpoints

For detailed information on how to use this api, view the **[documentation](https://vikz-postit.herokuapp.com/api/docs)**

## Fequently Asked Questions (FAQ)
CLick **[here](https://github.com/ayodelevm/PostIt/wiki/Frequently-Asked-Questions)** to read through our FAQ.

## Limitations
This app currently have the following limitations:
1. You cannot delete a group, however there's an endpoint in the backend that allows the creator of a group delete the group
2. You cannot edit a group's details, however there's an endpoint in the backend that allows the creator of a group update the group
3. You cannot remove users from a group after they have been added
4. You cannot edit a users details. Only a users profile image can be changed
5. Other members of the group are not notified when a new user is added to the group
6. You cannot edit or delete a message once it has been sent

## Tests
*  The tests have been written using **[Mocha](https://www.npmjs.com/package/mocha)** , **[Chai](https://www.npmjs.com/package/chai)** as it's assertion library and **[Supertest](https://www.npmjs.com/package/supertest)** class.
*  To run the tests, navigate to the project's folder and open.
*  Issue the following command on terminal.
  *  `npm run test`
*  If the tests are successful, they will complete without failures or errors.

## Contribute to the project
To contribute to this project:

1. Fork the project, clone your fork, and configure the remotes
2. If you cloned a while ago, get the latest changes from upstream
3. Create a new topic branch (off the main project development branch) to contain your feature, change, or fix
4. Commit your changes in logical chunks
5. Locally merge (or rebase) the upstream development branch into your topic branch
6. Push your topic branch up to your fork
7. Open a Pull Request to the client-develop branch with a clear title and description

**IMPORTANT:** This guideline for `contributing to the project` was adapted from necolas  issue-guidelines. Navigate to **[necolas/issue-guidelines](https://github.com/necolas/issue-guidelines/blob/master/CONTRIBUTING.md)** for full details and step by step guidelines on how to contribute to this project.

## License
This project is licensed under the MIT license. Click **[here](https://github.com/ayodelevm/PostIt/blob/client-develop/LICENSE.MD)** to read the license in full


