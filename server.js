const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
  secret: 'sua-chave-secreta',
  resave: false,
  saveUninitialized: true
}));

// Importar o módulo do banco de dados
const db = require('./db');

// Rotas
const mainController = require('./controllers/mainController');
const loginController = require('./controllers/loginController');
const registerController = require('./controllers/registerController');
const logoutController = require('./controllers/logoutController');
const reservaController = require('./controllers/reservaController');
const reservaViewController = require('./controllers/reservaViewController');

app.use('/', mainController);
app.use('/login', loginController);
app.use('/register', registerController);
app.use('/logout', logoutController);
app.use('/reservation', reservaController);
app.use('/reservaview', reservaViewController);

// Servir arquivos estáticos
app.use(express.static(__dirname));

// Iniciar o servidor
app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});