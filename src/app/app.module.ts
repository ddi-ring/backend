import * as nest from "@nestjs/common";
import { randomUUID } from "crypto";
import { ClsModule } from "nestjs-cls";

import { InfraModule } from "@/infrastructure/infra.module";

import { EventCardModule } from "./event_card/event_card.module";
import { EventCardCommentModule } from "./event_card_comment/event_card_comment.module";
import { SystemModule } from "./system/system.module";

@nest.Module({
    imports: [
        ClsModule.forRoot({
            global: true,
            middleware: { mount: true, generateId: true, idGenerator: (req: any) => req.headers["x-request-id"] ?? randomUUID() },
        }),
        InfraModule,
        SystemModule,
        EventCardModule,
        EventCardCommentModule,
    ],
})
export class AppModule {}
