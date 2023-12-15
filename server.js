const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

app.use(express.static(path.join(__dirname, '/client/build')));
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);

app.use('*', (req, res) => {
	res.sendFile(path.join(__dirname, '/client/build/index.html'));
});
app.use((req, res) => {
	res.status(404).json({ message: '404 not found...' });
});

app.listen(8000, () => {
	console.log('Server is running on port: 8000');
});
