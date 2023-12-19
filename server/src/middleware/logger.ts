import { Request, Response } from "express";
import morgan from "morgan";
import winston from "winston";

export const Logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
    winston.format.printf(
      (info) => `${info.timestamp} ${info.level}: ${info.message}`,
    ),
  ),

  transports: [
    new winston.transports.Console({
      format: winston.format.colorize({ all: true }),
    }),
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
    }),
  ],
});

const morganConfig = {
  stream: {
    write: (message: string) => {
      Logger.error(message);
    },
  },
  skip: (req: Request, res: Response) => {
    return res.statusCode < 400;
  },
};

morgan.token("message", (req: Request, res: Response) => {
  return res.locals.errorMessage || "no message";
});

export const errorLogger = morgan(
  `:remote-addr - :status :method :url - :response-time ms - message: :message`,
  {
    ...morganConfig,
  },
);
