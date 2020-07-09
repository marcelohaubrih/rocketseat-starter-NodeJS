# API_NODEJS + Docker
> Inicialmente desenvolvido em aula de NodeJS ministrada por Diego Fernandes da Rocketseat.
> 
> **OBS:**  Constantemente atualizado com rotas e modulos para treinamento.


<p align="center">
   <img alt="NodeJS" title="#NodeJS" src="https://user-images.githubusercontent.com/63422556/86950021-f1a08100-c125-11ea-923b-6e9b47c91bac.png" width="160px" />
   <img alt="Docker" title="#Docker" src="https://user-images.githubusercontent.com/63422556/86950047-fc5b1600-c125-11ea-996b-c3e5ea30d0b8.png" width="210px" />
</p>
<p align="center">
    <img alt="Repository size" src="https://img.shields.io/github/repo-size/marcelohaubrih/rocketseat-starter-NodeJS?style=plastic" />
    <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/marcelohaubrih/rocketseat-starter-NodeJS?color=brightgreen&style=plastic" />    
  <a href="https://www.linkedin.com/in/marcelo-haubrih-29ab9a1ab/">
    <img alt="By Marcelo Haubrih" src="https://img.shields.io/badge/%20by-mhcoyote-important?style=plastic">
  </a>
  <a href="https://github.com/marcelohaubrih/rocketseat-starter-NodeJS/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/marcelohaubrih/rocketseat-starter-NodeJS?style=plastic">
  </a>
  <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen?style=plastic">
</p>



### Criar o .env com as seguintes variaveis ambientes 
```sh
DB_URL=(Padrão localhost) 
DB_PORT=(Padrão 27017) 
API_PORT=(Padrão 3001) 
SOCKET_PORT=(Padrão 3002) 
SMTP_HOST=(url)
SMTP_PORT=465 or 587 
SMTP_USER=(user ou email) 
SMTP_PASS=(password) 
SMTP_EMAIL_FROM=(from@email.com) 
SMTP_NOME_ENV=API-GOSTACK 
SMTP_EMAIL_REC= 
```

### **Docker**
```sh
- Para criação da maquina API apenas com o comando: 
    * docker build -t <USUARIO_DOCKER>/<NOME_APP>:1.0 .    (Gera a imagem da maquina) 
    * docker run --rm -it  -p 3001:3001/tcp <NOME_APP>/api_gostack:1.0 
    
- Para Execução da API e DB juntos executar: 
    * docker-compose up 
    * docker-compose up --build (Para recriar as imagens com as alterações) 
```
---
# Versão 1.4.4 

## Users
Campo | Tipo 
------|-----
name | String
email | String
avatar|String
password|String
passwordResetToken | String
passwordResetExpires | Date
createdAt | Date
* **Rotas**
- [x] routes.get('/user', UserController.index);
- [x] routes.get('/user/:id', UserController.show);
- [x] routes.post('/user', UserController.store);
- [x] routes.post('/user/login', UserController.login);
- [x] routes.post('/user/forgot_password', UserController.forgot);
- [x] routes.post('/user/reset_password', UserController.reset);
- [x] routes.patch('/user/avatar/:id/:email', UserController.avatar);
- [x] routes.put('/user/:id', UserController.update);
- [x] routes.delete('/user/:id', UserController.destroy);
---

## Products
 Campo | Tipo
-------|-----
title|String
description|String
url|String
createdAt|Date
* **Rotas**
- [x] routes.get('/products', ProductController.index);
- [x] routes.get('/products/:id', ProductController.show);
- [x] routes.post('/products', ProductController.store);
- [x] routes.put('/products/:id', ProductController.update);
- [x] routes.delete('/products/:id', ProductController.destroy);
---

## Repositories
 Campo | Tipo
-------|-----
title|String
url|String
techs|Number
createdAt|Date
* **Rotas**
- [x] routes.get('/repositories', RepositoryController.index);
- [x] routes.get('/repositories/:id', RepositoryController.show);
- [x] routes.post('/repositories', RepositoryController.store);
- [x] routes.post('/repositories/:id/like', RepositoryController.likeup);
- [x] routes.put('/repositories/:id', RepositoryController.update);
- [x] routes.delete('/repositories/:id', RepositoryController.destroy);

#### Link acesso ao CHAT - Socket.IO
```sh
host:3002/chat/
```
#### Link acesso a arquivos upload imagens
```sh
host:3001/files/
```
---
## RELEASES

* 1.3.1 
  * Adicionado suporte a SocketIO
* 1.4.1 
  * Adicionado suporte a avatar Upload
* 1.4.2 
  * Fix Rota de avatar
* 1.4.3 
  * Adicionado rota fixa /files
* 1.4.4 
  * Fix rota fixa do Chat Socket.IO

## Licença

Este projeto foi desenvovido sob a licença MIT. Veja o [LICENSE](./LICENSE) para detalhes.


By [Marcelo Haubrih](https://www.linkedin.com/in/marcelo-haubrih-29ab9a1ab/)
