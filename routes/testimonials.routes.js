const express = require('express');
const randomId = require('@dark_wilk/id-generator');

const router = express.Router();
const db = require('../db');

router.route('/testimonials').get((req, res) => {
	res.json(db.testimonials);
});

router.route('/testimonials/random').get((req, res) => {
	res.json(db.testimonials[Math.floor(Math.random() * db.testimonials.length)]);
});

router.route('/testimonials/:id').get((req, res) => {
	const paramId = parseInt(req.params.id);
	const testimonial = db.testimonials.find(item => item.id === paramId);
	res.json(testimonial);
});

router.route(`/testimonials`).post((req, res) => {
	const { author, text } = req.body;
	const newTestimonial = {
		id: randomId(5),
		author,
		text,
	};
	db.testimonials.push(newTestimonial);
	res.status(200).json({ message: 'OK' });
});

router.route('/testimonials/:id').put((req, res) => {
	const testimonialId = req.params.id.toString();
	const { author, text } = req.body;
	const index = db.testimonials.findIndex(
		item => item.id.toString() === testimonialId
	);

	if (index !== -1) {
		db.testimonials[index] = { ...db.testimonials[index], author, text };
		res.status(200).json({ message: 'OK' });
	} else {
		return res.status(404).json({ errorMessage: 'Testimonial not found' });
	}
});

router.route('/testimonials/:id').delete((req, res) => {
	const testimonialId = req.params.id.toString();
	const index = db.testimonials.findIndex(
		item => item.id.toString() === testimonialId
	);

	if (index === -1) {
		return res
			.status(404)
			.json({ errorMessage: 'Testimonial you want to delete not found' });
	}

	db.testimonials.splice(index, 1);
	res
		.status(200)
		.json({ message: 'Testimonial successfully deleted ', testimonialId });
});

module.exports = router;
