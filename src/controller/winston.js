"use strict";

import winston from "winston";

export default class Logger {
  constructor(className = "<Gateway$ClassName>") {
    this.className = className;

    const { combine, timestamp, json, prettyPrint, colorize } = winston.format;

    this.logger = winston.createLogger({
      level: "verbose",
      format: combine(timestamp(), json(), prettyPrint(), colorize()),
      transports: [new winston.transports.Console()],
    });
  }

  pulse() {
    this.logger.verbose(`${this.className} is functional`);
  }
}
