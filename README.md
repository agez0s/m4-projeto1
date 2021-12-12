# M4-Projeto 1
Backend do primeiro projeto do módulo 4 - FullStack da Blue Edtech! Os alunos deveriam criar uma API onde fosse possível criar, editar, visualizar e apagar usuários e filmes. Também deveria ser possível um usuário fornecer um username/password para receber um token, e a partir deste token ser possível realizar outras operações, como "Assistir filme".

## Endpoints

### Usuários (/users)

```
  POST /register
```
Registra um novo usuário

| Parâmetro  | Tipo     | Descrição |
| :--------- | :---     | :-------- |
| `name`     | `string` | **Obrigatório** Nome do usuário |
| `userName` | `string` | **Obrigatório** username para logar. Precisa ser único |
| `password` | `string` | **Obrigatório** Senha desejada. Mínimo 8 caracteres |
| `passwordConfirm` | `string` | **Obrigatório** Confirmação de senha. Deve ser igual a `password` |


```
  PATCH /update/(id)
```

Modifica as informações de um usuário existente.

| Parâmetro  | Tipo     | Descrição |
| :--------- | :---     | :-------- |
| `name`     | `string` | **Obrigatório** Nome do usuário a ser modificado |
| `userName` | `string` | **Obrigatório** username. Precisa ser único |
| `password` | `string` | **Obrigatório** Senha desejada. Mínimo 8 caracteres |
| `passwordConfirm` | `string` | **Obrigatório** Confirmação de senha. Deve ser igual a `password` |


```
  GET /find/(id)
```
 Exibe as informações do usuário com o ID fornecido.

```
  GET /getall
```
Retorna a lista de todos os usuários

```
  DELETE /delete/(id)
```
 Apaga o usuário com o ID fornecido.

### Filmes (/filmes)

```
  POST /add
```
Adiciona um novo filme à biblioteca. Não há chave única, mas se já existir outro filme com `name` e `year` iguais, retorna erro.

| Parâmetro | Tipo     | Descrição |
| :-------- | :---     | :-------- |
| `name`    | `string` | **Obrigatório** Nome do filme |
| `year`    | `string` | **Obrigatório** Ano do filme |


```
  PATCH /edit/(id)
```
Modifica o filme com o ID fornecido

| Parâmetro | Tipo     | Descrição |
| :-------- | :---     | :-------- |
| `name`    | `string` | **Obrigatório** Nome do filme |
| `year`    | `string` | **Obrigatório** Ano do filme |

```
GET /find/(id)
```
Retorna as informações do filme com o ID fornecido.

```
GET /getall
```
Retorna as informações de todos os filmes cadastrados

```
DELETE /delete/(id)
```
Apaga as informações do filme com o ID fornecido

```
POST /watch/(id)
```
**Necessário estar logado** - Adiciona/remove o filme com o ID fornecido da lista de assistidos.

### Auth (/auth)

```
  POST /login
```
Retorna um token de autorização, que pode ser utilizado nas outras rotas que precisam do mesmo.

| Parâmetro | Tipo     | Descrição |
| :-------- | :---     | :-------- |
| `userName`    | `string` | **Obrigatório** Nome de usuário |
| `password`    | `string` | **Obrigatório** Senha |

```
GET /profile
```
Retorna informações gerais sobre o usuário logado

## Instalação

```bash
$ npm install
```

## Iniciando a aplicação

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```



## License

Nest is [MIT licensed](LICENSE).
