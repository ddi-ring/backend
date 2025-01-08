import { Page } from "@/common/page";
import { Regex } from "@/util/type";

import { EventCardTemplate } from "./event_card_template.interface";

export interface EventCardTemplateSearchDTO extends Page.Search {}

export interface EventCardTemplateDTO extends Pick<EventCardTemplate, "id" | "title" | "created_at"> {
    thumb_nail_image_url: Regex.URI;
}

export interface EventCardTemplatePaginatedDTO extends Page.Paginated<EventCardTemplateDTO> {}
