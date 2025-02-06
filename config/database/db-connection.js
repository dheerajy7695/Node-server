const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const logger = require('../logger/logger');

const MONGO_URL = process.env.MONGO_URL || 'mongodb://0.0.0.0:27017/node-server';

const dbConnect = async () => {

    await mongoose.connect(MONGO_URL, {})
        .then(() => {
            logger.info('Database connected successfully');
        })
        .catch((err) => {
            logger.error('Database conection has error', err);
            process.exit(1);
        })

};

module.exports = { dbConnect };