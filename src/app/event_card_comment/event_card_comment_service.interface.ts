import {
    EventCardCommentCreateInputDTO,
    EventCardCommentCreateOutputDTO,
    EventCardCommentPaginatedDTO,
    EventCardCommentRemoveInputDTO,
    EventCardCommentSearchDTO,
} from "./event_card_comment.dto";
import { EventCardComment } from "./event_card_comment.model";

export interface IEventCardCommentService {
    readonly get: (input: EventCardComment.Id) => Promise<EventCardComment>;
    readonly paginate: (input: EventCardCommentSearchDTO) => Promise<EventCardCommentPaginatedDTO>;
    readonly create: (input: EventCardCommentCreateInputDTO) => Promise<EventCardCommentCreateOutputDTO>;
    readonly remove: (target: EventCardComment.Id, input: EventCardCommentRemoveInputDTO) => Promise<void>;
}

export namespace IEventCardCommentService {
    export const Token = Symbol("EventCardCommentService");
}
