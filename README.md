## Desenvolvido em aula de NodeJS ministrada por Diego Fernandes da Rocketseat

### Criar o .env com as seguintes variaveis ambientes 
```
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

### Docker
```
### Para criação da maquina API apenas com o comando: 
    * docker build -t mhcoyote/api_gostack:1.0 .    (Gera a imagem da maquina) 
    * docker run --rm -it  -p 3001:3001/tcp mhcoyote/api_gostack:1.0 
    
### Para Execução da API e DB juntos executar: 
    * docker-compose up 
    * docker-compose up --build (Para recriar as imagens com as alterações) 

 
## Versão 1.0: 
 
### Dispoível as seguintes rotas

#### Users
##### Campos
   | Campo                | Tipo    |
   |....................  |.........|
   | name                 | String  |
   | email                | String  |
   | avatar               | String  |
   | password             | String  |
   | passwordResetToken   | String  |
   | passwordResetExpires | Date    |
   | createdAt            | Date    |

- [x] routes.get('/user', UserController.index);
- [x] routes.get('/user/:id', UserController.show);
- [x] routes.post('/user', UserController.store);
- [x] routes.post('/user/login', UserController.login);
- [x] routes.post('/user/forgot_password', UserController.forgot);
- [x] routes.post('/user/reset_password', UserController.reset);
- [x] routes.patch('/user/avatar/:id/:email', UserController.avatar);
- [x] routes.put('/user/:id', UserController.update);
- [x] routes.delete('/user/:id', UserController.destroy);

#### Products
##### Campos
   title:String
   description:String
   url:String
   createdAt:Date

- [x] routes.get('/products', ProductController.index);
- [x] routes.get('/products/:id', ProductController.show);
- [x] routes.post('/products', ProductController.store);
- [x] routes.put('/products/:id', ProductController.update);
- [x] routes.delete('/products/:id', ProductController.destroy);

#### Repositories
##### Campos
   title:String
   url:String
   techs:Number
   createdAt:Date

- [x] routes.get('/repositories', RepositoryController.index);
- [x] routes.get('/repositories/:id', RepositoryController.show);
- [x] routes.post('/repositories', RepositoryController.store);
- [x] routes.post('/repositories/:id/like', RepositoryController.likeup);
- [x] routes.put('/repositories/:id', RepositoryController.update);
- [x] routes.delete('/repositories/:id', RepositoryController.destroy);

### Link acesso ao CHAT - Socket.IO
- [x] host:3002/chat/

### Link acesso a arquivos upload imagens
- [x] host:3001/files/


```
### RELEASES
1.3.1 - Adicionado suporte a SocketIO
