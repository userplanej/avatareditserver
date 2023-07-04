# MINDS BACKEND

This repo contains the backend server for the GORILLA TABLE Project.The project uses

<ul>
  <li><a href='https://nodejs.org/en/'>Node.js</a>: backend framework;</li>
  <li><a href='https://expressjs.com/'>Express.js</a>: http server and routing;</li>
  <li><a href='https://sequelize.org/master/'>sequelize.js</a>: database ORM;</li>
  <li><a href='https://jwt.io/'>JSON web token</a>: authentication;</li>
</ul>

and is documented with <a href='https://swagger.io/'>Swagger.io</a> (available on <a href='http://localhost:3000/api-docs/'>http://localhost:3000/api-docs/</a>). the project uses a mysql database.

# Getting started

to start working with the project just :

```sh
# Clone the project
git clone https://github.com/luxpmsoft/gorilla_backend.git
# Fetch the remote (optional)
git fetch --all
# Create your own branch
git checkout -b <your branch name>
# install the dependancies
npm install
#Create your .env file // refer the the evironment variables block
#start the dev server
npm run dev
```

# Environment variables

The application expects to find a .env file containing the following variables:

```sh
# The http server port (3000 to conform with the swagger documentation)
PORT=3000
# the name of the project database in the mysql server you are using
DATABASE_NAME=<Databse name>
# the name of the user that can access the database in the mysql server you are using
DATABASE_USER_NAME=<user name>
# the name of the user that can access the database in the mysql server you are using
DATABASE_PASSWORD=<user password>
# the APIs routes base path (/api/v1 to conform with the swagger documentation)
BASE_PATH=/api/v1
```

# Architecture

The architecture is made while respecting the solid and clean architecture principales to ensure maximum independancy between the app components.

### Folders:

-   **models _(dir)_ :** contains the models for the application Objects(databse models/tables) with all the business logic required. each model have it own file and is made independant from the chosen ORM. _(this is the quivalent of the model in the mvc controller)_

-   **controllers _(dir)_ :** contains the controllers for each model and is independant from the router and the model. if the controller doesn't need any special logic consider using the controller builder in the helpers/utils.js _(this is the quivalent of the controller in the mvc controller)_

-   **services _(dir)_ :** contains functions that can be used by the controllers .

-   **routes _(dir)_ :** Contains the routes for each model/controller and are made independant from the routing framework

-   **helpers _(dir)_ :** Contains utilities.

-   **database _(dir)_ :** Contains all the elements for intiating the ORM

### Files:

-   **app _(file)_ :** Initiates the express application
-   **server _(file)_ :** Configures and start the server

# Documentation

the project uses <a href='https://swagger.io/'>Swagger.io</a> to describe the application and its APIs. to acces the documentation or test the APIs you can dinf the swagger UI in the following link :<a href='http://localhost:3000/api-docs/'>http://localhost:3000/api-docs/</a> (if you change the Port make sure that you are accessing the right port : http://localhost:PORT/api-docs/)



Navar information { provider: 'naver',
29|backend  |   id: '69326831',
29|backend  |   displayName: '캬바리아',
29|backend  |   emails: [ { value: 'jaehyunlee92@naver.com' } ],
29|backend  |   _json:
29|backend  |    { email: 'jaehyunlee92@naver.com',
29|backend  |      nickname: '캬바리아',
29|backend  |      profile_image: 'https://ssl.pstatic.net/static/pwe/address/img_profile.png',
29|backend  |      age: undefined,
29|backend  |      birthday: undefined,
29|backend  |      id: '69326831' } }



Asad kakao
b731337400d933080820b3a5e40ff0a2


# avatareditserver
