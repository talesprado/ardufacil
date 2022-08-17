#ifndef EXPERIMENT_H
#define EXPERIMENT_H

#include <Arduino.h>

class Sensor{
  public:
    int value;
    Sensor(char name, byte pin);
    int getValue();
    void setValue(int value);     
    
}
