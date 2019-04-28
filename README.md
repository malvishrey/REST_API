# REST_API
REST API which will take request from the HTML form and insert the data into MySQL
database along with the current Date and Time.

# Operations

Submit for inserting the data into MySQL database.

Search bar for searching the record based on EmailID.

Delete for deleting the record based on EmailID.

# Pre-requisites
NodeJS

xampp

MySQL - Queries for creating database and table are given in `db_intern.sql`.

        For creating user, phpmyadmin can be used which can be accessed using xampp.

# Modules
Express
`npm install express`

MySQL
`npm install mysql`

body-parser
`npm install body-parser`

method-override
`npm install method-override`

# Execute

To start the server, go to REST_API folder and type the below code in CMD.

`node app1.js`

In browser, type `localhost:3000` in URL section and Web form will be displayed.

For reading data in form of JSON format `local:3000/show` in URL section.
