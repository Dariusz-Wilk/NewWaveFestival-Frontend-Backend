const express = require('express');

const router = express.Router();

const ConcertController = require('../controllers/concerts.controller');

router.get('/concerts', ConcertController.getAllConcerts);

router.get('/concerts/:id', ConcertController.getConcrtById);

router.post(`/concerts`, ConcertController.addNewConcert);

router.put('/concerts/:id', ConcertController.editConcertById);

router.delete('/concerts/:id', ConcertController.deleteConcertById);

module.exports = router;
