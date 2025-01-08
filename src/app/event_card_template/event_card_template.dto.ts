import { Page } from "@/common/page";
import { Regex } from "@/util/type";

import { EventCardTemplate } from "./event_card_template.model";

export interface EventCardTemplateSearchDTO extends Page.Search {}

export interface EventCardTemplateDTO extends Pick<EventCardTemplate, "id" | "title" | "created_at"> {
    thumbnail_image_url: Regex.URI;
}

export interface EventCardTemplatePaginatedDTO extends Page.Paginated<EventCardTemplateDTO> {}

// 관리자용
export interface EventCardTemplateCreateInputDTO extends Pick<EventCardTemplate, "title"> {
    thumbnail_image_id: Regex.UUID;
}

export interface EventCardTemplateCreateOutputDTO extends EventCardTemplate.Id {}
