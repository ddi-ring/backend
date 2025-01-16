import * as nest from "@nestjs/common";

import { EventCardModule } from "@/app/event_card/event_card.module";

import { EventCardCommentService } from "./event_card_comment.service";
import { IEventCardCommentService } from "./event_card_comment_service.interface";
import { EventCardCommentsController } from "./event_card_comments.controller";

@nest.Module({
    imports: [EventCardModule],
    providers: [{ provide: IEventCardCommentService.Token, useClass: EventCardCommentService }],
    controllers: [EventCardCommentsController],
})
export class EventCardCommentModule {}
