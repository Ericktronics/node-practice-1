import winston from "winston";

const { combine, timestamp, printf, colorize, errors } = winston.format;

// Custom log format
const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}]: ${stack || message}`;
});

// Create transports array
const transports: winston.transport[] = [
  // Console transport with colors
  new winston.transports.Console({
    format: combine(
      colorize(),
      timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      logFormat
    ),
  }),
];

// Add file transports in production or if LOG_TO_FILE is set
if (
  process.env.NODE_ENV === "production" ||
  process.env.LOG_TO_FILE === "true"
) {
  transports.push(
    // File transport for errors
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
      format: combine(
        errors({ stack: true }),
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        logFormat
      ),
    }),
    // File transport for all logs
    new winston.transports.File({
      filename: "logs/combined.log",
      format: combine(
        errors({ stack: true }),
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        logFormat
      ),
    })
  );
}

// Create and export the logger
export const logger = winston.createLogger({
  level:
    process.env.LOG_LEVEL ||
    (process.env.NODE_ENV === "production" ? "info" : "debug"),
  format: combine(
    errors({ stack: true }),
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    logFormat
  ),
  transports,
  // Handle exceptions and rejections
  exceptionHandlers: [
    new winston.transports.Console({
      format: combine(colorize(), timestamp(), logFormat),
    }),
    ...(process.env.NODE_ENV === "production" ||
    process.env.LOG_TO_FILE === "true"
      ? [
          new winston.transports.File({
            filename: "logs/exceptions.log",
          }),
        ]
      : []),
  ],
  rejectionHandlers: [
    new winston.transports.Console({
      format: combine(colorize(), timestamp(), logFormat),
    }),
    ...(process.env.NODE_ENV === "production" ||
    process.env.LOG_TO_FILE === "true"
      ? [
          new winston.transports.File({
            filename: "logs/rejections.log",
          }),
        ]
      : []),
  ],
});
