import * as nest from "@nestjs/common";

import { LoggerService } from "@/infrastructure/logger/logger.service";

import { AttachmentFileModule } from "../attachment_file/attachment_file.module";
import { EventCardService } from "./event_card.service";
import { IEventCardService } from "./event_card.service.interface";
import { EventCardFilesController, EventCardsController } from "./event_cards.controller";

@nest.Module({
    imports: [AttachmentFileModule],
    providers: [{ provide: IEventCardService.Token, useClass: EventCardService }, LoggerService],
    controllers: [EventCardsController, EventCardFilesController],
    exports: [IEventCardService.Token],
})
export class EventCardModule {}
