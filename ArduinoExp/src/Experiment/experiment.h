#ifndef EXPERIMENT_H
#define EXPERIMENT_H

#include <Arduino.h>
#include <ArduinoJson.h>


class Experiment {
  private:
    String name;
    String desc;
    int posVar = 0;
    StaticJsonDocument<200> doc;
    JsonArray sensors;
    JsonArray variables;
  //  Sensor sensors;

  public:
    Experiment(String name, String desc);

  //  Sensor addSensor(byte pin, char name, int value);
    void addVariable(String name, String defaultValue);
    void updateVariable(String name, String newValue);
    StaticJsonDocument<200> getDoc();
    
    
};
#endif