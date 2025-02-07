const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

const logger = require('./config/logger/logger');

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

PORT = process.env.PORT;

app.get('/', (req, res) => {
    res.send('This is from nodejs server');
});

app.get('/get-data', (req, res) => {
    res.json({ name: "dheeraj", id: 1001 })
});

app.listen(PORT, () => {
    logger.info(`server is running on port -${PORT}`);
});

app.get('*', (req, res) => {
    res.status(404).json({ status: 404, message: `Can't find ${req.originalUrl} on server` });
})

process.on('uncaughtException', (err) => {
    console.log('uncaughtException', err);
    process.exit(1);
});

process.on('unhandledRejection', (reason) => {
    logger.error('Unhandled Rejection:', reason);
});