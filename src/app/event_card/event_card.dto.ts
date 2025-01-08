import { Regex } from "@/util/type";

import { AttachmentFileCreateInputDTO, AttachmentFileCreateOutputDTO } from "../attachment_file/attachment_file.dto";
import { EventCard } from "./event_card.model";

export interface EventCardDTO
    extends Pick<
        EventCard,
        "id" | "template" | "title" | "address" | "address_detail" | "invitation_message" | "event_time" | "created_at" | "updated_at"
    > {
    thumbnail_image_url: Regex.URI;
}

export interface EventCardFileCreateInputDTO extends AttachmentFileCreateInputDTO<EventCard.FileType> {}
export interface EventCardFileCreateOutputDTO extends AttachmentFileCreateOutputDTO {}

export interface EventCardCreateInputDTO
    extends Pick<EventCard, "title" | "password" | "invitation_message" | "address" | "address_detail" | "event_time"> {
    template_id: Regex.UUID;
    thumbnail_image_id: Regex.UUID;
}
export interface EventCardCreateOutputDTO extends EventCard.Id {}
