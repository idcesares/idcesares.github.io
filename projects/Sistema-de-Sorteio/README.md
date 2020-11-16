# 🎲 **Sistema de Sorteio Eletrônico**

**BASEADO NO SISTEMA DISPONIBILIZADO PELO INSTITUTO FEDERAL DE SANTA CATARINA - DEPARTAMENTO DE INGRESSO** 
Link para mais informações: [https://www.ifsc.edu.br/sorteio-publico](https://www.ifsc.edu.br/sorteio-publico)

**Autores:** Antonielly Garcia Rodrigues, Alex Helder Cordeiro de Oliveira | 01/2011

**Nova versão:** Isaac D'Césares | 07/2020

**Biblioteca** utilizada para semente de randomicidade: [https://github.com/davidbau/seedrandom](https://github.com/davidbau/seedrandom) | Copyright 2019 David Bau.

## **Objetivo**

- Este sistema tem como objetivo promover um sorteio eletrônico de vagas com base em uma quantidade de inscritos.

## Como funciona?

- O sistema utiliza números pseudoaleatórios para randomizar uma lista de números gerada a partir da quantidade de inscritos. O resultados serão dispostos em duas tabelas: **Primeira chamada e Lista de espera.**

## **Como utilizar este sistema**

- Faça o download do repositório;
- Extraia o conteúdo em uma pasta no seu computador;
- Execute o arquivo index.html;
- Preencha os campos requeridos e clique em **Gerar Lista.**

## **Como fazer a auditoria do sorteio?**

- Copie a semente utilizada para o sorteio e que foi disponibilizada na geração da lista;
- Acesse o sistema de sorteio;
- Preencha as informações de Nome do sorteio, Total de Inscritos e Vagas exatamente como o que foi publicado na listagem oficial disponibilizada;
- Clique na opção Inserir semente manualmente;
- Cole a semente que foi copiada anteriormente;
- Clique em Gerar Lista;
- Verifique os resultados obtidos com os resultados disponibilizados.

## Stack

- Javascript;
- Bootstrap;
- RandomSeed.js;