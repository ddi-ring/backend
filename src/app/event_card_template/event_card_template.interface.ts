import { AttachmentFile } from "@/app/attachment_file/attachment_file.interface";
import { Regex } from "@/util/type";

export interface EventCardTemplate {
    id: Regex.UUID;
    title: string;
    thumbnail_image: AttachmentFile;
    created_at: Regex.DateTime;
}
