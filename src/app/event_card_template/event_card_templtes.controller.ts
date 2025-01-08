import core from "@nestia/core";
import * as nest from "@nestjs/common";

import { notImpl } from "@/util/not_impl";
import { Regex } from "@/util/type";

import { EventCardTemplateDTO, EventCardTemplatePaginatedDTO, EventCardTemplateSearchDTO } from "./event_card_template.dto";

@nest.Controller("event-card-templates")
export class EventCardTemplatesController {
    /**
     * 이벤트 카드 템플릿 목록 보기
     *
     * 이벤트 카드를 생성하기 위한 기본 템플릿 목록을 조회합니다.
     *
     * cursor기반 pagination이 적용되어 있습니다.
     *
     * @summary 이벤트 카드 템플릿 목록 조회
     * @tag event-card
     * @param query 검색 쿼리
     * @return 템플릿 목록
     */
    @core.TypedRoute.Get()
    async paginate(@core.TypedQuery() query: EventCardTemplateSearchDTO): Promise<EventCardTemplatePaginatedDTO> {
        query;
        return notImpl();
    }

    /**
     * 이벤트 카드 템플릿 보기
     *
     * 이벤트 카드를 생성하기 위한 템플릿 정보를 조회합니다.
     *
     * @summary 이벤트 카드 템플릿 목록 조회
     * @tag event-card
     * @param template_id 템플릿 id
     * @return 템플릿 정보
     */
    @core.TypedRoute.Get(":template_id")
    async get(@core.TypedParam("template_id") template_id: Regex.UUID): Promise<EventCardTemplateDTO> {
        template_id;
        return notImpl();
    }
}
