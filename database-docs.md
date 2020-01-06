Tōdai Backend					Jan 6, 2020 1:00 pm Lambda time

Here are the current user endpoints for the back-end.  Values and projects will be similar, I'll post those soon. This API allows you to view, post, edit and delete users, values, projects and their associated actions.

WHAT CHANGED:

* added the base url
* changed the endpoints to  /auth/user for user ops.
 
 
Base URL : https://todai-backend.herokuapp.com/
 
# Authentication
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