import { Page } from "@/common/page";

import { EventCardComment } from "./event_card_comment.model";

export interface EventCardCommentDTO extends Pick<EventCardComment, "id" | "username" | "content" | "created_at" | "updated_at"> {}

export interface EventCardCommentCreateInputDTO extends Pick<EventCardComment, "event_card_id" | "username" | "content" | "password"> {}

export interface EventCardCommentCreateOutputDTO extends EventCardComment.Id {}

export interface EventCardCommentSearchDTO extends Page.Search {}
export interface EventCardCommentPaginatedDTO extends Page.Paginated<EventCardCommentDTO> {}

export interface EventCardCommentRemoveInputDTO extends Pick<EventCardComment, "password"> {}
