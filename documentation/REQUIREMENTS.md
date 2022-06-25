# API Requiremnets

## API Endpoints
### Users endpoints
* Create user `[POST] /user (request body[{username:string, first_name:string, last_name: string, national_id: string, user_type: string, gender: string, phone: string, email: string, address: string, password: string}]) => return token`
* Show [JWT token required] [JWT token contain user's ID] `[GET] /user`  
* Login (to get you token) `[POST] /login (request body[{national_id:string, password:string}]) => return token`
* Delete [JWT token required] [JWT token contain user's ID] `[DELETE] /user`
* Change [JWT token required] [JWT token contain user's ID] `[PUT] /user (request body([{property:string, value:string}])`

## Data Shapes
### User
```sql
CREATE TABLE user{
    id serial PRIMARY KEY,
    username varchar(255) NOT NULL,
    first_name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL,
    national_id varchar(14) NOT NULL UNIQUE,
    gender varchar(6) NOT NULL,
    user_type varchar(10) NOT NULL,
    phone varchar(13) NOT NULL,
    email varchar(255) NOT NULL UNIQUE,
    adress varchar(255),
    password varchar(255) NOT NULL,
    created_at DateTime DEFAULT(NOW()),
    updated_at DateTime,
    picture Picture?,
    ultimate_user Ultimate_user?,
}
```