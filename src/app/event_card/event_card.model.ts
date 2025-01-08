import { AttachmentFile } from "@/app/attachment_file/attachment_file.model";
import { EventCardTemplate } from "@/app/event_card_template/event_card_template.model";
import { Extract, Regex } from "@/util/type";

export interface EventCard {
    id: Regex.UUID;
    /** 이벤트 카드 템플릿 정보 */
    template: EventCard.Template;
    /** 카드 대표 이미지 정보 */
    thumbnail_image: EventCard.ThumbnailImage;
    /** 관리자용 비밀번호 */
    password: string;
    /** 주제 */
    title: string;
    /** 행사 장소 기본 주소 */
    address: string;
    /** 행사 장소 상세 주소 */
    address_detail: string;
    /** 모시는 글(초대글) */
    invitation_message: string;
    /** 행사 일자 */
    event_time: Regex.DateTime;
    /** 카드 생성 일자 */
    created_at: Regex.DateTime;
    /** 카드 수정 일자 */
    updated_at: Regex.DateTime | null;
}

export namespace EventCard {
    export interface Id {
        event_card_id: Regex.UUID;
    }
    export interface Template extends Pick<EventCardTemplate, "id" | "title" | "created_at"> {}

    export type FileType = "thumbnail_image" | "gallery_image";
    export interface ThumbnailImage extends AttachmentFile<Extract<FileType, "thumbnail_image">> {}
}
