# NeuroDevergentes

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

# Sprint 1

<details>

<summary> Endpoints </summary>
</br>
<details>

<summary><b> Usuário </b></summary>
</br>
<details>

<summary><b> Cadastro do Usuário </b></summary>

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
      "message": "Usuário cadastrado com sucesso."
    }
    ```
- **Erro (400 Bad Request)**
  - Corpo da Resposta:
  ```json
  {
    "message": "E-mail informado já existe cadastrado."
  }
  ```
  </details>

<details>

<summary><b> Login do Usuário </b></summary>

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
  </details>

<details>

<summary><b> Verificar E-mail já existente </b></summary>

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
      "message": "E-mail disponível para cadastro."
    }
    ```

- **Erro (500 Internal Server Error)**
  - Corpo da Resposta:
  ```json
  {
    "message": "Ocorreu um erro interno."
  }
  ```
  </details>

</br>

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
<details>
<summary><b>Obter informações do usuário logado</b></summary>
</br>
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
  </details>

<details>
<summary><b> Edição do Usuário</b></summary>
</br>

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

</details>
</details>
<br/>
<details>
<summary><b> Cliente </b></summary>
</br>
<details>
<summary><b> Cadastrar clientes  </b></summary>
</br>
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

#### Exemplos de Respostas

- **Sucesso (201 Created)**
  - Corpo da Resposta:
    ```json
    {
      "id": 34,
      "user_id": 43,
      "name": "Luciana",
      "email": "luciana@gmail.com",
      "cpf": "45638586294   ",
      "phone": "88192657212",
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
  <br/>
  </details>

<details>
<summary><b> Preenchimento automático do endereço com CEP </b></summary>
<br>

Esse endpoint permite o preenchimento automático dos campos do endereço através do cep.

- **Método:** `GET`
- **Rota:** `/getCostumerCep/:cep`

#### Parâmetro da Requisição

- `cep` (string, obrigatório): Numero do cep do usuario.

- **Sucesso (200 OK)**
  - Corpo da Resposta:
    ```json
    {
      "cep": "62031175",
      "public_place": "Rua Luís Santos Aquino",
      "complement": "",
      "neighborhood": "Cidade Dr. José Euclides Ferreira Gomes Júnior",
      "city": "Sobral",
      "state": "CE"
    }
    ```
- **Erro (400 Bad Request)** - Corpo da Resposta:

```json
{
  "message": "Falha na requisição da api"
}
```

</details>
</details>
</details>
</br>

# Sprint 2

<details>
<summary> Endpoints</summary>
<br/>
<details>
<summary> Clientes </summary>
<br/>
<details>
<summary><b> Listar clientes já cadastrados </b></summary>
<br>
O endpoint permite listar os clientes ja cadastrdos no sistema **daquele usuario logado**. Ele retornará um array de objetos.

#### Requisição

- **Método:** `GET`
- **Rota:** `/costumers`

#### Header da Requisição

- `token` (string, obrigatório): Token gerado após login.

#### Exemplos de Respostas

- **Sucesso (200 OK)**
  - Corpo da Resposta:
    ```json
    [
      {
        "id": 14,
        "user_id": 34,
        "name": "Paulo Silva",
        "cpf": "45648545214   ",
        "email": "paulo@gmail.com",
        "phone": "88112154212",
        "status": "Inadimplente"
      },
      {
        "id": 7,
        "user_id": 34,
        "name": "Grauna",
        "cpf": "45645645678   ",
        "email": "grauna@gmail.com",
        "phone": "12345645645",
        "status": "Em dia"
      }
    ]
    ```
- **Erro (500 Internal Server Error)**
  - Corpo da Resposta:
  ```json
  {
    "message": "Ocorreu um erro interno."
  }
  ```
  </details>
  <details>
  <summary><b> Detalhar cliente </b></summary>
  </br>
  O endpoint permite visualizar todos os detalhes de um cliente cadastrado, a fim de consultar seus dados e suas respectivas cobranças.

#### Requisição

- **Método:** `GET`
- **Rota:** `/costumers/:id`

#### Header da Requisição

- `token` (string, obrigatório): Token gerado após login.

#### Exemplos de Respostas

- **Sucesso (200 OK)**

  - Corpo da Resposta:

    ```json
    {
      "personalData": {
        "id": 7,
        "name": "jojo todinho",
        "email": "jojo@gmail.com",
        "cpf": "123.456.456-87",
        "phone": "(55) 9 6554-7878",
        "status": "Em dia",
        "address": {
          "cep": null,
          "public_place": null,
          "complement": null,
          "neighborhood": null,
          "city": null,
          "state": null
        }
      },
      "charges": [
        {
          "id": 3,
          "customer_name": "jojo todinho",
          "description": "conta de água",
          "value": 198764,
          "status": 1,
          "charge_date": "10/02/2022"
        },
        {
          "id": 4,
          "customer_name": "jojo todinho",
          "description": "conta de luz",
          "value": 198764,
          "status": 3,
          "charge_date": "03/01/2021"
        }
      ]
    }
    ```

- **Erro (500 Internal Server Error)**
  - Corpo da Resposta:
  ```json
  {
    "message": "Ocorreu um erro interno."
  }
  ```
  </details>
  <details>
  <summary><b> Atualizar cliente </b></summary>
  </br>
  O endpoint permite atualizar os dados de um cliente cadastrado.

#### Requisição

- **Método:** `PUT`
- **Rota:** `/costumer/:id/edit`

#### Header da Requisição

- `token` (string, obrigatório): Token gerado após login.

#### Corpo da Requisição

- `name` (string, obrigatório): Novo Nome do cliente.
- `email` (string, obrigatório): Novo Endereço de e-mail do cliente.
- `cpf` (string, obrigatório): Novo CPF do cliente.
- `telephone` (string, obrigatório): Novo Número de telefone do cliente.
- `cep` (string, opcional): Novo CEP do cliente.
- `public_place` (string, opcional): Novo Logradouro do cliente.
- `complement` (string, opcional): Novo Complemento do endereço do cliente.
- `neighborhood` (string, opcional): Novo Bairro do cliente.
- `city` (string, opcional): Novo Cidade do cliente.
- `state` (string, opcional): Novo Estado do cliente.
- `status` (string, opcional): Novo Situação do cliente.

#### Exemplos de Respostas

- **Sucesso (200 Ok)**
  - Corpo da Resposta:
    ```json
    {
      "id": 8,
      "user_id": 4,
      "name": "Carlos eduardo",
      "email": "eduardo@gmail.com",
      "cpf": "23445645687",
      "phone": "58965547878",
      "status": "Em dia",
      "address": {
        "cep": "62031175",
        "public_place": null,
        "complement": null,
        "neighborhood": null,
        "city": null,
        "state": null
      }
    }
    ```
- **Erro (400 Bad Request)**
  - Corpo da Resposta:
  ```json
  {
    "message": "E-mail informado já existe cadastrado para outro cliente."
  }
  ```
  <br/>
  </details>
  </details>
  <details>
  <summary>Cobranças</summary>
  <br/>

<details>

<summary><b> Cadastrar Cobrança </b></summary>

O endpoint permite cadastrar cobranças para um cliente, afim de acessar suas informações no futuro.

#### Requisição

- **Método:** `POST`
- **Rota:** `/charges/:idCustomer`

#### Header da Requisição

- `token` (string, obrigatório): Token gerado após login.

#### Corpo da Requisição

- `costumer_name` (string, obrigatorio): Nome do Cliente.
- `description` (string, obrigatório): Descrição da cobrança.
- `value` (integer, obrigatório): Valor da cobrança.
- `status` (string, obrigatório): Status da cobrança.
- `charge_date` (date, obrigatório): Data de vencimento da cobrança.

#### Exemplos de Respostas

- **Sucesso (200 Ok)**
  - Corpo da Resposta:
    ```json
    {
      "id": 3,
      "costumer_id": 2,
      "costumer_name": "Mariana",
      "description": "conta de água",
      "value": 198764,
      "status": "Pendente",
      "charge_date": "2023-09-24T03:00:00.000Z"
    }
    ```
- **Erro (500 Internal Server Error)**
  - Corpo da Resposta:
  ```json
  {
    "message": "Ocorreu um erro interno."
  }
  ```
  </details>

<details>

<summary><b> Listar Todas as Cobranças </b></summary>

O endpoint permite visualizar uma listagem com todas as cobranças cadastradas para os clientes **do usuario logado**.

#### Requisição

- **Método:** `GET`
- **Rota:** `/charges`

#### Header da Requisição

- `token` (string, obrigatório): Token gerado após login.

#### Exemplos de Respostas

- **Sucesso (200 Ok)**
  - Corpo da Resposta:
    ```json
    [
      {
        "id": 12,
        "costumer_name": "Maria Joaquina",
        "description": "Uniforme escolar",
        "value": 35000,
        "charge_date": "2023-09-22T03:00:00.000Z",
        "status": "vencida"
      },
      {
        "id": 15,
        "costumer_name": "thiago",
        "description": "thiago@gmail.com",
        "value": 988545259,
        "charge_date": "2023-10-20T03:00:00.000Z",
        "status": "pendente"
      },
      {
        "id": 13,
        "costumer_name": "Maria Joaquina",
        "description": "Uniforme escolar de lider",
        "value": 35000,
        "charge_date": "2023-09-20T03:00:00.000Z",
        "status": "paga"
      }
    ]
    ```
- **Erro (500 Internal Server Error)**
  - Corpo da Resposta:
  ```json
  {
    "message": "Ocorreu um erro interno."
  }
  ```
  </details>
  </details>
  </details>


  # Sprint 3

<details>
<summary> Endpoints </summary>
</br>

<details>
<summary><b> Listar Todos os Dados do Usuario Logado </b></summary>
<br>

O endpoint permite visualizar uma listagem com todas os Clientes e Cobranças cadastrados **do usuario logado**.

#### Requisição

- **Método:** `GET`
- **Rota:** `/getAllDataUser`

#### Header da Requisição

- `token` (string, obrigatório): Token gerado após login.

#### Exemplos de Respostas

- **Sucesso (200 Ok)**
  - Corpo da Resposta:
    ```json
    {
      "Customers_Data": [
        {
          "id": 36,
          "name": "Hobber",
          "cpf": "15635586294   ",
          "email": "hobber@gmail.com",
          "phone": "88692656212",
          "status": "Inadimplente"
        },
        {
          "id": 50,
          "name": "Kildare",
          "cpf": "45678998778   ",
          "email": "kildare@gmail.com",
          "phone": "88892656882",
          "status": "Em dia"
        },
        {
          "id": 34,
          "name": "Luciana",
          "cpf": "45638586294   ",
          "email": "luciana@gmail.com",
          "phone": "88192657212",
          "status": "Em dia"
        }
      ],
      "Charges_Data": [
        {
          "id": 35,
          "costumer_id": 36,
          "costumer_name": "Hobber",
          "value": 6000,
          "charge_date": "2023-09-20T03:00:00.000Z",
          "status": "vencida",
          "description": "Skoll beats"
        },
        {
          "id": 23,
          "costumer_id": 34,
          "costumer_name": "Luciana",
          "value": 35000,
          "charge_date": "2023-09-24T03:00:00.000Z",
          "status": "pendente",
          "description": "fraudas de bebe"
        },
        {
          "id": 34,
          "costumer_id": 36,
          "costumer_name": "Hobber",
          "value": 6000,
          "charge_date": "2023-09-20T03:00:00.000Z",
          "status": "paga",
          "description": "Remedios"
        },
        {
          "id": 40,
          "costumer_id": 50,
          "costumer_name": "Kildare",
          "value": 6000,
          "charge_date": "2023-09-24T03:00:00.000Z",
          "status": "pendente",
          "description": "Peça do carro"
        }
      ]
    }
    ```
- **Erro (500 Internal Server Error)**
  - Corpo da Resposta:
  ```json
  {
    "message": "Ocorreu um erro interno."
  }
  ```
  </details>

<details>
<summary><b> Editar cobrança </b></summary>
<br>

O endpoint permite editar uma cobrança de um cliente **do usuario logado**.

#### Requisição

- **Método:** `PUT`
- **Rota:** `/charge/:chargeId/edit`

#### Header da Requisição

- `token` (string, obrigatório): Token gerado após login.

### Corpo da Requisição

- `description` (string, obrigatório): Descrição da cobrança.
- `value` (integer, obrigatório): Valor da cobrança.
- `status` (string, obrigatório): Status da cobrança.
- `charge_date` (date, obrigatório): Data de vencimento da cobrança.

#### Exemplos de Respostas

- **Sucesso (200 Ok)**
  - Corpo da Resposta:
    ```json
    {
      "id": 49,
      "costumer_id": 34,
      "costumer_name": "Luciana",
      "description": "celular novo",
      "status": "paga",
      "value": 400000,
      "charge_date": "2023-03-10T03:00:00.000Z"
    }
    ```
- **Erro (500 Internal Server Error)**

  - Corpo da Resposta:

  ```json
  {
    "message": "Ocorreu um erro interno."
  }
  ```

  </details>

<details>
<summary><b> Deletar cobrança </b></summary>
<br>

O endpoint permite deletar uma cobrança de um cliente **do usuario logado**.

#### Requisição

- **Método:** `DELETE`
- **Rota:** `/charge/:chargeId`

#### Header da Requisição

- `token` (string, obrigatório): Token gerado após login.

#### Exemplos de Respostas

- **Sucesso (204 NO CONTENT)**
  - Corpo da Resposta:
    ```json
    {}
    ```
- **Erro (500 Internal Server Error)**

  - Corpo da Resposta:

  ```json
  {
    "message": "Ocorreu um erro interno."
  }
  ```

  </details>

<details>
<summary><b> Detalhar cobrança </b></summary>
<br>

O endpoint permite detalhar uma cobrança de um cliente **do usuario logado**.

#### Requisição

- **Método:** `GET`
- **Rota:** `/charges/:idCharge`

#### Header da Requisição

- `token` (string, obrigatório): Token gerado após login.

#### Exemplos de Respostas

- **Sucesso (200 OK)**
  - Corpo da Resposta:
    ```json
    [
        {
          "charge_id": 32,
          "costumer_name": "Joao",
          "description": "cotrole de videogame",
          "status": "pendente",
          "value": 35000,
          "charge_date": "2023-09-26T03:00:00.000Z"
        }
    ] 
    ```
- **Erro (500 Internal Server Error)**

  - Corpo da Resposta:

  ```json
  {
    "message": "Ocorreu um erro interno."
  }
  ```
  </details>


<details>
<summary><b> Buscar Cobrança </b></summary>
<br>

O endpoint permite buscar cobranças a partir do **Nome do cliente ou ID da cobrança** de um cliente **do usuario logado**.

#### Requisição

- **Método:** `POST`
- **Rota:** `/searchCharge`

#### Header da Requisição

- `token` (string, obrigatório): Token gerado após login.

### Corpo da Requisição
- `searchCharge`: (Nome do cliente OU ID da cobrança, obrigatório): valor do input.

#### Exemplos de Respostas

- **Sucesso (200 OK)**
  - Corpo da Resposta:
    ```json
    [
        {
          "costumer_name": "Hobber",
          "charge_id": 34,
          "value": 6000,
          "charge_date": "2023-09-20T03:00:00.000Z",
          "status": "paga",
          "description": "Remedios"
        },
        {
          "costumer_name": "Hobber",
          "charge_id": 35,
          "value": 6000,
          "charge_date": "2023-09-20T03:00:00.000Z",
          "status": "vencida",
          "description": "Skoll beats"
        }
    ] 
    ```
- **Erro (500 Internal Server Error)**

  - Corpo da Resposta:

  ```json
  {
    "message": "Ocorreu um erro interno."
  }
  ```
  </details>


<details>
<summary><b> Buscar Cliente </b></summary>
<br>

O endpoint permite buscar um Cliente específico pelo **Nome do cliente ou ID do cliente ou CPF do cliente** de um cliente **do usuario logado**.

#### Requisição

- **Método:** `POST`
- **Rota:** `/searchCustomer`

#### Header da Requisição

- `token` (string, obrigatório): Token gerado após login.

### Corpo da Requisição
- `searchCustumer`: (Nome do cliente OU CPF do cliente OU E-mail do Cliente, obrigatório): valor do input.

#### Exemplos de Respostas

- **Sucesso (200 OK)**
  - Corpo da Resposta:
    ```json
    [
    	{
    		"id": 34,
    		"name": "Luciana",
    		"cpf": "45638586294   ",
    		"email": "luciana@gmail.com",
    		"phone": "88192657212",
    		"status": "Inadimplente"
    	},
    	{
    		"id": 53,
    		"name": "Ana Julia",
    		"cpf": "45612365845   ",
    		"email": "anajulia@gmail.com",
    		"phone": "88597989845",
    		"status": "Em dia"
    	},
    	{
    		"id": 54,
    		"name": "Ana Beatriz",
    		"cpf": "48612365845   ",
    		"email": "anabeatriz@gmail.com",
    		"phone": "88587989845",
    		"status": "Em dia"
    	}
    ]
    ```
- **Erro (500 Internal Server Error)**

  - Corpo da Resposta:

  ```json
  {
    "message": "Ocorreu um erro interno."
  }
  ```
  </details>
</details>
