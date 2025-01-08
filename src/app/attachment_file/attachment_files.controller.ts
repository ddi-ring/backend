import core from "@nestia/core";
import * as nest from "@nestjs/common";

import { notImpl } from "@/util/not_impl";

import { AttachmentFileCreateInputDTO, AttachmentFileCreateOutputDTO } from "./attachment_file.dto";

@nest.Controller("attachment-files")
export class AttachmentFilesController {
    /**
     * 첨부 파일 생성하기
     *
     * 첨부 파일 생성을 위한 정보를 생성합니다. 실제 리소스 업로드를 위해서는 응답으로 얻은 `presigned_url`을 사용하여 업로드해야 합니다.
     *
     * @summary 첨부 파일을 생성
     * @tag common
     * @param body 파일 생성 정보
     * @return 파일 업로드 url 및 id
     */
    @core.TypedRoute.Post()
    async create(@core.TypedBody() body: AttachmentFileCreateInputDTO): Promise<AttachmentFileCreateOutputDTO> {
        body;
        return notImpl();
    }
}
