# README

This is source codes of a tutorial to demonstrate how to use Sequelize to build a CRUD API.

It follows the steps in the [blog post](https://www.codementor.io/mirko0/how-to-use-sequelize-with-node-and-express-i24l67cuz).

## Prerequisite

- PostgreSQL installed and running
- A database with name `test-db-1` is created (Currently the database connection string is hard-coded in the sequelize.js file. If you use a different database, you need to customise the connection string in that file.)

## Run

```shell
npm run install
node index.js
```