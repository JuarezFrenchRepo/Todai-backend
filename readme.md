Tōdai Backend					Jan 7, 2020 1:38 pm Lambda time

Here are the current user endpoints for the back-end.  Values and projects will be similar, I'll post those soon. This API allows you to view, post, edit and delete users, values, projects and their associated actions.

## WHAT CHANGED:

* Added endpoints for Values  endpoint:  `/api/values`
* New Changes are at the bottom.

 
 
Base URL : https://todai-backend.herokuapp.com/
 
## Authentication & Users
Access to protected routes will require login with username and password. A json token will be issued upon login. The tokens are limited to 4 hour session.
*Endpoints*
 
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
 
 -GET /api/auth/users - gets all users
 
- GET /api/auth/users/Homer - gets user by username
 
- PUT /api/auth/users/Marge  - updates a given user by username:

Change the value in the user object.

 {
"username": "Bart",
"password": "pass",
"email": "woof@springfield.org",
"phone":"541-555-1312"
 
}
 
- DELETE /api/auth/users/Mo - removes a given user by username and all associated data

# Model Users

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

  ## Projects
Access to protected routes will require login with username and password. A json token will be issued upon login. The tokens are limited to 4 hour session.
*Endpoints*
 
The following endpoints are available.
 
 -GET /api/projects - gets all projects
 
- GET /api/projects/id - gets project by ID

 - POST    /projects - creates new project
    
    "name": "Build week app",
    "description": "Make Todai a winner."
 
- PUT /api/projects/:id  - updates a given project by id:

Change the value in the project object.

 {
  "id": 1,
    "name": "Build week app",
    "description": "Make Todai a winner."
 
}
 
- DELETE /api/projects/1 - removes a given project by username and all associated data

# Model Projects

  {
    "id": 1,
    "name": "Build week app",
    "description": "Make Todai a winner."
  },
  {
    "id": 2,
    "name": "Plan Valentines Day dinner",
    "description": "Plan a romantic or group dinner - decide."
  },
  {
    "id": 3,
    "name": "Watch NCAA football championship",
    "description": "Watch the championship and get all the requisites."
  },

  //// VALUES ////

  ## Values
Access to protected routes will require login with username and password. A json token will be issued upon login. The tokens are limited to 4 hour session.
*Endpoints*
 
The following endpoints are available.
 
 -GET /api/values - gets all projects
 
- GET /api/values/id - gets project by ID

 - POST  /api/values - creates new project
    
     {

    "value": "Mindfulness"

  },

  # NOTE:  There are two other fields that will be used by the front-end:
  "top_three" (Boolean true/false) and "value_basis"  (text)  Value basis is the reason that the value is in the user's top 3. 
 
- PUT /api/values/:id  - updates a given value by id:

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