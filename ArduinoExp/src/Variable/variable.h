#ifndef VARIABLE_H
#define VARIABLE_H

#include <Arduino.h>

template <typename T>
 
class Variable{
  private:
    String name;
    T* ptr;

  public:
    Variable(String name, T* value);
};
#endif