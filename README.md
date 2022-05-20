# IOT_RGB_Lights

This project is mainly split into 3 parts in their respective branches
- Server [(branch)](https://github.com/marcuspeh/IOT_RGB_Lights/tree/server)
- App [(branch)](https://github.com/marcuspeh/IOT_RGB_Lights/tree/app)
- NodeMCU [(branch)](https://github.com/marcuspeh/IOT_RGB_Lights/tree/nodemcu)

## NodeMCU
Branch: [nodemcu](https://github.com/marcuspeh/IOT_RGB_Lights/tree/nodemcu)

The codes is used for nodemcu ESP8266 and uploaded using Arduino IDE. I made use of `AsyncTimer`
to run the querying of device info in 'pseudo' parallel which makes the entire response time 
less laggier. If a faster response time is needed, reduce the timing from 600ms to something lower
in this line `t.setInterval(getRequest, 600);`

This codes only does basic functions without any preset. If preset lighting mode is needed, modification
is required.

## Parts needed
- Nodemcu
- Sound sensor
- Neopixel RGB led strips

## Connections
Led strip 
- Control pin: `pin 14`
- Power: `5v`
- Ground: `gnd`

Sound sensor
- Analogue pin: `pin 12`
- Power: `pin 4`
- Ground: `gnd`
