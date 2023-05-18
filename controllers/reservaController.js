const express = require('express');
const router = express.Router();
const db = require('../db');

// Rota para renderizar o formulário de reserva
router.get('/', renderReservationForm);

// Rota para lidar com o envio do formulário de reserva
router.post('/', handleReservationForm);

function isReservationDurationValid(duration) {
  return duration >= 15 && duration <= 90; // Duração mínima de 15 minutos e máxima de 90 minutos
}

// Função para verificar se o horário da reserva está dentro do intervalo permitido
function isReservationTimeValid(date, time, duration, table, callback) {
  const start = new Date(date);
  start.setHours(18, 0, 0); // Horário de início permitido (18:00)
  const end = new Date(date);
  end.setHours(23, 59, 59); // Horário de término permitido (23:59:59)

  // Verificar se o horário da reserva está dentro do intervalo permitido
  db.query('SELECT * FROM reservations WHERE date = ? AND table_number = ? AND ((time >= ? AND time < ?) OR (time < ? AND time + INTERVAL ? MINUTE > ?))', [date, table, time, time + duration, time, duration, time], (err, results) => {    if (err) {
      console.error(err);
      callback(false);
      return;
    }

    // Verificar se há reservas conflitantes
    if (results.length > 0) {
      callback(false);
    } else {
      callback(true);
    }
  });
}

// Função para verificar se o dia da semana é domingo
function isSunday(date) {
  return date.getDay() === 0;
}

function renderReservationForm(req, res) {
  const viewData = {
    title: 'Sistema de Reserva - Reservar Mesa',
    loggedIn: req.session.loggedIn || false,
    isAdmin: req.session.isAdmin || false,
    isUser: req.session.isUser || false,
    userId: req.session.userId,
    content: `
      <h1 class="mt-5">Reservar Mesa</h1>
      <form id="reservationForm">
        <div class="form-group">
          <label for="table">Número da Mesa</label>
          <select class="form-control" id="table" required>
            ${generateTableOptions()}
          </select>
        </div>
        <div class="form-group">
          <label for="date">Data</label>
          <input type="date" class="form-control" id="date" required min="${new Date().toISOString().split('T')[0]}">
        </div>
        <div class="form-group">
          <label for="time">Horário</label>
          <input type="time" class="form-control" id="time" required>
        </div>
        <div class="form-group">
          <label for="duration">Duração (minutos)</label>
          <input type="number" class="form-control" id="duration" min="15" max="90" required>
        </div>
        <button type="submit" class="btn btn-primary">Reservar</button>
      </form>
    `
  };
  if (req.session.loggedIn) {
    viewData.userID = req.session.userID;
  }
  res.render('reservation', viewData);
}

function generateTableOptions() {
  let options = '';
  for (let i = 15; i >= 1; i--) {
    options += `<option value="${i}">${i}</option>`;
  }
  return options;
}

function handleReservationForm(req, res) {
  const { table, date, time, duration, userId } = req.body;

  if (!isReservationDurationValid(duration)) {
    res.status(400).send({ error: 'Duração de reserva inválida. A duração mínima é de 15 minutos e a máxima é de 90 minutos.' });
    return;
  }

  if (isSunday(new Date(date))) {
    res.status(400).send({ error: 'Não é permitido fazer reservas aos domingos.' });
    return;
  }

  const callback = (isValid) => {
    if (isValid) {
      const reservation = {
        table_number: table,
        date,
        time,
        duration,
        user_id: userId,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      db.query('INSERT INTO reservations SET ?', reservation, (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send({ error: 'Erro ao salvar a reserva.' });
        } else {
          res.sendStatus(200);
        }
      });
    } else {
      res.status(400).send({ error: 'O horário selecionado não está disponível para reserva.' });
    }
  };

  isReservationTimeValid(date, time, duration, table, callback);
}

module.exports = router;