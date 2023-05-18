const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const viewData = {
    title: 'Sistema de Reserva - Home',
    loggedIn: req.session.loggedIn || false,
    isAdmin: req.session.isAdmin || false,
    isUser: req.session.isUser || false,
    content: `
      <h1 class="mt-5">Bem-vindo ao Sistema de Reserva</h1>
    `
  };
  if (req.session.loggedIn) {
    viewData.userID = req.session.userID;
  }
  res.render('index', viewData);
});

module.exports = router;