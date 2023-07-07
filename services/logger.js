const  config  = require("config");
const winston=require("winston")
require("winston-mongodb")

const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf,colorize } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp}  ${level}: ${message}`;
});
let logger=createLogger({
  format: combine(timestamp(),myFormat),
  transports: [
  new transports.Console({level:"debug"}),
  new transports.File({filename:"log/error.log",level:"error"}),
  new transports.File({filename:"log/combine.log",level:"info"}),
]
});

logger.exceptions.handle(
  new transports.File({filename:"log/exeption.log"})
)
logger.rejections.handle(
  new transports.File({filename:"log/rejection.log"})
  
)

module.exports=logger