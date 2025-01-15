import { Regex } from "@/util/type";

export interface AttachmentFile<Type extends string> {
    type: Type;
    /** 고유 id */
    id: Regex.UUID;
    /** image.png 에서 `image` 부분입니다. */
    name: string;
    /** image.png 에서 `png` 부분입니다. */
    extension: string;
    /** 파일 저장소 내에 실제 리소스의 위치를 나타내는 정보입니다. */
    key: string;
    /** 생성일자 */
    created_at: Regex.DateTime;
}

export namespace AttachmentFile {
    export interface Id {
        attachment_file_id: Regex.UUID;
    }
}
