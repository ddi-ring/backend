import typia from "typia";

import { AttachmentFileCreateInputDTO } from "@/app/attachment_file/attachment_file.dto";
import { Regex } from "@/util/type";

import { EventCard } from "./event_card.model";

type Time = string & typia.tags.Pattern<"^(?:[0-1][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$">;
export interface EventCardDTO
    extends Pick<
        EventCard,
        "id" | "template_key" | "title" | "address" | "address_detail" | "invitation_message" | "created_at" | "updated_at"
    > {
    thumbnail_image_url: Regex.URI | null;
    /** 이벤트 일자(KST) */
    event_date: string & typia.tags.Format<"date">;
    /** 시작 시간(KST) */
    event_start_time: Time;
    /** 끝 시간(KST) */
    event_end_time: Time;
}

export interface EventCardFileCreateInputDTO extends AttachmentFileCreateInputDTO<EventCard.FileType> {}
export interface EventCardFileCreateOutputDTO {
    event_card_file_id: Regex.UUID;
    presigned_url: Regex.URI;
}

export interface EventCardCreateInputDTO
    extends Pick<EventCard, "title" | "password" | "invitation_message" | "address" | "address_detail">,
        Pick<EventCardDTO, "event_date" | "event_start_time" | "event_end_time"> {
    template_key: string;
    thumbnail_image_id?: Regex.UUID;
}
export interface EventCardCreateOutputDTO extends EventCard.Id {}

export interface EventCardRemoveInputDTO extends Pick<EventCard, "password"> {}
