# Sistema de Reserva

## Descrição
Este projeto é um sistema de reserva de mesas que utiliza as seguintes dependências:

- `mysql2`: para a conexão com o banco de dados MySQL.
- `express`: para o desenvolvimento da aplicação web.
- `express-session`: para a criação de sessões de usuário.
- `body-parser`: para o processamento de requisições HTTP.
- `ejs`: para a renderização de templates HTML.
- `sequelize-cli`: para a execução de comandos do Sequelize na linha de comando.
- `sequelize`: como um ORM para a interação com o banco de dados.
- `nodemon` (em ambiente de desenvolvimento): para reiniciar automaticamente o servidor quando houver alterações no código.
- `faker`: para a geração de dados falsos para testes.
- `dotenv`: para carregar variáveis de ambiente a partir de um arquivo `.env`.

## Pré-requisitos
Certifique-se de ter o Node.js e o MySQL instalados em seu sistema antes de executar este programa.

## Instalação
1. Clone este repositório para o seu diretório local.
2. No diretório do projeto, execute o seguinte comando para instalar as dependências:
   npm install
3. Renomeie o arquivo `.env.example` para `.env` e configure as variáveis de ambiente com as suas credenciais do MySQL.
4. Execute o seguinte comando para criar o banco de dados e as tabelas:
   npx sequelize-cli db:migrate
5. Execute os seguintes comandos para criar registros de amostra nas tabelas:
   npx sequelize-cli db:seed:all
   npx sequelize-cli db:seed --seed factory-create-users.js

## Execução do Programa
1. Para iniciar o servidor, execute o seguinte comando:
   npm start
2. Abra um navegador da web e acesse `http://localhost:3000` para usar o sistema.

## Dependências
- mysql2
- express
- express-session
- body-parser
- ejs
- sequelize
- nodemon (somente para desenvolvimento)
- faker
- dotenv

## Layout
O arquivo `layout.ejs` contém o layout básico das páginas do sistema.
O arquivo `index.ejs` é a página inicial do sistema.
O arquivo `login.ejs` contém o layout da página de login.
O arquivo `register.ejs` é a página de registro de usuário.
O arquivo `reservation.ejs` é a página de reserva de mesas.
O arquivo `reservaview.ejs` é a página do administrador onde é possível visualizar as reservas.

## Controladores
Os controladores são responsáveis por lidar com as requisições e respostas HTTP. Os seguintes controladores estão presentes no projeto:
- `loginController.js`: lida com as requisições relacionadas ao login de usuários.
- `logoutController.js`: lida com as requisições relacionadas ao logout de usuários.
- `mainController.js`: lida com as requisições relacionadas à página inicial.
- `registerController.js`: lida com as requisições relacionadas ao cadastro de usuários.
- `reservaController.js`: lida com as requisições relacionadas à reserva de mesas.
- `reservaViewController.js`: lida com as requisições relacionadas à página do administrador onde é possível visualizar as reservas.