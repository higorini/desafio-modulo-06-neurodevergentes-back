# NeuroDevergentes

## Sprint 1

Ao longo das entregas das sprints, serão implementadas novas funcionalidades.

### A API permitirá ao usuário:

- Fazer login
- Cadastrar usuário
- Atualizar os dados do perfil
- Visualizar os dados do perfil
- Cadastrar clientes
  - Visualizar os clientes:
    - Clientes inadimplentes
    - Clientes em dia
  - Visualizar Resumo das cobranças:
    - Total pagas
    - Total vencidas
    - Total previstas
    - Detalhes cobranças pagas
    - Detalhes cobranças vencidas
    - Detalhes cobranças previstas

### A API não permitirá ao usuário:

- Adicionar foto de perfil
- Deletar conta

## Requisitos obrigatórios

- Seguir padrão REST
- Código organizado, delimitando responsabilidade de cada arquivo
- Valores em dinheiro deverão ser representados em centavos (Ex.: R$ 10,00 reais = 1000)
- Evitar duplicidade de Código

## URL da API
```javascript
 https://calm-gold-lion-veil.cyclic.cloud/
```
### Status Codes

```javascript
// 200 (OK) = requisição bem sucedida
// 201 (Created) = requisição bem sucedida e algo foi criado
// 204 (No Content) = requisição bem sucedida, sem conteúdo no corpo da resposta
// 400 (Bad Request) = o servidor não entendeu a requisição pois está com uma sintaxe/formato inválido
// 401 (Unauthorized) = o usuário não está autenticado (logado)
// 403 (Forbidden) = o usuário não tem permissão de acessar o recurso solicitado
// 404 (Not Found) = o servidor não pode encontrar o recurso solicitado
```
# Endpoints

## Usuário

### Listar Usuários já cadastrados

O endpoint permite listar os usuários ja cadastrdos no sistema. Ele retornará um array de objetos.

#### Requisição

- **Método:** `GET`
- **Rota:** `/users`

#### Exemplos de Respostas

- **Sucesso (200 OK)**
  - Corpo da Resposta:
    ```json
    [
      {
        "id": 1,
        "name": "johan",
        "email": "johan@gmail.com",
        "cpf": "432.654.388-78",
        "phone": "(88) 9 9898-9898"
      },
      {
        "id": 2,
        "name": "thiago",
        "email": "Thiago1@hotmail.com",
        "cpf": null,
        "phone": null
	    }
    ]
    ```
- **Erro (500 Internal Server Error)**
  - Corpo da Resposta:
    ```json
    { "message": "Ocorreu um erro interno." }
    ```
<br/>

### Verificar E-mail ja existente

O endpoint permite verificar se o E-mail que deseja ser cadastrado já existe no banco de dados.

#### Requisição

- **Método:** `POST`
- **Rota:** `/validateEmail`

#### Corpo da Requisição

- `email` (string, obrigatório): Endereço de e-mail do usuário.
- `name` (string, obrigatório): Nome do usuário.

#### Exemplos de Respostas

- **Sucesso (200 OK)**
  - Corpo da Resposta caso E-mail **disponível**:

    ```json
    {
      "message": "E-mail disponível para cadastro.",
    }
    ```

- **Erro (500 Internal Server Error)**
  - Corpo da Resposta:

    ```json
    {
      "message": "Ocorreu um erro interno."
    }
    ```
<br/>

### Cadastro do Usuário

O endpoint permite o cadastro de um novo usuário no sistema.

#### Requisição

- **Método:** `POST`
- **Rota:** `/signup`

#### Corpo da Requisição

- `name` (string, obrigatório): Nome do usuário.
- `email` (string, obrigatório): Endereço de e-mail do usuário.
- `password` (string, obrigatório): Senha do usuário.

#### Exemplos de Respostas

- **Sucesso (201 Created)**
  - Corpo da Resposta:
    ```json
    {
      "message": "Usuário cadastrado com sucesso.",
    }
    ```
- **Erro (400 Bad Request)**
  - Corpo da Resposta:
    ```json
    {
      "message": "E-mail informado já existe cadastrado."
    }
    ```
<br/>


### Login do Usuário

O endpoint permite a autenticação de um usuário no sistema.

#### Requisição

- **Método:** `POST`
- **Rota:** `/login`


#### Corpo da Requisição

- `email` (string, obrigatório): Endereço de e-mail do usuário.
- `password` (string, obrigatório): Senha do usuário.

#### Exemplos de Respostas

- **Sucesso (200 OK)**
  - Corpo da Resposta:
    ```json
    {
      "userData": {
        "id": 4,
        "name": "mario",
        "email": "mario@gmail.com",
        "cpf": null,
        "phone": null
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjk0ODYwMDM4LCJleHAiOjE2OTQ4ODg4Mzh9.0TD0TbUVpmKF64QHlw2eHE7E06X55BFNCctqKetK1BQ"
    }
    ```
- **Erro (401 Unauthorized)**
  - Corpo da Resposta:
    ```json
    {
      "message": "E-mail ou senha inválidos."
    }
    ```
<br/>

### ATENÇÃO: 
A partir de agora, para acessar todas as rotas a seguir será necessário passar o Token de autenticação do usuário que foi fornecido durante o **Login** no **Header** da requisição.

#### Exemplo
- Header da requisição:
 ```json
  {
    "Authorization": "Bearer { token }"
  }
  ```
<br/>

### Obter informações do usuário logado
Essa rota será usada para obter informacoes do seu perfil do usuario que está logado no sistema.

#### Requisição

- **Método:** `GET`
- **Rota:** `/user`

#### Header da Requisição
- `token` (string, obrigatório): Token gerado após login.
#### Exemplos de Respostas
- **Sucesso (200 OK)**
- Corpo da Resposta:
  ```json
  {
    "id": 4,
    "name": "mario",
    "email": "mario@gmail.com",
    "cpf": null,
    "phone": null
  }
  ```
- **Erro (400 Bad Request)**
  - Corpo da Resposta:
    ```json
    {
      "message": "Token inválido."
    }
    ```
<br/>

### Edição do Usuário

O endpoint permite a edição dos dados de um usuário autenticado no sistema.

#### Requisição

- **Método:** `PUT`
- **Rota:** `/user/edit`
  
#### Header da Requisição
- `token` (string, obrigatório): Token gerado após login.

#### Corpo da Requisição

- `name` (string, obrigatório): Novo nome do usuário.
- `email` (string, obrigatório): Novo endereço de e-mail do usuário.
- `password` (string, opcional): Nova senha do usuário.
- `cpf` (string, opcional): Novo CPF do usuário.
- `telephone` (string, opcional): Novo número de telefone do usuário.

#### Exemplos de Respostas

- **Sucesso (200 OK)**
  - Corpo da Resposta:
    ```json
    {
      "message": "Dados do usuário atualizados com sucesso."
    }
    ```
- **Erro (400 Bad Request)**
  - Corpo da Resposta:
    ```json
    {
      "message": "E-mail informado já está sendo utilizado por outro usuário."
    }
    ```
<br/>

## Cliente

### Listar Clientes já cadastrados

O endpoint permite listar os clientes ja cadastrdos no sistema **daquele usuario logado**. Ele retornará um array de objetos.

#### Requisição

- **Método:** `GET`
- **Rota:** `/costumers`

#### Exemplos de Respostas

- **Sucesso (200 OK)**
  - Corpo da Resposta:
    ```json
    [
      {
        "id": 7,
        "user_id": 4,
        "name": "jojo todinho",
        "email": "jojo@gmail.com",
        "cpf": "123;456.456-87",
        "phone": "(55) 9 6554-7878",
        "cep": null,
        "public_place": null,
        "complement": null,
        "neighborhood": null,
        "city": null,
        "state": null,
        "status": "Inadimplente"
	    },
      {
        "id": 8,
        "user_id": 4,
        "name": "Carlos eduardo",
        "email": "eduardo@gmail.com",
        "cpf": "234.456.456-87",
        "phone": "(58) 9 6554-7878",
        "cep": null,
        "public_place": null,
        "complement": null,
        "neighborhood": null,
        "city": null,
        "state": null,
        "status": "Em dia"
      }
    ]
    ```
- **Erro (500 Internal Server Error)**
  - Corpo da Resposta:
    ```json
    { "message": "Ocorreu um erro interno." }
    ```
<br/>

### Cadastro de Cliente

O endpoint permite o cadastro de um novo cliente no sistema.

#### Requisição

- **Método:** `POST`
- **Rota:** `/costumer/signup`


#### Header da Requisição
- `token` (string, obrigatório): Token gerado após login.

#### Corpo da Requisição

- `name` (string, obrigatório): Nome do cliente.
- `email` (string, obrigatório): Endereço de e-mail do cliente.
- `cpf` (string, obrigatório): CPF do cliente.
- `telephone` (string, obrigatório): Número de telefone do cliente.
- `cep` (string, opcional): CEP do cliente.
- `public_place` (string, opcional): Logradouro do cliente.
- `complement` (string, opcional): Complemento do endereço do cliente.
- `neighborhood` (string, opcional): Bairro do cliente.
- `city` (string, opcional): Cidade do cliente.
- `state` (string, opcional): Estado do cliente.
- `status` (string, obrigatório): Situação do cliente.

#### Exemplos de Respostas

- **Sucesso (201 Created)**
  - Corpo da Resposta:
    ```json
    {
      "id": 8,
      "user_id": 4,
      "name": "Carlos eduardo",
      "email": "eduardo@gmail.com",
      "cpf": "234.456.456-87",
      "phone": "(58) 9 6554-7878",
      "cep": null,
      "public_place": null,
      "complement": null,
      "neighborhood": null,
      "city": null,
      "state": null,
      "status": "Em dia"
    }
    ```
- **Erro (400 Bad Request)**
  - Corpo da Resposta:
    ```json
    {
      "message": "E-mail informado já existe cadastrado para outro cliente."
    }
    ```

### Preenhcimento automatico do CEP

- **Método:** `GET`
- **Rota:** `/getCostumerCep/:cep`

#### Parâmetro da Requisição

- `cep` (string, obrigatório): Numero do cep do usuario.

- **Sucesso (200 OK)**
  - Corpo da Resposta:
    ```json
    {
      "cep": "62031-175",
      "public_place": "Rua Luís Santos Aquino",
      "complement": "",
      "neighborhood": "Cidade Dr. José Euclides Ferreira Gomes Júnior",
      "city": "Sobral",
      "state": "CE"
    }
    ```
- **Erro (400 Bad Request)**
    - Corpo da Resposta:
    ```json
    {
      "message": "Falha na requisição da api" 
    }
    ```
