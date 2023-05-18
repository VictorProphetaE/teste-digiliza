// reservaViewController.js

const express = require('express');
const router = express.Router();

// Importar o módulo do banco de dados
const db = require('../db');

// Rota GET para /reservaview
router.get('/', (req, res) => {
    // Verificar se o usuário está autenticado e é um administrador
    if (req.session.loggedIn && req.session.isAdmin) {
      // Buscar as reservas no banco de dados apenas para o administrador com os detalhes dos usuários
      db.query('SELECT reservations.*, users.username AS user_username FROM reservations JOIN users ON reservations.user_id = users.id WHERE users.isAdmin = 0', (err, results) => {
        if (err) {
          console.log(err);
          res.sendStatus(500);
          return;
        }
  
        const reservations = results.map((row) => ({
          ...row,
          user: {
            username: row.user_username,
          },
        }));
  
        // Renderizar a página reservaview.ejs e passar os dados das reservas
        res.render('reservaview', {
          reservations,
          loggedIn: req.session.loggedIn || false,
          isAdmin: req.session.isAdmin || false,
          isUser: req.session.isUser || false,
          userId: req.session.userId,
        });
      });
    } else {
      // Redirecionar para a página de login ou exibir uma mensagem de erro, caso necessário
      res.redirect('/login');
    }
  });
  
  module.exports = router;