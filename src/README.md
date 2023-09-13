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
// https://neurodevergentesapi.herokuapp.com/
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

### Cadastro do Usuário

O endpoint permite o cadastro de um novo usuário no sistema.

#### Requisição

- **Método:** `POST`
- **Rota:** `/user/signup`
-  **Requisitos obrigatórios**
     - Criar nova conta onde email seja único
     - Senha deve ser salva utilizando criptografia confiavél
     - Gerar token em caso de sucesso

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
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjIzMjQ5NjIxLCJleHAiOjE2MjMyNzg0MjF9.KLR9t7m_JQJfpuRv9_8H2-XJ92TSjKhGPxJXVfX6wBI"
    }
    ```
- **Erro (400 Bad Request)**
  - Corpo da Resposta:
    ```json
    {
      "message": "E-mail informado já existe cadastrado."
    }
    ```

### Login do Usuário

O endpoint permite a autenticação de um usuário no sistema.

#### Requisição

- **Método:** `POST`
- **Rota:** `/user/login`
- **Requisitos obrigatórios**
  - Preencher todos os campos
  - Informar e-mail existente
  - Senha correta para o e-mail
  - Criar token após validação dos dados

#### Corpo da Requisição

- `email` (string, obrigatório): Endereço de e-mail do usuário.
- `password` (string, obrigatório): Senha do usuário.

#### Exemplos de Respostas

- **Sucesso (200 OK)**
  - Corpo da Resposta:
    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjIzMjQ5NjIxLCJleHAiOjE2MjMyNzg0MjF9.KLR9t7m_JQJfpuRv9_8H2-XJ92TSjKhGPxJXVfX6wBI"
    }
    ```
- **Erro (401 Unauthorized)**
  - Corpo da Resposta:
    ```json
    {
      "message": "E-mail ou senha inválidos."
    }
    ```
### Obter informações do usuário
Essa rota será usada quando o usuario desejar obter informacoes do seu perfil
#### Requisição

- **Método:** `GET`
- **Rota:** `/user`
- **Atenção!: O usuário deverá ser identificado através do ID presente no token de autenticação.**

#### Header da Requisição
- `token` (string, obrigatório): Token gerado após login.
#### Exemplos de Respostas
- **Sucesso (200 OK)**
- Corpo da Resposta:
  ```json
  {
    "id": 1,
    "name": "José",
    "email": "jose@email.com",
    "cpf": "000.000.000-00",
    "telephone": "71 99999-9999"
  }
  ```
- **Erro (400 Bad Request)**
  - Corpo da Resposta:
    ```json
    {
      "message": "Token inválido."
    }
    ```

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

## Cliente

### Cadastro de Cliente

O endpoint permite o cadastro de um novo cliente no sistema.

#### Requisição

- **Método:** `POST`
- **Rota:** `/client/signup`
- Requisitos
- Validar campos obrigatórios
- Verificar se já existe email para outro cliente

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

#### Exemplos de Respostas

- **Sucesso (201 Created)**
  - Corpo da Resposta:
    ```json
    {
      "message": "Cliente cadastrado com sucesso."
    }
    ```
- **Erro (400 Bad Request)**
  - Corpo da Resposta:
    ```json
    {
      "message": "E-mail informado já existe cadastrado para outro cliente."
    }
    ```
