import core from "@nestia/core";
import * as nest from "@nestjs/common";

import { notImpl } from "@/util/not_impl";
import { Regex } from "@/util/type";

import { EventCardCommentCreateInputDTO, EventCardCommentCreateOutputDTO, EventCardCommentRemoveInputDTO } from "./event_card_comment.dto";

@nest.Controller("event-card-comments")
export class EventCardCommentsController {
    /**
     * 이벤트 카드 메시지를 생성합니다.
     *
     * @summary 이벤트 카드 메시지 생성
     * @tag event-card
     * @param body 메시지 생성 정보
     * @return 카드 id
     */
    @core.TypedRoute.Post()
    async create(@core.TypedBody() body: EventCardCommentCreateInputDTO): Promise<EventCardCommentCreateOutputDTO> {
        body;
        return notImpl();
    }

    /**
     * 이벤트 카드 메시지를 삭제합니다.
     *
     * @summary 이벤트 메시지 삭제
     * @tag event-card
     * @param event_card_comment_id 메시지 id
     */
    @core.TypedRoute.Delete(":event_card_comment_id")
    async remove(
        @core.TypedParam("event_card_comment_id") event_card_comment_id: Regex.UUID,
        @core.TypedBody() body: EventCardCommentRemoveInputDTO,
    ): Promise<void> {
        event_card_comment_id;
        body;
        return notImpl();
    }
}
