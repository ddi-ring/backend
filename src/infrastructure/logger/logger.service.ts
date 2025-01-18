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
        log: (level: Exclude<Lowercase<LogLevelType>, "all" | "off">, context: { message: [unknown, ...unknown[]] }) => void;
    };
    constructor(private readonly cls: ClsService) {
        this.winstonLogger = winston.createLogger({
            levels: { FATAL: 0, ERROR: 1, WARN: 2, INFO: 3, DEBUG: 4, TRACE: 5 },
            level: config("LOG_LEVEL"),
            transports: config("AWS_EXECUTION_ENV")?.startsWith("AWS_Lambda") ? LAMBDA_TRANSPORTS() : LOCAL_TRANSPORTS(this.cls),
        });
    }
    fatal(...message: [unknown, ...unknown[]]): void {
        this.winstonLogger.log("fatal", { message });
    }
    error(...message: [unknown, ...unknown[]]): void {
        this.winstonLogger.log("error", { message });
    }
    warn(...message: [unknown, ...unknown[]]): void {
        this.winstonLogger.log("warn", { message });
    }
    info(...message: [unknown, ...unknown[]]): void {
        this.winstonLogger.log("info", { message });
    }
    debug(...message: [unknown, ...unknown[]]): void {
        this.winstonLogger.log("debug", { message });
    }
    trace(...message: [unknown, ...unknown[]]): void {
        this.winstonLogger.log("trace", { message });
    }
    log(...message: [unknown, ...unknown[]]): void {
        this.log(...message);
    }
}
