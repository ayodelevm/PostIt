# PostIt

[![Build Status](https://travis-ci.org/ayodelevm/PostIt.svg?branch=development)](https://travis-ci.org/ayodelevm/PostIt)  [![Coverage Status](https://coveralls.io/repos/github/ayodelevm/PostIt/badge.svg?branch=development)](https://coveralls.io/github/ayodelevm/PostIt?branch=development)  [![Code Climate](https://codeclimate.com/github/ayodelevm/PostIt/badges/gpa.svg)](https://codeclimate.com/github/ayodelevm/PostIt)  [![Issue Count](https://codeclimate.com/github/ayodelevm/PostIt/badges/issue_count.svg)](https://codeclimate.com/github/ayodelevm/PostIt)

## Introduction
**`PostIt`** is a simple application that allows friends and colleagues create groups for notifications. It allows a person post notifications to everyone in his group by sending a message once.
  It has the following features;
  *  Creating of an account
  *  Signing in a registerd user
  *  Create Groups and be added to groups by other users
  *  Add users to the group
  *  Post messages in member groups
  *  Edit and update group details
  *  Delete a group

## Dependencies

### Back End Dependencies
This app's functionality depends on multiple NPM packages including;
  *  **[Express](https://www.npmjs.com/package/express)** - This framework enables robust routing and building web Applications and API's with focus on high performance
  *  **[Sequelize](https://www.npmjs.com/package/sequelize)** - A a promise-based ORM for Node.js and io.js. Used in this project as ORM for postgres
  *  **[Sequelize-cli](https://github.com/sequelize/cli)** - The Sequelize Command Line Interface (CLI)
  *  **[Postgres](https://www.postgresql.org/)** - A a promise-based ORM for Node.js and io.js. Used in this project as ORM for postgres
  *  **[Body-Parser](https://www.npmjs.com/package/body-parser)** - This package parse incoming request bodies in a middleware and makes it available under *req.body* property
  *  **[Passport](http://passportjs.org/)** - The module is a middleware for authenticating node.js applications
  *  **[Passport-local-sequelize](https://www.npmjs.com/package/passport-local-sequelize)** - A sequelize plugin for setting up username and password. Used in this project to hash password and compare password during login
  *  **[dotenv](https://github.com/kennethreitz/autoenv)** - Enables loading environment variables from a .env file into process.env.

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
  * In order to use need to have __nodeJs__ and **npm** installed on your system.
  * For database you need to install __PostGres__ locally or setup with an online client eg. **ElephantSql**
  * Create two (2) databases one for __development__ and the other for **testing**
  * Change database config variables in the config.json file, based on your own db set-up
  * In other to interact effectively with endpoints, install and use __Postman__

* Run the app
  *  `npm start`
  *  Running the command above will run the app at localhost://3002.

## Endpoints Summary

name   |     url       |      verb      |     description
------ | ------------- | -------------- | -------------------
**AUTH**    |               |                 |
REGISTER     |  /api/user/register     |     POST     |     Allows users to register an account on PostIt
LOGIN     |    /api/user/login   |    POST      |    Allows a registered user to login
LOGOUT     |  /api/user/logout     |     GET     |     Allows a logged in user to logout
**GROUP** |
GET ALL     |    /api/group   |    GET      |    Allows a registered user to retrieve all groups he belongs to
CREATE     |  /api/group     |     POST     |     Allows a registered user to create a new group
GET ONE     |    /api/group/:id/edit   |    GET      |    Allows a group owner to retrieve details of his group for editing purpose
UPDATE     |  /api/group/:id/edit     |     PUT     |     Allows a group owner to update his group details
DELETE     |    /api/group/delete   |    DELETE      |    Allows a group owner to delete his group
**USERS** |
GET ALL     |  /api/users     |     GET     |     Retrieves all registered users. Accessible only in a group you have created.
GET GROUP USERS     |    /api/group/:id/users   |    GET      |    Retrieves all the users in a particular group
CREATE     |  /api/group/:id/user s    |     POST     |     Allows group owner to add registered users to his group
**MESSAGES** |
GET     |    /api/group/:id/messages   |    GET      |    Retrieves one member-group and all it's messages
CREATE     |  /api/group/:id/message     |     POST     |     Allows group members to post messages in memeber groups

## Payload Examples for POST and PUT Requests

#### Register New User: `/api/user/register`
To register a new user, send the following parameters `(example below)`:
```
{
  "username": "toria",
  "password": "ay324ab",
  "email": "ay@gmail.com"
  "fullname": "Toria Tobias",
  "profileImage": "http://www.tsbmag.com/wp-content/uploads/2016/02/rsz_model-429733_640.jpg"
}
```

#### Create New Group: `/api/group`
To create a new group, send the following parameters `(Name cannot be empty. Example below)`:
```
{
  "name": "Learn Vanilla JavaScript",
  "description": "There's no better place to catch up on some synthetic vanilla",
  "imageUrl": "https://www.conncoll.edu/media/major-images/Art.jpg"
}
```
N:B: You can only create a group if you are registered

#### Edit/ Update Group Details: `/api/group/:id/edit`
To edit/ update group details, you can send any of the following parameters `(Name cannot be empty. Example below)`
```
{
  "name": "Learn Python",
  "description": "There's no better place to catch up on some synthetic vanilla",
  "imageUrl": "https://www.conncoll.edu/media/major-images/Art.jpg"
}
```
N:B: You can only edit details of groups you created

#### Add New Users to a Group: `/api/group/:id/users`
To add new users to a group, send all the userId's in an array `(Example below)`:
```
{
  usersList: [1, 3, 4]
}
```
N:B: You can only add users to a group you create

#### Post messages in Groups you belong: `/api/group/:id/message`
```
{
  "message": "I enjoyed every bit of learning today"
}
```
N:B: You can only post message in groups you have created or have been added to

## Tests
*  The tests have been written using **[Mocha](https://www.npmjs.com/package/mocha)** , **[Chai](https://www.npmjs.com/package/chai)** as it's assertion library and **[Supertest](https://www.npmjs.com/package/supertest)** class.
*  To run the tests, navigate to the project's folder and open
*  Issue the following command on terminal.
  *  `npm run test`
*  If the tests are successful, they will complete without failures or errors.

###### Copyright 2017, Ayodele Victor

