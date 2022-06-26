# API Requiremnets

## API Endpoints
### Users Endpoints
* Create user `[POST] /user (request body[{username:string, first_name:string, last_name: string, national_id: string{14}(only numbers), user_type: string, gender: string, phone: string{13}(only numbers, start with +20), email: string, address: string, password: string}]) => return token`
* Show [JWT token required] [JWT token contain user's ID] `[GET] /user`  
* Login (to get you token) `[POST] /login (request body[{national_id:string{14}(only numbers), password:string}]) => return token`
* Delete [JWT token required] [JWT token contain user's ID] `[DELETE] /user`
* Change [JWT token required] [JWT token contain user's ID] `[PUT] /user (request body([{property:string, value:string}])`

### Family Endpoints
* Show famliy admin [JWT token required] [JWT token contain family admin's ID] `[GET] /family/admin`
* Change family admin [JWT token required] `[PUT] /family/admin (request body([{property:stirng, value: string}]))`
* Create family admin [JWT token required] `[Post] /family/admin (request body[{user_id:number, membersCount:number, picture_id:number}])`
* Add family member [JWT token required] `[POST] /family/members (request body[{family_admin_id:number, medical_record:string(not required), phone:string{13}(only numbers, start with +20), email:string, picture_id:number}])`
* Change family member [JWT token required] `[PUT] /family/members (request body[{id:number, data:any}])`

### Picture Endpoints
* Show `[GET] /picture/:id` 
* Create `[POST] /picture (request body[{user_id:number}], request file[{path: path}])`
* Change `[PUT] /picture (request body[{id:number, path:path}])`