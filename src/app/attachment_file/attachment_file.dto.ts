import { Regex } from "@/util/type";

import { AttachmentFile } from "./attachment_file.model";

export interface AttachmentFileCreateInputDTO<T extends string> extends Pick<AttachmentFile<T>, "name" | "extension" | "type"> {}
export interface AttachmentFileCreateOutputDTO {
    attachment_file_id: Regex.UUID;
    presigned_url: Regex.URI;
}
