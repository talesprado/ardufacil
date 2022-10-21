#include <ArduinoX.h>
#include <ArduinoJson.h>

Experiment xp("Poste de luz", "Simula o funcionamento automatico de um poste de luz");
int variavel = 0;

void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
  
  xp.addVariable("var1", "Tem luz",   false);
  xp.addVariable("var2", "Noite", false);
  xp.addVariable("var3", "Chuva", true);
  xp.addSensor(12, "Fotovoltaico", 60);
  xp.updateVariable("var1", true);

  Serial.begin(9600);
  while(!Serial) continue;  

}

void loop() {
  
  if (xp.getValue<bool>("var1") and ( xp.getValue<bool>("var2") or xp.getValue<bool>("var3"))){
    digitalWrite(LED_BUILTIN, HIGH);
  }else{
    digitalWrite(LED_BUILTIN, LOW);
  }
  xp.updateExperiment();
   
}
