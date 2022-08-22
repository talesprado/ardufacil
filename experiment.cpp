#include <ArduinoX.h>
#include <ArduinoJson.h>

Experiment xp("Poste de luz", "Simula o funcionamento automatico de um poste de luz");

void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
  
  StaticJsonDocument<200> doc;
  
   

   xp.addVariable("var1", "valor1");
   xp.addVariable("var2", "valor2");

  Serial.begin(9600);
  while(!Serial) continue;
  
  //serializeJsonPretty(, Serial);
  
}

void loop() {
  StaticJsonDocument<100> com;
  /*delay(1000);
  digitalWrite(LED_BUILTIN, HIGH);
  
  serializeJson(xp.getDoc(), Serial);
  Serial.print("/EOJO");
  delay(1000);
  xp.updateVariable("re", "2000");
  digitalWrite(LED_BUILTIN, LOW);*/
  if (Serial.available()){
    
    deserializeJson(com, Serial);
    if (com["action"] ==  "update"){
      digitalWrite(LED_BUILTIN, HIGH);
      serializeJson(xp.getDoc(), Serial);
      Serial.print("/EOJO");
    } 
    
  }
}
