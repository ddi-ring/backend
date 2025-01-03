import * as nest from "@nestjs/common";

import { InfraModule } from "@/infrastructure/infra.module";

import { SystemModule } from "./system/system.module";

@nest.Module({ imports: [InfraModule, SystemModule] })
export class AppModule {}
