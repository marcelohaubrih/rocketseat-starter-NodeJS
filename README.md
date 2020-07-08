## Desenvolvido em aula de NodeJS ministrada por Diego Fernandes da Rocketseat

Criar o .env com as seguintes variaveis ambientes
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

Para criação da maquina API apenas com o comando: 
    - docker build -t mhcoyote/api_gostack:1.0 .    (Gera a imagem da maquina)
    - docker run --rm -it  -p 3001:3001/tcp mhcoyote/api_gostack:1.0
    - 

Para Execução da API e DB juntos executar: 
    - docker-compose up
    - docker-compose up --build (Para recriar as imagens com as alterações)

Versão 1.0:

## Dispoível as seguintes rotas
//Users
- Campos
    name:String
    email:String
    avatar:String
    password:String
    passwordResetToken:String
    passwordResetExpires:Date
    createdAt:Date
routes.get('/user', UserController.index);
routes.get('/user/:id', UserController.show);
routes.post('/user', UserController.store);
routes.post('/user/login', UserController.login);
routes.post('/user/forgot_password', UserController.forgot);
routes.post('/user/reset_password', UserController.reset);
routes.patch('/user/avatar/:id/:email', UserController.avatar);
routes.put('/user/:id', UserController.update);
routes.delete('/user/:id', UserController.destroy);

//Products
- Campos
    title:String
    description:String
    url:String
    createdAt:Date
routes.get('/products', ProductController.index);
routes.get('/products/:id', ProductController.show);
routes.post('/products', ProductController.store);
routes.put('/products/:id', ProductController.update);
routes.delete('/products/:id', ProductController.destroy);

//Repositories
- Campos
    title:String
    url:String
    techs:Number
    createdAt:Date
routes.get('/repositories', RepositoryController.index);
routes.get('/repositories/:id', RepositoryController.show);
routes.post('/repositories', RepositoryController.store);
routes.post('/repositories/:id/like', RepositoryController.likeup);
routes.put('/repositories/:id', RepositoryController.update);
routes.delete('/repositories/:id', RepositoryController.destroy);

//Link acesso ao CHAT - Socket.IO
host:3002/chat

### RELEASES
1.3.1 - Adicionado suporte a SocketIO