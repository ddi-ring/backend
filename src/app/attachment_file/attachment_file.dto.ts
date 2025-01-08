import { Regex } from "@/util/type";

import { AttachmentFile } from "./attachment_file.interface";

export interface CreateAttachmentFileDTO {
    name: string;
    extension: string;
}

export interface AttachmentFileCreateInputDTO extends Pick<AttachmentFile, "name" | "extension"> {}
export interface AttachmentFileCreateOutputDTO {
    attachment_file_id: Regex.UUID;
    presigned_url: Regex.URI;
}
