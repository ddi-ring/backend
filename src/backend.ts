import * as nest from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import cookieParser from "cookie-parser";
import helmet from "helmet";

import { AppModule } from "@/app/app.module";
import { config } from "@/infrastructure/config";
import { prisma } from "@/infrastructure/db";
import { logger } from "@/infrastructure/logger";
import { OmitKeyof } from "@/util/type";

export interface Backend {
    app: nest.INestApplication;
    start: () => Promise<void>;
    end: () => Promise<void>;
}

export const createBackend = async (options: OmitKeyof<nest.NestApplicationOptions, "cors"> = {}): Promise<Backend> => {
    const origin =
        config("ALLOW_ORIGIN")
            ?.split(/\s+/)
            .filter((line) => line !== "") ?? [];
    await prisma().$connect();
    const app = await NestFactory.create(AppModule, { ...options, ...(origin.length > 0 ? { cors: { origin, credentials: true } } : {}) });
    app.use(cookieParser(), helmet({ contentSecurityPolicy: true, hidePoweredBy: true }));
    await app.init();
    const end = async () => {
        await app.close();
        await prisma().$disconnect();
        logger()("Nest Application end");
    };
    process.on("SIGINT", async () => {
        await end();
        process.exit(process.exitCode);
    });
    logger()("Nest Application Initailized");
    return {
        app,
        start: async () => {
            await app.listen(config("PORT"));
            logger()(`Nest Application listening on ${config("PORT")}`);
        },
        end,
    };
};
