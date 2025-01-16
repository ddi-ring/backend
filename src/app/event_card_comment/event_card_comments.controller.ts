import core from "@nestia/core";
import * as nest from "@nestjs/common";

import { Regex } from "@/util/type";

import {
    EventCardCommentCreateInputDTO,
    EventCardCommentCreateOutputDTO,
    EventCardCommentPaginatedDTO,
    EventCardCommentRemoveInputDTO,
    EventCardCommentSearchDTO,
} from "./event_card_comment.dto";
import { IEventCardCommentService } from "./event_card_comment_service.interface";

@nest.Controller("event-card-comments")
export class EventCardCommentsController {
    constructor(@nest.Inject(IEventCardCommentService.Token) private readonly service: IEventCardCommentService) {}
    /**
     * 이벤트 카드 메시지 목록 정보를 보여줍니다.
     *
     * 메시지란 비회원 권한으로 누구나 이벤트 카드에 남길 수 있는 축하 메시지 혹은 방명록을 의미합니다.
     *
     * @summary 이벤트 카드 메시지 목록 조회
     * @tag event-card-comment
     * @param event_card_id 카드 id
     * @param query 조회 쿼리
     * @return 이벤트 카드 메시지 목록
     */
    @core.TypedRoute.Get()
    async paginate(@core.TypedQuery() query: EventCardCommentSearchDTO): Promise<EventCardCommentPaginatedDTO> {
        return this.service.paginate(query);
    }
    /**
     * 이벤트 카드 메시지를 생성합니다.
     *
     * @summary 이벤트 카드 메시지 생성
     * @tag event-card-comment
     * @param body 메시지 생성 정보
     * @return 카드 id
     */
    @core.TypedRoute.Post()
    async create(@core.TypedBody() body: EventCardCommentCreateInputDTO): Promise<EventCardCommentCreateOutputDTO> {
        return this.service.create(body);
    }

    /**
     * 이벤트 카드 메시지를 삭제합니다.
     *
     * @summary 이벤트 메시지 삭제
     * @tag event-card-comment
     * @param event_card_comment_id 메시지 id
     */
    @core.TypedRoute.Delete(":event_card_comment_id")
    async remove(
        @core.TypedParam("event_card_comment_id") event_card_comment_id: Regex.UUID,
        @core.TypedBody() body: EventCardCommentRemoveInputDTO,
    ): Promise<void> {
        return this.service.remove({ event_card_comment_id }, body);
    }
}
