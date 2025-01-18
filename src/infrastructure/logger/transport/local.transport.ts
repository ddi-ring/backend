import { ClsService } from "nestjs-cls";
import winston from "winston";

import { LogLevelType } from "@/infrastructure/logger/level.type";
import { Exclude } from "@/util/type";

import { stringifyLogFormat } from "./stringify.format";

export const LOCAL_TRANSPORTS = (cls?: ClsService) => [
    new winston.transports.Stream({
        stream: process.stdout,
        format: winston.format.combine(
            stringifyLogFormat({ colors: true }),
            winston.format.colorize({
                level: true,
                colors: {
                    TRACE: "gray",
                    DEBUG: "gray",
                    INFO: "green",
                    WARN: "yellow",
                    ERROR: "blue",
                    FATAL: "red",
                } satisfies Record<Exclude<LogLevelType, "ALL" | "OFF">, "red" | "blue" | "yellow" | "green" | "gray" | "white">,
            }),
            winston.format.printf((info) => {
                const requestId = cls?.getId?.() || null;
                const requestIdPart = requestId ? `[${requestId}] ` : "";
                return `[${info.level}] ${new Date().toLocaleString("ko", { timeZone: "Asia/Seoul" })} ${requestIdPart}${info.message}`;
            }),
        ),
    }),
];
