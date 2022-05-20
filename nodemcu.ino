/*
 * Hi, I'm Marcus, an undergraduate at National University of Singapore, majoring 
 * in computer science. This code is used along side with the server I created 
 * and hosted on Heroku. If you are interest in the project, refer to 
 * https://github.com/marcuspeh/IOT_RGB_Lights for more information.
 */

#include <Adafruit_NeoPixel.h>
#include <Arduino_JSON.h>
#include <AsyncTimer.h>
#include <ESP8266WiFiMulti.h>
#include <ESP8266HTTPClient.h>
#include <stdlib.h>

//define NeoPixel Pin and Number of LEDs
#define PIN 14
#define NUM_LEDS 90

//define the pins for sound sensor
#define SOUNDPOWER 4
#define SOUNDOUTPUT 12

// define mode
#define OFF_MODE 0
#define NORMAL_LIGHT 1
#define SOUND_REACTIVE 2

//create a NeoPixel strip
Adafruit_NeoPixel strip = Adafruit_NeoPixel(NUM_LEDS, PIN, NEO_GRB + NEO_KHZ800);

// HTTP get links
// Link should be for HTTP GET .../api/device/:device_id
char httpGetUrl[] = "URL_LINK_GOES HERE";

// fingerprint for ssl
// refer to https://forum.arduino.cc/t/esp8266-httpclient-library-for-https/495245
char fingerprint[] = "SSL_FINGERPRINT_GOES_HERE";

// initialize rgb, brightness and mode
int red = 0;
int green = 0;
int blue = 0;
int brightness = 0;
int lightMode = 0;

// wifi connection
ESP8266WiFiMulti wifiMulti;
HTTPClient http;

// Async function to HTTP GET
AsyncTimer t;

void setup()
{
    Serial.begin(9600);

    // Setup strip
    strip.begin();
    strip.show();

    // Declare pin to power sound sensor
    pinMode(SOUNDPOWER, OUTPUT);

    // Set in station mode
    WiFi.mode(WIFI_STA);
  
    // Register multi WiFi networks
    wifiMulti.addAP("WIFI_1", "WIFI_1_PASSWORD");
    wifiMulti.addAP("WIFI_2", "WIFI_2_PASSWORD");

    // Setup the query
    t.setInterval(getRequest, 600);
}

void loop()
{ 
    // Handle the async timer
    t.handle();
    
    // Check the mode to run
    switch (lightMode) 
    {
        case OFF_MODE:
            offMode();
            break;
        case NORMAL_LIGHT:
            rgbMode();
            break;
        case SOUND_REACTIVE:
            soundMode();
            break;
    }
}

// connect to internet and get data from server
static void getRequest() {
    // Maintain WiFi connection
    if (wifiMulti.run() == WL_CONNECTED) {       
        // Start connection
        http.begin(httpGetUrl, fingerprint);
    
        // Connect using get
        int httpResponseCode = http.GET();

        // Process data if there is a response
        if (httpResponseCode > 0) {        
            // Get reponse and convert to json
            String payload = http.getString();
            JSONVar myObject = JSON.parse(payload); 
                 
            lightMode = int(myObject["data"]["device"]["mode"]);
            red = int(myObject["data"]["device"]["red"]);
            green = int(myObject["data"]["device"]["green"]);
            blue = int(myObject["data"]["device"]["blue"]);
            brightness = int (myObject["data"]["device"]["brightness"]);
          }
          
        // end connection
        http.end();
    } else {
      Serial.println("Connecting...");
    }
}

//set entire strip to same color
static void showColor(uint32_t c) {
    for(uint16_t i=0; i < strip.numPixels() + 4; i++) {
        strip.setPixelColor(i  , c); // Draw new pixel
    }
    strip.show();
}

// OFF mode
static void offMode() {
    digitalWrite(SOUNDPOWER, LOW);
    strip.setBrightness(0);
  
    showColor(strip.Color(0, 0, 0));
}


// RGB mode
static void rgbMode() {
    digitalWrite(SOUNDPOWER, LOW);
    strip.setBrightness(brightness);
    
    showColor(strip.Color(red, green, blue));
}

// Sound mode
static void soundMode() {
    digitalWrite(SOUNDPOWER, HIGH);
    strip.setBrightness(brightness);
    
    int red = map(analogRead(SOUNDOUTPUT), 0, 1023, 0, 255);
    delay(5);
    int green = map(analogRead(SOUNDOUTPUT), 0, 1023, 0, 255);
    delay(5);
    int blue = map(analogRead(SOUNDOUTPUT), 0, 1023, 0, 255);
    delay(5);
    showColor(strip.Color(red, green, blue));
    delay(100);
}