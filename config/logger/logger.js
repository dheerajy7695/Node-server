const winston = require('winston');
const date = require('date-and-time');
const { format } = require('winston');
const { combine, timestamp, colorize, label, printf } = format;

function handleLog(message, method, endpoint, logTrace, level, logger, url = undefined) {
    const logData = {
        timestamp: date.format(new Date(), "YYYY-MM-DD HH:mm:ss"),
        message,
        method,
        endpoint,
        url,
        logTrace
    };
    return logger[level](logData);
};

const customFormat = printf(({ level, message, label, method, endpoint, url, logTrace }) => {

    let methodColon = method ? '-[Method: ' + method + ']' : '';
    let endpointColon = endpoint ? '-[Endpoint: ' + endpoint + ']' : '';
    let urlColon = url ? '-[Url: ' + url + ']' : '';
    let logTraceColon = logTrace ? '-[LogTrace: ' + logTrace + ']' : '';

    return `${date.format(new Date(), "YYYY-MM-DD HH:mm:ss")}- [${label}]- ${level} - message: ${message}${methodColon}${endpointColon}${urlColon}${logTraceColon}`;
});

let successLogger = winston.createLogger({
    level: 'info',
    format: combine(label({ label: 'LOCAL' }), format.colorize(), timestamp(), customFormat),
    transports: [new winston.transports.Console()]
});

let errorLogger = winston.createLogger({
    level: 'error',
    format: combine(label({ label: 'LOCAL' }), format.colorize(), timestamp(), customFormat),
    transports: [new winston.transports.Console()]
});

function info(message, method, endpoint, logTrace = undefined) {
    handleLog(message, method, endpoint, logTrace, 'info', successLogger);
};

function error(message, method, endpoint, logTrace = undefined) {
    handleLog(message, method, endpoint, logTrace, 'error', errorLogger);
};

module.exports = { info, error };