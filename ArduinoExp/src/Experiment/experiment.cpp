#include "experiment.h"
#include <EEPROM.h>

const int Experiment::UPDATE_VAR = 0;
const int Experiment::GET_STATE = 1;
Experiment::Experiment(String name, String desc){
    this->doc["name"] = name;
    this->doc["desc"] = desc;
    this->sensors = this->doc.createNestedArray("sensors");
    this->variables = this->doc.createNestedArray("variables");
}

void Experiment::addVariable(String name, String label,  boolean value){
    this->variables[this->posVar]["name"] = name;
    this->variables[this->posVar]["value"] = value;
    this->variables[this->posVar]["label"] = label;  
    this->variables[this->posVar]["type"] = "checkbox";
    this->posVar++;
}

void Experiment::addVariable(String name, String label, int value){
    this->variables[this->posVar]["name"] = name;
    this->variables[this->posVar]["value"] = value; 
    this->variables[this->posVar]["label"] = label;
    this->variables[this->posVar]["type"] = "range";
    this->posVar++;
}

void Experiment::updateVariable(String name, int newValue){
    for (int i=0; i < this->posVar; i++){
	if (this->variables[i]["name"] == name){
	    this->variables[i]["value"] = newValue;
	}
    }
}

void Experiment::updateVariable(String name, boolean newValue){
    for (int i=0; i < this->posVar; i++){
	if (this->variables[i]["name"] == name){
	    this->variables[i]["value"] = newValue;
	}
    }
}

void Experiment::addSensor(int pin, String name, int value){
    this->sensors[this->posVarSensor]["name"] = name;
    this->sensors[this->posVarSensor]["value"] = value; 
    this->sensors[this->posVarSensor]["pin"] = pin;
    this->posVarSensor++;
}

void Experiment::updateSensors(){
    for (int i=0; i < this->posVarSensor; i++){
	this->sensors[i]["value"] = analogRead(this->sensors[i]["pin"]);
    }
}

template <typename T>
T Experiment::getValue(String name){
    for (int i=0; i < this->posVar; i++){
	if (this->variables[i]["name"] == name){
	   return this->variables[i]["value"];
	}
    }
}

StaticJsonDocument<500> Experiment::getDoc(){
    
    //sserializeJson(this->doc, Serial);
    return this->doc;
}

void Experiment::writeVariablesToEeprom(){
	bool isEepromWriten = true; //if values were saved to EEPROM
	int posAddr = 0;
	
	EEPROM.put(posAddr, isEepromWriten);
	posAddr += sizeof(bool);
	if (isEepromWriten){
	    for (int i=0; i < this->posVar; i++){
			
			if(this->variables[i]["type"] == "checkbox"){
				bool varValue = this->variables[i]["value"];
				EEPROM.put(posAddr, varValue);
				posAddr += sizeof(bool);
			}else if (this->variables[i]["type"] == "range"){
				int varValue = this->variables[i]["value"];
				EEPROM.put(posAddr, varValue);
				posAddr += sizeof(int);
			}
		}
	}
}

void Experiment::readEepromToVariables(){
    bool isEepromWriten; //if values were saved to EEPROM
	int posAddr = 0;
	
	EEPROM.get(posAddr, isEepromWriten);
	posAddr += sizeof(bool);
	if (isEepromWriten){
	    for (int i=0; i < this->posVar; i++){
			
			if(this->variables[i]["type"] == "checkbox"){
				bool varValue;
				EEPROM.get(posAddr, varValue);
				this->variables[i]["value"] = varValue;
				posAddr += sizeof(bool);
			}else if (this->variables[i]["type"] == "range"){
				int varValue;
				EEPROM.get(posAddr, varValue);
				this->variables[i]["value"] = varValue;
				posAddr += sizeof(int);
			}
		}
	}
}

void Experiment::updateExperiment(){
  StaticJsonDocument<150> com;
  JsonObject obj;
  bool newValueBool;
  int newValueInt;
  com["action"] = "";
  if (Serial.available()){
    deserializeJson(com, Serial);
	//serializeJson(com, Serial);
	if (com["action"] == "update"){
	  serializeJson(this->getDoc(), Serial);
	  Serial.println("/EOJO");
    }else if (com["action"] == "update_var"){
      obj = com["variable"].as<JsonObject>();
	  for (JsonPair p : obj){
        if(p.key() == "value"){
	      if(p.value().is<bool>()){
		    newValueBool = p.value();
            this->updateVariable(com["variable"]["name"], newValueBool); 
          }else if(p.value().is<int>()){
            newValueInt = p.value();
            this->updateVariable(com["variable"]["name"], newValueInt);
          } 
        }
      }
      serializeJson(this->getDoc(), Serial);
      Serial.println("/EOJO"); 
    } else {
		Serial.flush();
	}
	com["action"] = "";
  } 
}
