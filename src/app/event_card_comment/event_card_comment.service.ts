import { isNull } from "@fxts/core";
import * as nest from "@nestjs/common";

import { IEventCardService } from "@/app/event_card/event_card.service.interface";
import { Err } from "@/common/err/err";
import { EventCardCommentErr } from "@/common/err/err_code/event_card_comment.code";
import { prisma } from "@/infrastructure/db";
import { Make } from "@/util/make";

import {
    EventCardCommentCreateInputDTO,
    EventCardCommentCreateOutputDTO,
    EventCardCommentDTO,
    EventCardCommentPaginatedDTO,
    EventCardCommentRemoveInputDTO,
    EventCardCommentSearchDTO,
} from "./event_card_comment.dto";
import { EventCardComment } from "./event_card_comment.model";
import { IEventCardCommentService } from "./event_card_comment_service.interface";

@nest.Injectable()
export class EventCardCommentService implements IEventCardCommentService {
    constructor(@nest.Inject(IEventCardService.Token) private readonly eventCardService: IEventCardService) {}

    async get(input: EventCardComment.Id): Promise<EventCardComment> {
        const comment = await prisma().event_card_comment.findFirst({
            where: { id: input.event_card_comment_id, deleted_at: null },
        });
        if (isNull(comment))
            throw new Err<EventCardCommentErr.NotFound>({ code: "EVENT_CARD_COMMENT_NOT_FOUND" }, nest.HttpStatus.NOT_FOUND);
        return {
            ...comment,
            created_at: comment.created_at.toISOString(),
            updated_at: comment.updated_at?.toISOString() ?? null,
        };
    }

    async paginate(input: EventCardCommentSearchDTO): Promise<EventCardCommentPaginatedDTO> {
        const size = input.size ?? 1;
        const list = await prisma().event_card_comment.findMany({
            where: { event_card_id: input.event_card_id, deleted_at: null },
            orderBy: [{ created_at: "asc" }, { id: "desc" }],
            ...(input.last_id ? { cursor: { id: input.last_id } } : {}),
            take: size + 2,
        });
        const next = list.length === size + 2;
        const _list = input.last_id ? list.slice(1, 1 + size) : list.slice(0, size);
        return {
            list: _list.map(
                (item): EventCardCommentDTO => ({
                    id: item.id,
                    username: item.username,
                    content: item.content,
                    created_at: item.created_at.toISOString(),
                    updated_at: item.updated_at?.toISOString() ?? null,
                }),
            ),
            next,
        };
    }
    async create(input: EventCardCommentCreateInputDTO): Promise<EventCardCommentCreateOutputDTO> {
        const card = await this.eventCardService.get(input);
        const event_card_comment_id = Make.uuid();
        await prisma().event_card_comment.create({
            data: {
                id: event_card_comment_id,
                event_card_id: card.id,
                username: input.username,
                content: input.content,
                password: input.password,
                created_at: new Date(),
            },
        });
        return { event_card_comment_id };
    }
    async remove(target: EventCardComment.Id, input: EventCardCommentRemoveInputDTO): Promise<void> {
        const comment = await this.get(target);
        if (comment.password !== input.password)
            throw new Err<EventCardCommentErr.PasswordInvalid>({ code: "EVENT_CARD_COMMENT_PASSWORD_INVALID" }, nest.HttpStatus.FORBIDDEN);
        await prisma().event_card_comment.updateMany({
            where: { id: comment.id, deleted_at: null },
            data: { deleted_at: new Date() },
        });
    }
}
