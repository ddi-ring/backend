import * as nest from "@nestjs/common";

import { InfraModule } from "@/infrastructure/infra.module";

import { EventCardModule } from "./event_card/event_card.module";
import { EventCardCommentModule } from "./event_card_comment/event_card_comment.module";
import { SystemModule } from "./system/system.module";

@nest.Module({ imports: [InfraModule, SystemModule, EventCardModule, EventCardCommentModule] })
export class AppModule {}
