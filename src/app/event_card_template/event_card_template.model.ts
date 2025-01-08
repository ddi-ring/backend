import { AttachmentFile } from "@/app/attachment_file/attachment_file.model";
import { Regex } from "@/util/type";

export interface EventCardTemplate {
    id: Regex.UUID;
    title: string;
    thumbnail_image: EventCardTemplate.ThumbnailImage;
    created_at: Regex.DateTime;
}

export namespace EventCardTemplate {
    export interface Id {
        event_card_template_id: Regex.UUID;
    }

    export interface ThumbnailImage extends AttachmentFile<"event_card_template_thumbnail_image"> {}
}
