const sanitize = require('mongo-sanitize');
const Seat = require('../models/seat.model');
const mongoSanitize = require('mongo-sanitize');

exports.getAllSeats = async (req, res) => {
	try {
		res.json(await Seat.find());
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

exports.getSeatsById = async (req, res) => {
	try {
		const seat = await Seat.findById(req.param.id);
		if (!seat) res.status(404).json({ message: 'Seat Not Found' });
		else res.json(seat);
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

exports.addNewSeats = async (req, res) => {
	try {
		const { day, seat, client, email } = req.body;
		const cleanedClient = mongoSanitize(client);
		const cleanedEmail = mongoSanitize(email);

		const isSeatTaken = await Seat.findOne({ seat, day });

		if (isSeatTaken) {
			return res.status(409).json({ error: 'Seat is already taken' });
		} else {
			const newSeat = new Seat({
				day,
				seat,
				client: cleanedClient,
				email: cleanedEmail,
			});
			await newSeat.save();
			const seats = await Seat.find();
			req.io.emit('seatsUpdated', seats);
			res.status(200).json({
				message: 'OK',
			});
		}
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

exports.editPostById = async (req, res) => {
	try {
		const { day, seat, client, email } = req.body;
		const seatFound = await Seat.findById(req.params.id);

		if (seatFound) {
			await Seat.updateOne(
				{ _id: req.params.id },
				{ $set: { day, seat, client, email } }
			);
			res.status(200).json({ message: 'OK' });
		} else {
			res.status(404).json({ errorMessage: 'Seat not found' });
		}
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

exports.deletePostById = async (req, res) => {
	try {
		const seatToDelete = await Seat.findById(req.params.id);

		if (!seatToDelete) {
			res
				.status(404)
				.json({ errorMessage: 'Seat you want to delete not found' });
		} else {
			await Seat.deleteOne({ _id: req.params.id });
			res.status(200).json({ message: 'Seat successfully deleted ' });
		}
	} catch (err) {
		res.status(500).json({ message: err });
	}
};
