import { Regex } from "@/util/type";

export interface EventCardComment {
    id: Regex.UUID;
    event_card_id: Regex.UUID;
    username: string;
    content: string;
    created_at: Regex.DateTime;
    updated_at: Regex.DateTime | null;
    /** 관리자용 비밀번호 */
    password: string;
}

export namespace EventCardComment {
    export interface Id {
        event_card_comment_id: Regex.UUID;
    }
}
