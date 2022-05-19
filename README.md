# IOT_RGB_Lights

This project is mainly split into 3 parts in their respective branches
- Server [(branch)](https://github.com/marcuspeh/IOT_RGB_Lights/tree/server)
- App [(branch)](https://github.com/marcuspeh/IOT_RGB_Lights/tree/app)
- ESP8266 [(branch)](https://github.com/marcuspeh/IOT_RGB_Lights/tree/esp8266)

## Foreword
This is developed based on what I wanted the RGB lights on my desk to do. It used as a replacement for Blynk (discontinued version).

## Server
Branch: [server](https://github.com/marcuspeh/IOT_RGB_Lights/tree/server)

This provides API endpoints for both server and the microcontroller to interact with each other. It is created using the following technologies:
- NodeJs with TypeScript
- Koa
- TypeORM
- Postgres

## App
Branch: [app](https://github.com/marcuspeh/IOT_RGB_Lights/tree/app)

This is used to register for a new device on the server as well as to send commands for the microcontroller.

## ESP8266
Branch: [ESP8266](https://github.com/marcuspeh/IOT_RGB_Lights/tree/esp8266)

The codes is used for ESP8266 and uploaded using Arduino IDE.
