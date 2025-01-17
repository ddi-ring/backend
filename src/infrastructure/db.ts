import { PrismaClient } from "@prisma/client";

import { logger } from "@/infrastructure/logger/bootstrap-logger";
import { Make } from "@/util/make";

import { config } from "./config";

const createClient = () => {
    const client = new PrismaClient({
        // datasources: { database: { url: config("DATABASE_URL") } },
        log:
            config("NODE_ENV") === "development" ?
                [
                    { emit: "event", level: "error" },
                    { emit: "event", level: "warn" },
                    { emit: "event", level: "info" },
                    { emit: "event", level: "query" },
                ]
            :   [
                    { emit: "event", level: "error" },
                    { emit: "event", level: "warn" },
                ],
    });
    client.$on("error", logger("error"));
    client.$on("warn", logger("warn"));
    if (config("NODE_ENV") === "development") {
        client.$on("query", logger());
        client.$on("info", logger());
    }
    return client;
};

export const prisma = Make.once<PrismaClient>(createClient);
