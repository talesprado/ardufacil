#include <ArduinoX.h>
#include <ArduinoJson.h>

Experiment xp("Poste de luz", "Simula o funcionamento automatico de um poste de luz");
int variavel = 0;

void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
  
  xp.addVariable("var1", "Tem luz",   true);
  xp.addVariable("var2", "Noite", true);
  xp.addVariable("var3", "Chuva", false);
  xp.addSensor(123, "Fotovoltaico", 1);

  Serial.begin(9600);
  while(!Serial) continue;  
  xp.readEepromToVariables(); 
  
}

void loop() {
  Serial.println("ta loopando");
  xp.updateExperiment();
/*  if (xp.getValue<bool>("var1") and ( xp.getValue<bool>("var2") or xp.getValue<bool>("var3"))){
    digitalWrite(LED_BUILTIN, HIGH);
  }else{
    digitalWrite(LED_BUILTIN, LOW);
  }*/
  
   delay(1000);
}
