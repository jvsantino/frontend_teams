# Frontend, Cadastro de Times

Frontend de uma aplicação Full Stack para cadastro e gerenciamento de times.

A aplicação permite cadastrar, listar, buscar, editar e excluir times por meio de uma interface web integrada a uma API REST.

Cada time possui as seguintes informações:

- Nome
- País
- Ano de fundação

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- Fetch API
- GitHub Pages
- PWA

## Funcionalidades

O sistema permite realizar as principais operações de um CRUD:

- Cadastrar um novo time
- Listar todos os times cadastrados
- Buscar um time pelo ID
- Editar os dados de um time
- Excluir um time
- Atualizar a lista de times

## Estrutura dos dados

O frontend envia e recebe dados no seguinte formato:

```json
{
  "nome": "Santa Cruz",
  "pais": "Brasil",
  "ano": 1914
}
```

Após o cadastro, o MongoDB atribui um identificador único ao registro.

Exemplo de resposta da API:

```json
{
  "_id": "identificador_gerado_pelo_mongodb",
  "nome": "Santa Cruz",
  "pais": "Brasil",
  "ano": 1914
}
```

## Integração com o Backend

O frontend utiliza a Fetch API do JavaScript para realizar requisições HTTP para o backend.

A URL da API é definida no arquivo `app.js`:

```javascript
const API_URL = "URL_DO_BACKEND/times";
```

No ambiente local, a API pode ser utilizada através de:

```javascript
const API_URL = "http://localhost:3000/times";
```

No ambiente de produção, deve ser utilizada a URL do backend publicado no Render.

## Operações disponíveis

### Listar todos os times

```http
GET /times
```

Retorna todos os times cadastrados.

### Buscar time pelo ID

```http
GET /times/:id
```

Retorna um time específico utilizando o ID fornecido pelo MongoDB.

### Cadastrar um time

```http
POST /times
```

Exemplo dos dados enviados:

```json
{
  "nome": "Barcelona",
  "pais": "Espanha",
  "ano": 1899
}
```

### Atualizar um time

```http
PUT /times/:id
```

Atualiza os dados do time correspondente ao ID informado.

### Excluir um time

```http
DELETE /times/:id
```

Remove o time correspondente ao ID informado.

## Como executar localmente

### 1. Clone o repositório

```bash
git clone https://github.com/jvsantino/frontend_teams.git
```

### 2. Entre na pasta do projeto

```bash
cd frontend_teams
```

### 3. Certifique-se de que o backend esteja em execução

Para desenvolvimento local, o backend deve estar disponível em:

```text
http://localhost:3000
```

### 4. Inicie um servidor HTTP local

Uma opção é utilizar:

```bash
npx serve .
```

Também é possível utilizar uma extensão de servidor local no Visual Studio Code.

### 5. Abra a aplicação

Acesse no navegador o endereço informado pelo servidor HTTP local.

## Backend

O backend da aplicação foi desenvolvido com Node.js, Express, MongoDB e Mongoose.

Repositório:

https://github.com/jvsantino/backend_teams

O backend é responsável pela persistência dos dados e disponibiliza as rotas utilizadas pelo frontend.

## Deploy

O projeto utiliza uma arquitetura separada entre frontend e backend.

```text
Frontend
    |
    | Requisições HTTP
    v
API REST
    |
    v
Backend Node.js + Express
    |
    v
MongoDB
```

O frontend pode ser publicado através do GitHub Pages.

O backend pode ser publicado no Render e conectado ao MongoDB Atlas.

## Objetivo do projeto

Este projeto foi desenvolvido com finalidade acadêmica para colocar em prática conceitos de desenvolvimento Full Stack, incluindo:

- Desenvolvimento Frontend
- Desenvolvimento Backend
- API REST
- Operações CRUD
- Requisições HTTP
- Manipulação do DOM
- Programação assíncrona com JavaScript
- Integração entre Frontend e Backend
- Persistência de dados com MongoDB
- Deploy de aplicações web

## Autor

JOÃO VICTOR MENDES SANTINO DE OLIVEIRA

Projeto acadêmico desenvolvido para prática de desenvolvimento Full Stack.
