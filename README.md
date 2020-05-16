# Ticket booking service

##**GET /login** : Login and get jwt token\
Params: not required\
Header: not required\
Body: required
* **username** : String required
* **password** : String required

##**GET /tickets/open** : Returns all open tickets\
Params: not required\
Body: not required\
Header: not required\
\
##**GET /tickets/closed**  : Returns all closed tickets\
Params: not required\
Body: not required\
Header: not required\
\
##**GET /:ticket_id/get-user**  : Returns user details of ticket with id=ticket_id\
Params: **ticket_id** required\
Body: not required\
Header: not required\
\
##**GET /:ticket_id/get-status** : Returns booking status of ticket with id=ticket_id\
Params: **ticket_id** required\
Body: not required\
Header: not required\
\
##**PUT /admin/reset** : Reset and open up all tickets\
Params: not required\
Body: not required\
Header: **Authorization** required  (Bearer token from login request)\
\
##**PUT /admin/update/:ticket_id** : Update the ticket status (open/close + adding user details)\
Params: **ticket_id** required\
Header: **Authorization** required (Bearer token from login request)\
Body: required
* **isBooked** : boolean required (true for closing/ false for opening)
* **person** : Object required if isBooked=true
  - firstName : String required
  - lastName : String optional
  - age : Number(>0) optional
  - gender : String (only Male/Female/Others accepted) optional
  - mobileNumber : String optional (should be unique)
  - emailId : String optional (should be unique)

