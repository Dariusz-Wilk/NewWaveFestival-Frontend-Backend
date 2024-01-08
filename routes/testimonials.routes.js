const express = require('express');

const router = express.Router();
const TestimonialController = require('../controllers/testimonials.controller');

router.get('/testimonials', TestimonialController.getAllTestimonials);

router.get('/testimonials/random', TestimonialController.getRandomTestimonial);

router.get('/testimonials/:id', TestimonialController.getTestimonialById);

router.post(`/testimonials`, TestimonialController.addNewTestimonials);

router.put('/testimonials/:id', TestimonialController.editTestimonialById);

router.delete(
	'/testimonials/:id',
	TestimonialController.deleteTestimonialsById
);

module.exports = router;
