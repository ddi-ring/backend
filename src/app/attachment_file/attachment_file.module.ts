import * as nest from "@nestjs/common";

import { AttachmentFileService } from "./attachment_file.service";
import { IAttachmentFileService } from "./attachment_file.service.interface";

@nest.Module({
    providers: [{ provide: IAttachmentFileService.Token, useClass: AttachmentFileService }],
    exports: [IAttachmentFileService.Token],
})
export class AttachmentFileModule {}
