import * as nest from "@nestjs/common";

import { HealthController } from "./health.controller";

@nest.Module({
    controllers: [HealthController],
})
export class SystemModule {}
