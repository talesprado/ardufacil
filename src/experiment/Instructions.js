import React, {useState} from 'react';

const Instructions = () => {
    return ( <ul>
        <li>A coluna da esquerda mostra os valores sendo lido nos sensores</li>
        <li>A coluna da direita permite você definir os valores das variáveis </li>
        <li>Após configurar, clique em Salvar para que os valores fiquem armazenados no Arduino</li>
        </ul>);
}

export default Instructions;