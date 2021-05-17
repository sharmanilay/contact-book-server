# Contact Book Server

## About

Contact book is an all in one app to write notes and manage contacts using google contacts.

## Setup

Follow these steps to run locally
Prerequisites:

- [Node(12.13.0)](https://nodejs.org/en/blog/release/v12.13.0/)
- Npm
- Nodemon `(npm i -g nodemon)`
- [PostgreSQL](https://www.postgresql.org/download/)
- [Sequelize](https://www.npmjs.com/package/sequelize-cli)

Setup PostgreSQL connection and update credentials in `config/config.json` in the development key. If you wish to use hosted DB then enter the db url in bash or zsh file with key `LEVERAGE_DB_URL`

Steps for installation:

- `git clone REPO_LINK`
- `cd contact-book-server`
- `npm install`
- `sequelize db:migrate`
- `npm run dev`

## Structure

The application is divided into modules as per their functionality.

### Models

This directory contains all the DB models/schemes. If in future you wish to expand the scope of the db or update the scheme this should be the directory to create and update file.

#### Current Models

- user - represents a primary user who can fetch contacts and write comments for them
- comment - represents a comment for a contact of the primary users

### Controllers

This directory contains all the actions that we want to perform on respective DB models. Each controller operates on respective to model to fetch and send data depending upon requirement from the client

#### Current Controllers

- auth - Takes care of all the authentication actions
- comments - Takes care of all the comment actions (create, fetch & delete)
- user - Takes care of all the user actions (fetch contacts & contact details)

### Routes

This directory contains all the API endpoints to perform required functions.

#### Current Routes

1. auth
   - `api/signin`
2. user
   - `api/get-contacts`
   - `api/get-contact-details`
3. comments
   - `api/create-comment`
   - `api/get-comments`
   - `api/delete-comment`

### Migrations

This directory contains all the migrations required to be run after setting up the db to reflect schema changes in the DB.

### Auth

This directory contains the setup for authentication. [Passport.js](http://www.passportjs.org/) is used to handle the authentication using JWT strategy

### Config

This directory contains config.json to setup configuration and set credentials for DB and other variables.

### Required environment variables

- `LEVERAGE_CLIENT_HOME_PAGE_URL`
- `LEVERAGE_DB_URL`
- `LEVERAGE_GOOGLE_API_KEY`
- `LEVERAGE_GOOGLE_CLIENT_ID`
- `LEVERAGE_GOOGLE_CLIENT_SECRET`
- `LEVERAGE_JWT_SECRET`

### Notes

- In order to run the project locally you'll need to allow localhost as origin on your [Google Console](https://console.cloud.google.com/home/dashboard)
- If you don't use `LEVERAGE_DB_URL` enter local db instance's credential in config json in the below format

```
"development":  {
	"username":  "USERNAME",
	"password":  "PASSWORD",
	"database":  "DB_NAME",
	"host":  "127.0.0.1",
	"port":  "5432",
	"dialect":  "postgres"
},
```
