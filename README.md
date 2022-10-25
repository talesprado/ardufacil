# Ardufácil
![Arduino Board](/assets/images/Arduino-uno.png)

Ardufácil se trata de uma ferramenta que permite a parametrização de um programa Arduíno. Ele se divide em duas partes:
1. Uma biblioteca C++ que facilita a criação de um programa parametrizável
2. Uma página frontend que lê os parâmetros que podem ser redefinidos e os apresenta para um usuário final

## Aplicações

O Ardufácil pode ser utilizado por professores que queiram ensinar conceitos básicos de lógica para alunos através de experiências que representem o mundo real. Uma outra aplicação é o ajuste fino de parâmetros sem a necessidade de recompilar o código em aulas de física experimental por exemplo.

## Cronograma
Atualmente, as seguinte features já estão presentes na aplicação:
- Biblioteca em C++ que permite adicionar e atualizar variáveis e valores lidos de sensores
- Página frontend que conecta a uma placa Arduino, lê os parâmetros que podem ser modificados, atualizar os valores e salvar dados na EEPROM

![Ardufácil screenshot](/assets/images/ardufacil.png)

Para as próximas é necessário trabalhar na correção de bugs e implementação de algumas features:

| Data | Tarefa|
-------|-------|
31/10  | Correção de encoding que trava a aplicação |
07/11  | Implementação de atualização automática dos valores |
14/11  | Implementação da leitura automática dos valores de sensores |
21/11  | Implementação de novos tipos de variáveis que podem ser adicionados |
