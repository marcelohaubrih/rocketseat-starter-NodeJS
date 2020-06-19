## Desenvolvido em aula de NodeJS ministrada por Diego Fernandes da Rocketseat

Criar o .env com as seguintes variaveis ambientes
DB_URL = (Padrão localhost)
DB_PORT = (Padrão 27017)
API_PORT = (Padrão 3001)


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
    password:String
    createdAt:Date
routes.get('/user', UserController.index);
routes.get('/user/:id', UserController.show);
routes.post('/user', UserController.store);
routes.post('/user/login', UserController.login);
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