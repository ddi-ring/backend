import * as nest from "@nestjs/common";

import { InfraModule } from "@/infrastructure/infra.module";

import { EventCardModule } from "./event_card/event_card.module";
import { SystemModule } from "./system/system.module";

@nest.Module({ imports: [InfraModule, SystemModule, EventCardModule] })
export class AppModule {}
