import { OmitKeyof, Regex } from "@/util/type";

import { AttachmentFileCreateInputDTO, AttachmentFileCreateOutputDTO } from "./attachment_file.dto";
import { AttachmentFile } from "./attachment_file.model";

export interface IAttachmentFileService {
    readonly get: (input: IAttachmentFileService.GetInput) => Promise<OmitKeyof<AttachmentFile<string>, "type">>;
    readonly create: (input: IAttachmentFileService.CreateInput) => Promise<AttachmentFileCreateOutputDTO>;
    readonly preSign: (input: IAttachmentFileService.PreSignInput) => Promise<Regex.URI>;
}

export namespace IAttachmentFileService {
    export const Token = Symbol("AttachmentFileService");
    export interface GetInput {
        attachment_file_id: Regex.UUID;
    }
    export interface CreateInput extends AttachmentFileCreateInputDTO<string> {}
    export interface PreSignInput extends Pick<AttachmentFile<string>, "key"> {
        action: "get" | "put";
        // duration: number;
    }
}
