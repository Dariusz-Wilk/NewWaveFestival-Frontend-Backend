const express = require('express');
const randomId = require('@dark_wilk/id-generator');

const router = express.Router();
const Testimonial = require('../models/testimonial.model');
const db = require('../db');

router.get('/testimonials', async (req, res) => {
	try {
		res.json(await Testimonial.find());
	} catch (err) {
		res.status(500).json({ message: err });
	}
});

router.get('/testimonials/random', async (req, res) => {
	try {
		const count = await Testimonial.countDocuments();
		const rand = Math.floor(Math.random() * count);

		res.json(await Testimonial.findOne().skip(rand));
		res.json({ message: 'OK' });
	} catch (err) {
		res.status(500).json({ message: err });
	}
});

router.get('/testimonials/:id', async (req, res) => {
	try {
		const testimonial = await Testimonial.findById(req.params.id);
		if (testimonial) res.json(testimonial);
		else res.status(404).json({ message: 'Not Found' });
	} catch (err) {
		res.status(500).json({ message: err });
	}
});

router.post(`/testimonials`, async (req, res) => {
	try {
		const { author, text } = req.body;

		const newTestimonial = new Testimonial({ author, text });
		await newTestimonial.save();
		res.status(200).json({ message: 'OK' });
	} catch (err) {
		res.status(500).json({ message: err });
	}
});

router.put('/testimonials/:id', async (req, res) => {
	try {
		const testimonialToEdit = await Testimonial.findById(req.params.id);
		const { author, text } = req.body;

		if (testimonialToEdit) {
			await Testimonial.updateOne(
				{ _id: req.params.id },
				{ $set: { author, text } }
			);
			res.status(200).json({ message: 'OK' });
		} else {
			return res.status(404).json({ errorMessage: 'Testimonial not found' });
		}
	} catch (err) {
		res.status(500).json({ message: err });
	}
});

router.delete('/testimonials/:id', async (req, res) => {
	try {
		const testimonial = await Testimonial.findById(req.params.id);

		if (!testimonial) {
			res
				.status(404)
				.json({ errorMessage: 'Testimonial you want to delete not found' });
		} else {
			await Testimonial.deleteOne({ _id: req.params.id });
			res
				.status(200)
				.json({ message: 'Testimonial successfully deleted ', testimonial });
		}
	} catch (err) {
		res.status(500).json({ message: err });
	}
});

module.exports = router;
