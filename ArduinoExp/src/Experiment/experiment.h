#ifndef EXPERIMENT_H
#define EXPERIMENT_H

#include <Arduino.h>
#include <ArduinoJson.h>


class Experiment {
  private:
    String name;
    String desc;
    int posVar = 0;
    int posVarSensor = 0;
    StaticJsonDocument<400> doc;
    JsonArray sensors;
    JsonArray variables;
    

  public:
    static const int UPDATE_VAR;
    static const int GET_STATE;
    Experiment(String name, String desc);

    void addVariable(String name, String label, boolean defaultValue);
    void addVariable(String name, String label, int defaultValue);
    void updateVariable(String name, boolean newValue);
    void updateVariable(String name, int newValue);
    void addSensor(int pin, String name, int value);
    void updateSensors();
    template <typename T>
    T getValue(String name);
    void updateExperiment();
    StaticJsonDocument<500> getDoc();
    
    
};
#endif
