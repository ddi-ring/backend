import { isUndefined } from "@fxts/core";
import * as nest from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import { Response } from "express";

import { Err } from "@/common/err/err";
import { SystemErr } from "@/common/err/err_code/system.code";

import { LoggerService } from "./logger/logger.service";

@nest.Catch()
export class AllExceptionFilter implements nest.ExceptionFilter {
    constructor(
        private readonly httpAdapterHost: HttpAdapterHost,
        private readonly logger: LoggerService,
    ) {}

    catch(exception: unknown, host: nest.ArgumentsHost) {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse<Response>();

        const SYSTEM_ERROR: {
            400: SystemErr.INPUT_INVALID["code"];
            404: SystemErr.API_NOT_FOUND["code"];
            [x: number]: string | undefined;
        } = {
            400: "INPUT_INVALID",
            404: "API_NOT_FOUND",
        };

        const [body, status]: [Err.Body<string>, number] =
            Err.is(exception) ? [exception.body, exception.status]
            : this.isHttpException(exception) ?
                (() => {
                    const status = exception.getStatus();
                    const code = SYSTEM_ERROR[status];
                    if (isUndefined(code)) {
                        this.logger.fatal("[AllExceptionFilter]", exception);
                        return [{ code: "INTERNAL_SERVER_ERROR", message: exception.message }, nest.HttpStatus.INTERNAL_SERVER_ERROR];
                    }
                    return [{ code, message: exception.message }, status];
                })()
            :   (() => {
                    this.logger.fatal("[AllExceptionFilter]", exception);
                    return [
                        {
                            code: "INTERNAL_SERVER_ERROR",
                            message: "요청을 처리할 수 없습니다.",
                        } satisfies SystemErr.INTERNAL_SERVER_ERROR,
                        nest.HttpStatus.INTERNAL_SERVER_ERROR,
                    ];
                })();

        return this.httpAdapterHost.httpAdapter.reply(res, body, status);
    }

    isHttpException(error: unknown): error is nest.HttpException {
        const prototype = Object.getPrototypeOf(error);
        if (typeof prototype === "object" && prototype !== null) {
            const name = prototype.constructor.name;
            if (name === "HttpException") return true;
            if (name === "Error" || name === "Object") return false; // 재귀 단축
            return this.isHttpException(prototype);
        }
        return false;
    }
}
