const express = require('express');
const randomId = require('@dark_wilk/id-generator');

const router = express.Router();
const db = require('../db');

router.route('/seats').get((req, res) => {
	res.json(db.seats);
});

router.route('/seats/:id').get((req, res) => {
	const paramId = parseInt(req.params.id);
	const seat = db.seats.find(item => item.id === paramId);
	res.json(seat);
});

router.route(`/seats`).post((req, res) => {
	const { day, seat, client, email } = req.body;
	const newSeat = {
		id: randomId(5),
		day,
		seat,
		client,
		email,
	};
	db.seats.push(newSeat);
	res.status(200).json({ message: 'OK' });
});

router.route('/seats/:id').put((req, res) => {
	const seatsId = req.params.id.toString();
	const { day, seat, client, email } = req.body;
	const index = db.seats.findIndex(item => item.id.toString() === seatsId);

	if (index !== -1) {
		db.concerts[index] = {
			...db.seats[index],
			day,
			seat,
			client,
			email,
		};
		res.status(200).json({ message: 'OK' });
	} else {
		return res.status(404).json({ errorMessage: 'Seat not found' });
	}
});

router.route('/seats/:id').delete((req, res) => {
	const seatId = req.params.id.toString();
	const index = db.seats.findIndex(item => item.id.toString() === seatId);

	if (index === -1) {
		return res
			.status(404)
			.json({ errorMessage: 'Seat you want to delete not found' });
	}

	db.seats.splice(index, 1);
	res.status(200).json({ message: 'Seat successfully deleted ' });
});

module.exports = router;
