# API DOCUMENTATION 

Create an .env file with the following constants, where:
   - PORT : is the port where you go to run your server.
   - DB : is the URI of the mongo database.
   - JWT_SECRET : is the secret key used for JWT
   - SECRET: is the session secret
   - secretGoogle: is the pass complemention
Install the dependencies with npm i
Run the server with npm run dev (development) or npm start (production)

## API Reference

### Users


| Type | Details | Route     | Description                |
| :-------- |:-------- | :------- | :------------------------- |
| GET | get all users | http://localhost:PORT/api/users |  headers: {token} |
| GET | get user by id | http://localhost:PORT/api/users/:id |  headers: {token} |
| POST |  Register user   | http://localhost:PORT/api/users |  body : accept all User Schema |
| POST |  Login user   | http://localhost:PORT/api/users/login |  body : { email, password } |
| POST |  Login with google   | http://localhost:PORT/api/users/loginGoogle |  body : { name, email, image } |
| PUT | upgrade user by id |  http://localhost:PORT/api/users/:id | params : { id }, body : accept all User Schema, headers: {token} |
| DELETE | delete user by id | http://localhost:PORT/api/users/:id | params: { id }; headers: {token} |
| GET | logout | http://localhost:PORT/api/users/logout/:id | params: { id }; headers: {token} |


### User schema

| Key | Type |  Required |
| :-------- | :------- | :------------------------- |
| first_name | string | true |
| last_name | string | true |
| email | string | true |
| password | string | true |
| country | string | true |
| comments | array[string] | false |
| trips | array[string] | false |
| favorites | array[string] | false |
| avatar | string | false |
| role | string | false |
| status | string | false |

### Email

| Type | Details | Route     | Description                |
| :-------- |:-------- | :------- | :------------------------- |
| POST | send email | http://localhost:PORT/api/pass-recover |  body : { email, username } |
| GET | get token | http://localhost:PORT/api/pass-recover/:token |  params: { token } |

### PLaces

| Type | Details | Route     | Description                |
| :-------- |:-------- | :------- | :------------------------- |
| GET | get all places | http://localhost:PORT/api/places |  headers: {token} |
| GET | get place by id | http://localhost:PORT/api/places/:id |  headers: {token} |
| POST |  Register place   | http://localhost:PORT/api/places |  body : accept all place Schema |
| PUT | upgrade place by id |  http://localhost:PORT/api/places/:id | params : { id }, body : accept all place Schema, headers: {token} |
| DELETE | delete place by id | http://localhost:PORT/api/places/:id | params: { id }; headers: {token} |

### Place schema

| Key | Type |  Required |
| :-------- | :------- | :------------------------- |
| Name | string | true |
| location | string | true |
| Country | string | false |
| Image | string | false |
| Comments | array[string] | true |

### Comments

| Type | Details | Route     | Description                |
| :-------- |:-------- | :------- | :------------------------- |
| GET | get all comments | http://localhost:PORT/api/comments |  headers: {token} |
| GET | get all comments by user | http://localhost:PORT/api/comment/:id |  headers: {token} |
| GET | get comment by id | http://localhost:PORT/api/comment |  headers: {token} |
| POST |  create comment   | http://localhost:PORT/api/comment |  body : accept all Comment Schema |
| PUT | upgrade comment by id |  http://localhost:PORT/api/comment/:id | params : { id }, body : text, headers: {token} |
| DELETE | delete comment by id | http://localhost:PORT/api/comment/:id | params: { id }; headers: {token} |

### Comment schema

| Key | Type |  Required |
| :-------- | :------- | :------------------------- |
| userId | ObjectId | true |
| text | string | true |
| respondsId | string | false |
| date | string | true |
| placeId | string | true |

### Trip

| Type | Details | Route     | Description                |
| :-------- |:-------- | :------- | :------------------------- |
| GET | get all trips | http://localhost:PORT/api/trip |  headers: {token} filter: query{} |
| GET | get trip by id | http://localhost:PORT/api/trip/:id |  headers: {token} |
| POST |  Register trip   | http://localhost:PORT/api/trip |  body : accept all trip Schema |
| PUT | upgrade trip by id |  http://localhost:PORT/api/trip/:id | params : { id }, body : accept all trip Schema, headers: {token} |
| DELETE | delete trip by id | http://localhost:PORT/api/trip/:id | params: { id }; headers: {token} |

### Trip schema

| Key | Type |  Required |
| :-------- | :------- | :------------------------- |
| userId | ObjectId | true |
| commentsId | array[string] | false |
| date | string | true |
| placeId | string | true |
| description | string | true |

## Backend developers

- [@Tomas Rave](https://github.com/TomyReiv)
