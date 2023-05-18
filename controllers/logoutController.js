const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    await new Promise((resolve, reject) => {
      // Destroy the session
      req.session.destroy((error) => {
        if (error) {
          console.error('Erro ao fazer logout:', error);
          reject(error);
        } else {
          resolve();
        }
      });
    });

    // Redirect to the home page or another appropriate page
    res.redirect('/');
  } catch (error) {
    console.error('Erro interno do servidor:', error);
    res.status(500).send('Erro interno do servidor');
  }
});

module.exports = router;