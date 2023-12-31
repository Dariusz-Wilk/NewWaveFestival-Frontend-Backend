const express = require('express');
const cors = require('cors');
const path = require('path');
const socket = require('socket.io');

const app = express();

const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

app.use(express.static(path.join(__dirname, '/client/build')));
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
	req.io = io;
	next();
});
app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);

app.use('*', (req, res) => {
	res.sendFile(path.join(__dirname, '/client/build/index.html'));
});
app.use((req, res) => {
	res.status(404).json({ message: '404 not found...' });
});

const server = app.listen(process.env.PORT || 8000, () => {
	console.log('Server is running on port: 8000');
});

const io = socket(server);

io.on('connection', socket => {
	console.log(`New socket connected... ` + socket.id);
});
