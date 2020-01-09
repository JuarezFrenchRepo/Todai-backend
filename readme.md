Tōdai Backend					Jan 8, 2020 9:10 am Lambda time

Here are the current user endpoints for the back-end.  Values and projects will be similar, I'll post those soon. This API allows you to view, post, edit and delete users, values, projects and their associated actions.

## WHAT CHANGED:
* Users - changed the "GET by username" shape and added "GET by ID"
* Values - now has boolean true/false "select" and 'Top 3" fields. Default for both is "false". Updated the Values table to display the shortened value names.
* Added endpoints for Values  endpoint:  `/api/values`
* The GETs for all resources (users, projects, values) now return all available fields so that you can see what fields are avaiable.


 
 
Base URL : https://todai-backend.herokuapp.com/
 
# Authentication & Users
Access to protected routes will require login with username and password. A json token will be issued upon login. The tokens are limited to 4 hour session.

## Endpoints
 
The following endpoints are available.
 
  - POST    /api/auth/register - creates new user

 {
"username": "Bart",
"password": "pass",
"email": "woof@springfield.org",
"phone":"541-555-1312"
 }
 
 - POST  /api/auth/login/ - logs registered user in, will return a token.
 {
"username": "Maggie",
"password": "pass"
 }
 
- GET /api/auth/users - gets all users
 
- GET /api/auth/users?username=Homer  - gets user by username

- GET /api/auth/:id - Gets user by id.
 
- PUT /api/auth/users/Marge  - updates a given user by username:

Change the value in the user object.

 {
"username": "Marge",
"password": "pass",
"email": "marge@springfield.org",
"phone":"541-555-1312"
 }
 
- DELETE /api/auth/users/Mo - removes a given user by username and all associated data

## Model Users

  {
    "id": 2,
    "username": "Lisa",
    "password": "pass",
    "email": "lisa@springfield.org",
    "phone": "541-555-1312"
  },
  {
    "id": 3,
    "username": "Maggie",
    "password": "pass",
    "email": "maggie@springfield.org",
    "phone": "541-555-1312"
  },
  {
    "id": 4,
    "username": "Bart",
    "password": "pass",
    "email": "bart@springfield.org",
    "phone": "541-555-1312"
  },

# Projects
Access to protected routes will require login with username and password. A json token will be issued upon login. The tokens are limited to 4 hour session.

##Endpoints
 
The following endpoints are available.
 
- GET /api/projects - gets all projects
 
- GET /api/projects/id - gets project by ID

- POST    /projects - creates new project
    
    {
    "name": "Build week app",
    "description": "Make Todai a winner."
    }
    
- PUT /api/projects/:id  - updates a given project by id:

Change the value in the project object.

 {
    "name": "Build week app",
    "description": "Make Todai a winner."
 }
 
- DELETE  /api/projects/:id - removes a given project by username and all associated data

## Model Projects

  {
    "id": 1,
    "name": "Read the modern American classics",
    "description": "Read the modern classics like Hemmingway, Fitzgerald et al.",
    "user_id": 1,
    "value_id": null
  },


  {
    "id": 2,
    "name": "Work BW App",
    "description": "Hit MVP and bask in glory",
    "user_id": 1,
    "value_id": null
  }
]


# Values
Access to protected routes will require login with username and password. A json token will be issued upon login. The tokens are limited to 4 hour session.
*Endpoints*
 
The following endpoints are available.
 
 -GET /api/values - gets all projects
 
- GET /api/values/id - gets project by ID

 - POST  /api/values - creates new project
    
  {
    "value": "Mindfulness"

  },

## NOTE:  There are two other fields that will be used by the front-end:
  "top_three" (Boolean true/false) and "value_basis"  (text)  Value basis is the reason that the value is in the user's top 3. 
 
- PUT /api/values/:id  - updates a given value by value:

Change the value in the project object.

 {
    "id": 8,
    "value": "Mindfulness"
  }
 
- DELETE /api/values/:id - removes a given project by username and all associated data by id.

# Model Values

 {
    "id": 2,
    "value": "Art and Literature"
  },
  {
    "id": 1,
    "value": "Athletic ability"
  },
  {
    "id": 3,
    "value": "Creativity, discovering or inventing"
  },