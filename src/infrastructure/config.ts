import dotenv from "dotenv";
import typia from "typia";

import { LogLevelType } from "@/infrastructure/logger/level.type";
import { Make } from "@/util/make";

export interface Config {
    NODE_ENV: "development" | "production" | "test";
    /** @default 4000 */
    PORT: number | `${number}`;
    /**
     * 런타임 ID로서 앞에 AWS_Lambda_가 붙습니다(예: AWS_Lambda_java8). 이 환경 변수는 OS 전용 런타임(provided 런타임 제품군)에서 정의되지 않았습니다.
     */
    AWS_EXECUTION_ENV?: string;
    // DATABASE_URL: string;

    ALLOW_ORIGIN?: string;
    /**
     * 일반 모드에서 기본값은 INFO
     *
     * 테스트 모드에서는 기본값 FATAL을 사용
     *
     */
    LOG_LEVEL: LogLevelType;
    /** Resource Storage Name */
    BUCKET: string;
    /** Resource Alternative Domain */
    RESOURCE_DOMAIN: string;
}

const loadConfig = Make.once((): Config => {
    switch (process.env["NODE_ENV"]) {
        case "development":
            dotenv.config({ path: ".env.dev", override: true });
            break;
        case "test":
            dotenv.config({ path: ".env.test", override: true });
            break;
        case "production":
            break;
        default:
            throw Error("NODE_ENV should be one of (development|production|test)");
    }
    return process.env["NODE_ENV"] === "test" ?
            ({
                PORT: 4000,
                LOG_LEVEL: "FATAL",
                ...process.env,
            } satisfies Partial<Config> as Config)
        :   typia.assert<Config>({ PORT: 4000, LOG_LEVEL: "INFO", ...process.env } satisfies Partial<Config>);
});

export const config = <T extends keyof Config>(key: T) => loadConfig()[key];
