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

For detailed information on how to use this api, view the **[documentation](https://ayodelevm.github.io/slate)**

## Tests
*  The tests have been written using **[Mocha](https://www.npmjs.com/package/mocha)** , **[Chai](https://www.npmjs.com/package/chai)** as it's assertion library and **[Supertest](https://www.npmjs.com/package/supertest)** class.
*  To run the tests, navigate to the project's folder and open
*  Issue the following command on terminal.
  *  `npm run test`
*  If the tests are successful, they will complete without failures or errors.

###### Copyright 2017, Ayodele Victor


