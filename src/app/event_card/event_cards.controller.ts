import core from "@nestia/core";
import * as nest from "@nestjs/common";

import { notImpl } from "@/util/not_impl";
import { Regex } from "@/util/type";

import {
    EventCardCreateInputDTO,
    EventCardCreateOutputDTO,
    EventCardDTO,
    EventCardFileCreateInputDTO,
    EventCardFileCreateOutputDTO,
} from "./event_card.dto";

@nest.Controller("event-cards")
export class EventCardsController {
    /**
     * 이벤트 카드 정보를 보여줍니다.
     *
     * @summary 이벤트 카드 조회
     * @tag event-card
     * @param event_card_id 카드 id
     * @return 이벤트 카드 정보
     */
    @core.TypedRoute.Get(":event_card_id")
    async get(@core.TypedParam("event_card_id") event_card_id: Regex.UUID): Promise<EventCardDTO> {
        event_card_id;
        return notImpl();
    }

    /**
     * 이벤트 카들르 생성합니다.
     *
     * @summary 이벤트 카드 생성
     * @tag event-card
     * @param body 카드 생성 정보
     * @return 카드 id
     */
    @core.TypedRoute.Post()
    async create(@core.TypedBody() body: EventCardCreateInputDTO): Promise<EventCardCreateOutputDTO> {
        body;
        return notImpl();
    }
}

@nest.Controller("event-card-files")
export class EventCardsFileController {
    /**
     * 이벤트 카드 관련하여 업로드에 필요한 파일 정보를 생성합니다.
     *
     * 응답으로 얻은 presigned url을 사용해서 실제 리소스를 업로드할 수 있습니다.
     *
     * @summary 이벤트 카드 첨부파일 생성
     * @tag event-card
     * @param body 카드 첨부파일 정보
     * @return 파일 업로드 url 및 id
     */
    @core.TypedRoute.Post()
    async create(@core.TypedBody() body: EventCardFileCreateInputDTO): Promise<EventCardFileCreateOutputDTO> {
        body;
        return notImpl();
    }
}
