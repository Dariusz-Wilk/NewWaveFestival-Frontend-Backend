const express = require('express');
const randomId = require('@dark_wilk/id-generator');

const router = express.Router();

const Concert = require('../models/concert.model');

router.get('/concerts', async (req, res) => {
	try {
		res.json(await Concert.find());
	} catch (err) {
		res.status(500).json({ message: err });
	}
});

router.get('/concerts/:id', async (req, res) => {
	try {
		const concert = await Concert.findById(req.params.id);
		if (!concert) res.status(404).json({ message: 'Not Found' });
		else res.json(concert);
	} catch (err) {
		res.status(500).json({ message: err });
	}
});

router.post(`/concerts`, async (req, res) => {
	try {
		const { performer, genre, price, day } = req.body;
		const newConcert = new Concert({
			id: randomId(5),
			performer,
			genre,
			price,
			day,
		});
		await newConcert.save();
		res.status(200).json({ message: 'OK' });
	} catch (err) {
		res.status(500).json({ message: err });
	}
});

router.put('/concerts/:id', async (req, res) => {
	try {
		const { performer, genre, price, day } = req.body;
		const concert = await Concert.findById(req.params.id);

		if (concert) {
			await Concert.updateOne(
				{ _id: req.params.id },
				{ $set: { performer, genre, price, day } }
			);

			res.status(200).json({ message: 'OK' });
		} else {
			return res.status(404).json({ errorMessage: 'Concert not found' });
		}
	} catch (err) {
		res.status(500).json({ message: err });
	}
});

router.delete('/concerts/:id', async (req, res) => {
	try {
		const concert = await Concert.findById(req.params.id);

		if (!concert) {
			return res
				.status(404)
				.json({ errorMessage: 'Concert you want to delete not found' });
		}

		await Concert.deleteOne({ _id: req.params.id });
		res.status(200).json({ message: 'Concert successfully deleted ' });
	} catch (err) {
		res.status(500).json({ message: err });
	}
});

module.exports = router;
