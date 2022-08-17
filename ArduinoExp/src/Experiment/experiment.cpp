#include "experiment.h"


Experiment::Experiment(String name, String desc){
    this->doc["name"] = name;
    this->doc["desc"] = desc;
    this->sensors = this->doc.createNestedArray("sensors");
    this->variables = this->doc.createNestedArray("variables");
}

void Experiment::addVariable(String name, String value){
    this->variables[this->posVar]["name"] = name;
    this->variables[this->posVar]["value"] = value; 
    this->posVar++;
}

StaticJsonDocument<200> Experiment::getDoc(){
    
    serializeJson(this->doc, Serial);
    return this->doc;
}
