## Desenvolvido em aula de NodeJS ministrada por Diego Fernandes da Rocketseat

Criar o .env com as seguintes variaveis ambientes
DB_URL = (Padrão localhost)
DB_PORT = (Padrão 27017)
API_PORT = (Padrão 3001)


Para criação da maquina API apenas com o comando: 
    - docker build -t nodejs-produtos .  (Gera a imagem da maquina)
    - docker run --rm -it  -p 3001:3001/tcp nodejs-produtos:latest

Para criação da API e DB juntos executar: 
    - docker-compose up
    - docker-compose up --build (Para recriar as imagens com as alterações)