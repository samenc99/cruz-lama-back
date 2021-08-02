# Labenu Music Awards

![lama-logo](https://user-images.githubusercontent.com/77743802/127909278-c4851b33-ae8f-4d08-9cb1-76308383f502.png)

## Sumário

- [Tecnologias](#tecnologias)
- [Instruções](#instruções)
- [Descrição do projeto](#descrição-do-projeto)
- [Endpoints](#endpoints)

## Tecnologias
- [Node.js](https://nodejs.org/) - é um software que permite a execução de códigos JavaScript fora de um navegador web. </br>
- [Typescript](https://www.typescriptlang.org/) - é uma linguagem de programação. É um superconjunto sintático estrito de JavaScript e adiciona tipagem estática opcional à linguagem.</br>
- [MySql](https://www.mysql.com/) - é um sistema de gerenciamento de banco de dados, que utiliza a linguagem SQL como interface.</br>


## Instruções

Abra o terminar e digite o comando: <br>
`git clone https://github.com/samenc99/cruz-lama-back.git` <br>
`cd cruz-lama-back/` <br>

Abra a pasta do projeto, e cole dentro da pasta 'build' o arquivo .env, com as seguintes
chaves: <br>
`DB_HOST =` <br>
`DB_USER =` <br>
`DB_PASSWORD =` <br>
`DB_DATABASE_NAME =` <br>
`JWT_KEY =` <br>
`BCRYPTJ_COST = 12` <br>
`ACCESS_TOKEN_EXPIRES_IN = 1h` <br>

No terminal digite o comando:<br>
`yarn ou npm install` <br>
`yarn build ou npm build` <br>
`yarn start ou npm start`<br>

O servidor estará rodando na porta http://localhost:3003.

## Descrição do projeto
Fora o projeto final do módulo de back-end do bootcamp da Labenu. Feito em dupla junto com 
o [Angelo](https://github.com/AngeloVSO). <br>
O intuito do projeto era criar um sistema para administrar um festival de bandas. <br>
As funcionalidades do projeto podem ser conferidas a seguir:

- 1. Cadastro

O nosso sistema deve permitir o registro os usuários que irão usá-lo. Para se cadastrar, 
é necessário passar um email, um nome e uma senha, e também uma função dentro do sistema. 
Você pode ser um cliente (normal) ou um administrador do sistema (admin). 

- 2. Login

Para realizar o login, basta informar seu e-mail e a sua senha.

- 3. Endpoint de registrar banda

Para uma banda ser criada, precisamos das informações: nome, gênero musical principal a qual 
ela se identifica e o nome de um responsável (que pode ser qualquer membro dela). 
Não podem existir duas bandas com o mesmo nome. **Somente administradores** podem registrar bandas.

- 4. Endpoint de visualização de detalhes sobre a banda

Esse endpoint deve receber o id **ou** o nome da banda e retornar todas as informações 
salvas sobre ela.

- 5. Endpoint de adicionar um show a um dia

Para cadastrar um show, o endpoint precisa do id da banda, o dia (sexta, sábado ou domingo) e 
o horário em que ela irá se apresentar (entre 08h e 23h). Além disso os shows só podem ser marcados em 
horários redondos, ou seja, pode ser 08h - 09h ou 09h - 13h mas não pode ser 09h - 10h30 ou 
10h30 - 14h.

- 6. Endpoint de pegar todos os shows de uma data

Recebe um dia (sexta, sábado ou domingo) e retorna todos os shows daquela data, mostrando somente o nome 
da banda e o gênero musical principal.

- 7. Endpoint de criar um ingresso

Para criar, precisa indicar: nome do ingresso, valor, o id do evento e 
a quantidade de ingressos. **Somente administradores** podem registrar ingressos.

- 8. Comprar ingresso

Deve receber a quantidade de ingressos e o nome.

- 9.  Adicionar foto

Endpoint que adiciona uma foto para a galeria de um evento.

- 10. Pegar todas as fotos

O endpoint receberá o identificador do usuário e devolverá todas as fotos do evento.

## ENDPOINTS

#### Criar tabelas
* POST */tables*

#### Criar usuário
*  POST */user/signup* <br>
   body -> name, email, password, role

#### Login do usuário
* POST */user/login* <br>
  body -> email, password

#### Criar banda
* POST */band/create* <br>
  body -> name, music_genre, responsible <br>
  Authorization -> token

#### Buscar banda pelo id ou name
* GET */band/:idOrName*

#### Criar show
* POST */show/create* <br>
  body -> weekDay, startTime, endTime, bandId
  Authorization -> token

#### Buscar todos os shows de um dia
* GET */show/:weekDay*

#### Criar ingresso
* POST */show/ticket* <br>
  body -> name, showId, value, ticketsQuantity <br>
  Authorization -> token

#### Comprar ingresso
* PUT */show/ticket* <br>
  body -> name, ticketsQuantity <br>
  Authorization -> token

#### Adicionar uma foto
* PUT */show/photo/:showId* <br>
  body -> url
  Authorization -> token

#### Obter todas as fotos
* GET */show/photo* <br>
  Authorization -> token
