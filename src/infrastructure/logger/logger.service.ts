import { Injectable } from "@nestjs/common";
import { ClsService } from "nestjs-cls";
import winston from "winston";

import { config } from "@/infrastructure/config";
import { LAMBDA_TRANSPORTS } from "@/infrastructure/logger/transport/lambda.transport";
import { LOCAL_TRANSPORTS } from "@/infrastructure/logger/transport/local.transport";
import { Exclude } from "@/util/type";

import { LogLevelType } from "./level.type";

@Injectable()
export class LoggerService {
    private winstonLogger: {
        log: (level: Exclude<LogLevelType, "ALL" | "OFF">, context: { message: [unknown, ...unknown[]] }) => void;
    };
    constructor(private readonly cls: ClsService) {
        this.winstonLogger = winston.createLogger({
            levels: { FATAL: 0, ERROR: 1, WARN: 2, INFO: 3, DEBUG: 4, TRACE: 5 },
            level: config("LOG_LEVEL"),
            transports: config("AWS_EXECUTION_ENV")?.startsWith("AWS_Lambda") ? LAMBDA_TRANSPORTS() : LOCAL_TRANSPORTS(this.cls),
        });
    }
    fatal(...message: [unknown, ...unknown[]]): void {
        this.winstonLogger.log("FATAL", { message });
    }
    error(...message: [unknown, ...unknown[]]): void {
        this.winstonLogger.log("ERROR", { message });
    }
    warn(...message: [unknown, ...unknown[]]): void {
        this.winstonLogger.log("WARN", { message });
    }
    info(...message: [unknown, ...unknown[]]): void {
        this.winstonLogger.log("INFO", { message });
    }
    debug(...message: [unknown, ...unknown[]]): void {
        this.winstonLogger.log("DEBUG", { message });
    }
    trace(...message: [unknown, ...unknown[]]): void {
        this.winstonLogger.log("TRACE", { message });
    }
    log(...message: [unknown, ...unknown[]]): void {
        this.winstonLogger.log("INFO", { message });
    }
}
