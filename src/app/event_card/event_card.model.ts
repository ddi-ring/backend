import { AttachmentFile } from "@/app/attachment_file/attachment_file.model";
import { Extract, Regex } from "@/util/type";

export interface EventCard {
    id: Regex.UUID;
    /**
     * 이벤트 카드 템플릿 정보
     *
     * 템플릿을 식별할 수 있는 템플릿의 고유한 키값입니다.
     *
     * UI상에서 해당 키를 기준으로 레이아웃 디자인을 적용합니다.
     */
    template_key: string;
    /** 카드 대표 이미지 정보 */
    thumbnail_image: EventCard.ThumbnailImage | null;
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

    export type FileType = "thumbnail_image" | "gallery_image";
    export interface ThumbnailImage extends AttachmentFile<Extract<FileType, "thumbnail_image">> {}
}
