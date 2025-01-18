import * as nest from "@nestjs/common";

import { EventCardModule } from "@/app/event_card/event_card.module";
import { LoggerService } from "@/infrastructure/logger/logger.service";

import { EventCardCommentService } from "./event_card_comment.service";
import { IEventCardCommentService } from "./event_card_comment_service.interface";
import { EventCardCommentsController } from "./event_card_comments.controller";

@nest.Module({
    imports: [EventCardModule],
    providers: [{ provide: IEventCardCommentService.Token, useClass: EventCardCommentService }, LoggerService],
    controllers: [EventCardCommentsController],
})
export class EventCardCommentModule {}
