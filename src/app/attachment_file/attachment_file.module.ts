import * as nest from "@nestjs/common";

import { LoggerService } from "@/infrastructure/logger/logger.service";

import { AttachmentFileService } from "./attachment_file.service";
import { IAttachmentFileService } from "./attachment_file.service.interface";

@nest.Module({
    providers: [{ provide: IAttachmentFileService.Token, useClass: AttachmentFileService }, LoggerService],
    exports: [IAttachmentFileService.Token],
})
export class AttachmentFileModule {}
