const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { promisify } = require('util');

const db = require('../db');
const queryAsync = promisify(db.query).bind(db);
router.use(bodyParser.json());

router.get('/', (req, res) => {
  const viewData = {
    title: 'Sistema de Reserva - Login',
    loggedIn: req.session.loggedIn || false, // Fix: Initialize loggedIn as false
    content: `
      <form id="loginForm" action="/login" method="post">
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" class="form-control" id="username" name="username" required>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" class="form-control" id="password" name="password" required>
        </div>
        <button type="submit" class="btn btn-primary">Login</button>
      </form>
    `
  };

  res.render('index', viewData);
});

router.post('/', async (req, res) => {
  const { username, password } = req.body;

  try {
    const results = await queryAsync('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);

    if (results.length === 0) {
      res.status(401).send('Usuário ou senha incorretos. Tente novamente.');
    } else {
      const user = results[0];
      const isAdmin = user.isAdmin === 1;
      const isUser = user.isUser === 1;
      const userID = user.id;
      const userUsername = user.username;

      req.session.loggedIn = true;
      req.session.isAdmin = isAdmin;
      req.session.isUser = isUser;
      req.session.userID = userID;
      req.session.userUsername = userUsername;

      res.json({ message: 'Login realizado com sucesso!' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro interno do servidor');
  }
});

module.exports = router;