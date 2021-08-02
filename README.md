# Labenu Music Awards

##Instruções

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
`yarn build ou npm build` <br>
`yarn start ou npm start`<br>

O servidor estará rodando na porta http://localhost:3003, você poderá acessar pelos seguintes endpoits:

##ENDPOINTS

####Criar tabelas
* POST */tables*

####Criar usuário
*  POST */user/signup* <br>
body -> name, email, password, role

#### Login do usuário
* POST */user/login* <br>
  body -> email, password

####Criar banda
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