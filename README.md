# RF (Requisitos funcionais) Exemplo: funções da aplicação

- [x] O usuário deve poder criar nova transação;
- [x] O usuário deve poder obter um resumo da sua conta;
- [x] O usuário deve poder listas todas transações que já ocorreram;
- [x] O usuário deve poder visualizar uma transação única;

-----------------------------------------------------------------------------

- [x] O usuário deve poder ser autenticar na aplicação;
- [] O usuário deve poder consultar informações referente a um beneficiário;

# RN (Regra de negócio) Exemplo: requisitos ou validações que devem ser respeitadas

- [x] A transação pode ser do tipo crédito que somará ao valor total ou débito irá ser subtraído do total;
- [x] Deve ser possível identificarmos o usuário entre as requisições;
- [] O usuário só pode visualizar transações o qual ele criou;

----------------------------------------------------------------------------

- [x] O usuário só pode consultar informações se estiver autenticado
= [] Deve-se usar o CPF no beneficiário para realização da consulta no banco de dados;

# RNF (Requisitos não funcionais)