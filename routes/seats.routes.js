const express = require('express');

const SeatController = require('../controllers/seats.controller');

const router = express.Router();

router.get('/seats', SeatController.getAllSeats);

router.get('/seats/:id', SeatController.getSeatsById);

router.post(`/seats`, SeatController.addNewSeats);

router.put('/seats/:id', SeatController.editPostById);

router.delete('/seats/:id', SeatController.deletePostById);

module.exports = router;
