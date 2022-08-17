#include "variable.h"

template <typename T>

Variable<T>::Variable(String name, T* valor){
    this->ptr = valor;
}