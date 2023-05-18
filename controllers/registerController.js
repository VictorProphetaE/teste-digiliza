const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  const viewData = {
    title: 'Sistema de Reserva - Cadastro',
    loggedIn: req.session.loggedIn,
    content: `
      <h1 class="mt-5">Cadastro de Usuário</h1>
      <form id="registerForm" action="/register" method="post">
        <div class="form-group">
          <label for="username">Nome de Usuário</label>
          <input type="text" class="form-control" id="username" name="username" required>
        </div>
        <div class="form-group">
          <label for="email">E-mail</label>
          <input type="email" class="form-control" id="email" name="email" required>
        </div>
        <div class="form-group">
          <label for="password">Senha</label>
          <input type="password" class="form-control" id="password" name="password" required>
        </div>
        <button type="submit" class="btn btn-primary">Cadastrar</button>
      </form>
    `
  };

  res.render('register', viewData);
});

router.post('/', async (req, res) => {
  const { username, email, password } = req.body;

  // Realizar validações dos campos do formulário (ex: verificar se estão preenchidos)

  try {
    // Inserir os dados no banco de dados
    const query = 'INSERT INTO users (username, email, password, isUser, isAdmin) VALUES (?, ?, ?, true, false)';
    await db.query(query, [username, email, password]);
    console.log('Usuário cadastrado com sucesso.');
    res.redirect('/login'); // Redireciona para a página de login após o cadastro
  } catch (error) {
    console.error('Erro ao cadastrar usuário: ' + error.stack);
    res.status(500).send('Erro ao cadastrar usuário. Tente novamente mais tarde.');
  }
});

module.exports = router;