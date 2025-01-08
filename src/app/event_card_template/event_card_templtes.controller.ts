import core from "@nestia/core";
import * as nest from "@nestjs/common";

import { notImpl } from "@/util/not_impl";

import { EventCardTemplatePaginatedDTO, EventCardTemplateSearchDTO } from "./event_card_template.dto";

@nest.Controller("event-card-templates")
export class EventCardTemplatesController {
    /**
     * 이벤트 카드 템플릿 목록 보기
     *
     * 이벤트 카드를 생성하기 위한 기본 템플릿 목록을 조회합니다.
     *
     * cursor기반 pagination이 적용되어 있습니다.
     *
     * @summary 이벤트 카드 템플릿 목록 보기
     * @tag event-card
     * @param query 검색 쿼리
     * @return 템플릿 목록
     */
    @core.TypedRoute.Get()
    async paginate(@core.TypedQuery() query: EventCardTemplateSearchDTO): Promise<EventCardTemplatePaginatedDTO> {
        query;
        return notImpl();
    }
}
