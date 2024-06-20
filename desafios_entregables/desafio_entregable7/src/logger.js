import winston from "winston";

const customErrLeves = {
    levels: {debug: 5, http: 4, info: 3, warning: 2, error: 1, fatal: 0}
}

const devLogger = winston.createLogger({
    transports : [
        new winston.transports.Console({level: "debug"})
    ]
})

const prodLogger = winston.createLogger({
    levels: customErrLeves.levels,
    transports : [
        new winston.transports.Console({level: "info"}),
        new winston.transports.File({ level: 'error', filename: `./logs/errors.log`})
    ]
})

export const addLogger = (req, res, next) => {
    req.logger = prodLogger;
    next();
}

