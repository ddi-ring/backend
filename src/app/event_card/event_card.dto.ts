import { Regex } from "@/util/type";

import { AttachmentFileCreateInputDTO } from "../attachment_file/attachment_file.dto";
import { EventCard } from "./event_card.model";

export interface EventCardDTO
    extends Pick<
        EventCard,
        "id" | "template_key" | "title" | "address" | "address_detail" | "invitation_message" | "event_time" | "created_at" | "updated_at"
    > {
    thumbnail_image_url: Regex.URI | null;
}

export interface EventCardFileCreateInputDTO extends AttachmentFileCreateInputDTO<EventCard.FileType> {}
export interface EventCardFileCreateOutputDTO {
    event_card_file_id: Regex.UUID;
    presigned_url: Regex.URI;
}

export interface EventCardCreateInputDTO
    extends Pick<EventCard, "title" | "password" | "invitation_message" | "address" | "address_detail" | "event_time"> {
    template_key: string;
    thumbnail_image_id?: Regex.UUID;
}
export interface EventCardCreateOutputDTO extends EventCard.Id {}

export interface EventCardRemoveInputDTO extends Pick<EventCard, "password"> {}
