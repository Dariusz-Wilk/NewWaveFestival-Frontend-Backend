const express = require('express');
const cors = require('cors');
const path = require('path');
const socket = require('socket.io');
const mongoose = require('mongoose');
const helmet = require('helmet');

const app = express();

app.use(helmet());

const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

const NODE_ENV = process.env.NODE_ENV;
let dbUri = '';

if (NODE_ENV === 'production')
	dbUri = `mongodb+srv://dariuszwilk1993:${process.env.DB_PASS}@cluster0.nazijyh.mongodb.net/newWaveDB?retryWrites=true&w=majority`;
else dbUri = 'mongodb://0.0.0.0:27017/newWaveDB';

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
	console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));

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
