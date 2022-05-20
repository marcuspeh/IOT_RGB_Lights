# IOT_RGB_Lights

This project is mainly split into 3 parts in their respective branches
- Server [(branch)](https://github.com/marcuspeh/IOT_RGB_Lights/tree/server)
- App [(branch)](https://github.com/marcuspeh/IOT_RGB_Lights/tree/app)
- NodeMCU [(branch)](https://github.com/marcuspeh/IOT_RGB_Lights/tree/nodemcu)

## Server
Branch: [server](https://github.com/marcuspeh/IOT_RGB_Lights/tree/server)

This provides API endpoints for both server and the microcontroller to interact with each other. It is created using the following technologies:
- NodeJs with TypeScript
- Koa
- TypeORM
- Postgres

## Running the server
Prerequisite: nodejs, postgres

1) Installed the required dependency with `npm install`
2) Create a `.env` file at root with the following: 
```
DB_HOST = "db_host_goes_here"
DB_PORT = "db_port_goes_here"
DB_USERNAME = "db_username_goes_here"
DB_PASSWORD = "db_password_goes_here"
DB_NAME = "db_name_goes_here"
```
3) Run the postgres server
4) Run the server with `npm start`

## API
| End points | Method | Desription |
| --- | --- | --- | 
| /api | GET | Test if the server is up |
| /api/device | POST | Registers a new device |
| /api/device/:device_id | GET | Gets the info for the specified device |
| /api/device/:device_id | PATCH | Updates the info for the specified device |
