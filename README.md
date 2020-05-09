# Ticket booking service

##**GET /tickets/open**\
Params: not required\
Body: not required\
Header: not required\
\
##**GET /tickets/closed**\
Params: not required\
Body: not required\
Header: not required\
\
##**GET /:ticket_id/get-user**\
Params: **ticket_id** required\
Body: not required\
Header: not required\
\
##**GET /:ticket_id/get-status**\
Params: **ticket_id** required\
Body: not required\
Header: not required\
\
##**PUT /admin/reset**\
Params: not required\
Body: not required\
Header: **api_key** required\
\
##**PUT /admin/update/:ticket_id**\
Params: **ticket_id** required\
Body: required\
* **isBooked** : boolean required (true for closing/ false for opening)\
* **person** : Object required if isBooked=true\
  - firstName : String required\
  - lastName : String optional\
  - age : Number(>0) optional\
  - gender : String (only Male/Female/Others accepted) optional\
  - mobileNumber : String optional (should be unique)\
  - emailId : String optional (should be unique)\
  - Header: **api_key** required
