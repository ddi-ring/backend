import { AttachmentFile } from "./attachment_file.model";

export interface AttachmentFileCreateInputDTO<T extends string> extends Pick<AttachmentFile<T>, "name" | "extension" | "type"> {}
export interface AttachmentFileCreateOutputDTO extends AttachmentFile.Id {
    key: string;
}
