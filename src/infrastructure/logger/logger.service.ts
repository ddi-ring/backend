import { Injectable } from "@nestjs/common";
import { ClsService } from "nestjs-cls";
import winston from "winston";

import { config } from "@/infrastructure/config";
import { LAMBDA_TRANSPORTS } from "@/infrastructure/logger/transport/lambda.transport";
import { LOCAL_TRANSPORTS } from "@/infrastructure/logger/transport/local.transport";

import { LogLevelType } from "./level.type";

@Injectable()
export class LoggerService {
    private winstonLogger;

    constructor(private readonly cls: ClsService) {
        this.winstonLogger = winston.createLogger({
            levels: { FATAL: 0, ERROR: 1, WARN: 2, INFO: 3, DEBUG: 4, TRACE: 5 },
            level: config("LOG_LEVEL"),
            transports: config("AWS_EXECUTION_ENV")?.startsWith("AWS_Lambda") ? LAMBDA_TRANSPORTS() : LOCAL_TRANSPORTS(this.cls),
        });
    }

    log(level: Exclude<Lowercase<LogLevelType>, "all" | "off"> = "info", ...message: unknown[]) {
        this.winstonLogger.log(level.toUpperCase(), {
            message,
        });
    }
}
