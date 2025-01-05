import type nestia from "@nestia/sdk";

const NESTIA_CONFIG: nestia.INestiaConfig = {
    input: "src/**/*.controller.ts",
    output: "./sdk",
    simulate: false,
    propagate: true,
    clone: true,
    primitive: true,
    json: false,
    swagger: {
        info: {
            title: "@ddi-ring/api",
            description:
                "띠링 API 서버 문서입니다. `version=0.0.0` 형태로 http 쿼리를 사용해 특정 버전의 문서를 확인할 수 있습니다.\n\n 동일한 스펙의 API Helper로 [`@ddi-ring/api`](https://github.com/ddi-ring/backend/pkgs/npm/api) 라이브러리도 배포되어 있습니다.",
        },
        openapi: "3.0",
        decompose: true,
        output: "packages/doc/openapi.json",
        servers: [
            { url: "http://localhost:4000", description: "Local Server" },
            { url: "https://api.ddi-ring.com", description: "PRD 서버" },
        ],
        security: { bearer: { type: "http", scheme: "bearer" } },
    },
};

export default NESTIA_CONFIG;
