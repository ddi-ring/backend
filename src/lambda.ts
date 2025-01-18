import serverless from "@codegenie/serverless-express";
import { Handler } from "aws-lambda";

import { createBackend } from "@/backend";
import { SystemErr } from "@/common/err/err_code/system.code";
import { logger } from "@/infrastructure/logger";

let app: Handler | null = null;

export const handler: Handler = async (e, c, cb) => {
    try {
        app = app ?? serverless({ app: (await createBackend({ logger: false })).app.getHttpAdapter().getInstance() });
        return await app(e, c, cb);
    } catch (error: unknown) {
        logger("fatal")(error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                code: "INTERNAL_SERVER_ERROR",
                message: "서비스가 불가능합니다.",
            } satisfies SystemErr.INTERNAL_SERVER_ERROR),
            headers: { "Content-Type": "application/json" },
        };
    }
};
