# flask-react
Comunicação de backend flask com frontend react.

- ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ \o/
# API com react e flask

## APLICAÇAO FUNCIONANDO 100%

## aplicacao com frontend react e backend flask e banco sqlite usando o ORM peewee para criacao de tabelas

## OBS: nao foi resolvido o problema de salvar no banco mysql(estava funcionando)

## comunicacao do react com o flask por api que conecta a rota com  a biblioteca axios do React

### porque usar O flask-cors

- criar a pasta=> flask-server
- rodar o comando => npx create-react-app client
- pip install flask
- pip install peewee
- pip install flask-cors

- colocar esta linha de codigo no arquivo package.json=> "proxy":"http://localhost:5000",

- dentro de react-clien , instalar o axios=> npm install axios

- rodar server flask
- rodar o server react

- Quando você desenvolve uma aplicação web que faz solicitações Ajax (por exemplo, usando o fetch ou XMLHttpRequest no JavaScript) de um domínio para outro, é possível que você se depare com restrições de CORS. Essas restrições podem impedir que o navegador execute a solicitação, a menos que o servidor permita explicitamente solicitações provenientes do domínio da sua aplicação.

- O flask-cors simplifica o processo de habilitação do CORS em um aplicativo Flask, fornecendo uma maneira fácil de configurar quais origens (domínios) são permitidas, quais métodos HTTP são permitidos, como lidar com cabeçalhos personalizados e outras configurações relacionadas ao CORS.