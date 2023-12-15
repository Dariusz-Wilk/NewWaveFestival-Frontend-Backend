const express = require('express');
const randomId = require('@dark_wilk/id-generator');

const router = express.Router();
const db = require('../db');

router.route('/concerts').get((req, res) => {
	res.json(db.concerts);
});

router.route('/concerts/:id').get((req, res) => {
	const paramId = parseInt(req.params.id);
	const concert = db.concerts.find(item => item.id === paramId);
	res.json(concert);
});

router.route(`/concerts`).post((req, res) => {
	const { performer, genre, price, day } = req.body;
	const newConcert = {
		id: randomId(5),
		performer,
		genre,
		price,
		day,
	};
	db.concerts.push(newConcert);
	res.status(200).json({ message: 'OK' });
});

router.route('/concerts/:id').put((req, res) => {
	const concertsId = req.params.id.toString();
	const { performer, genre, price, day } = req.body;
	const index = db.concerts.findIndex(
		item => item.id.toString() === concertsId
	);

	if (index !== -1) {
		db.concerts[index] = {
			...db.concerts[index],
			performer,
			genre,
			price,
			day,
		};
		res.status(200).json({ message: 'OK' });
	} else {
		return res.status(404).json({ errorMessage: 'Concert not found' });
	}
});

router.route('/concerts/:id').delete((req, res) => {
	const concertId = req.params.id.toString();
	const index = db.concerts.findIndex(item => item.id.toString() === concertId);

	if (index === -1) {
		return res
			.status(404)
			.json({ errorMessage: 'Concert you want to delete not found' });
	}

	db.concerts.splice(index, 1);
	res.status(200).json({ message: 'Concert successfully deleted ' });
});

module.exports = router;
