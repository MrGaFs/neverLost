# API Requiremnets

## API Endpoints
### Users endpoints
* Create user `[POST] /user (request body[{username:string, first_name:string, last_name: string, national_id: string, user_type: string, gender: string, phone: string, email: string, address: string, password: string}]) => return token`
* Show [JWT token required] [JWT token contain user's ID] `[GET] /user`  
* Login (to get you token) `[POST] /login (request body[{national_id:string, password:string}]) => return token`
* Delete [JWT token required] [JWT token contain user's ID] `[DELETE] /user`
* Change [JWT token required] [JWT token contain user's ID] `[PUT] /user (request body([{property:string, value:string}])`