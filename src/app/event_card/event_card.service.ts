import { isNull, isString } from "@fxts/core";
import * as nest from "@nestjs/common";

import { IAttachmentFileService } from "@/app/attachment_file/attachment_file.service.interface";
import { Err } from "@/common/err/err";
import { EventCardErr } from "@/common/err/err_code/event_card.code";
import { prisma } from "@/infrastructure/db";
import { Make } from "@/util/make";
import { Regex } from "@/util/type";

import { EventCardCreateOutputDTO, EventCardDTO, EventCardFileCreateOutputDTO } from "./event_card.dto";
import { EventCard } from "./event_card.model";
import { IEventCardService } from "./event_card.service.interface";

@nest.Injectable()
export class EventCardService implements IEventCardService {
    constructor(@nest.Inject(IAttachmentFileService.Token) private readonly fileService: IAttachmentFileService) {}

    async get(input: IEventCardService.GetInput): Promise<EventCard> {
        const card = await prisma().event_card.findFirst({
            where: { id: input.event_card_id, deleted_at: null },
            include: { thumbnail_image: { include: { attachment_file: true } } },
        });
        if (isNull(card)) throw new Err<EventCardErr.NotFound>({ code: "EVENT_CARD_NOT_FOUND" }, nest.HttpStatus.NOT_FOUND);
        return {
            id: card.id,
            template_key: card.template_key,
            thumbnail_image:
                card.thumbnail_image ?
                    {
                        type: "thumbnail_image",
                        id: card.thumbnail_image.id,
                        key: card.thumbnail_image.attachment_file.key,
                        name: card.thumbnail_image.attachment_file.name,
                        extension: card.thumbnail_image.attachment_file.extension,
                        created_at: card.thumbnail_image.attachment_file.created_at.toISOString(),
                    }
                :   null,
            title: card.title,
            password: card.password,
            address: card.address,
            address_detail: card.address_detail,
            invitation_message: card.invitation_message,
            event_started_at: card.event_started_at.toISOString(),
            event_ended_at: card.event_ended_at.toISOString(),
            created_at: card.created_at.toISOString(),
            updated_at: card.updated_at?.toISOString() ?? null,
        };
    }

    /** date to YYYY-MM-DD KST */
    toYYYYMMDD(date: Regex.DateTime): EventCardDTO["event_date"] {
        const kstDate = new Date(new Date(date).getTime() + 9 * 60 * 60 * 1000);
        const year = kstDate.getUTCFullYear();
        const month = (kstDate.getUTCMonth() + 1).toString().padStart(2, "0");
        const day = kstDate.getUTCDate().toString().padStart(2, "0");
        return `${year}-${month}-${day}`;
    }
    /** date to HH:mm:ss KST */
    toHHmmss(date: Regex.DateTime): EventCardDTO["event_start_time"] {
        const kstDate = new Date(new Date(date).getTime() + 9 * 60 * 60 * 1000);
        const hour = kstDate.getUTCHours().toString().padStart(2, "0");
        const min = kstDate.getUTCMinutes().toString().padStart(2, "0");
        const sec = kstDate.getUTCSeconds().toString().padStart(2, "0");
        return `${hour}:${min}:${sec}`;
    }

    toEventTime(
        input: Pick<EventCardDTO, "event_date" | "event_start_time" | "event_end_time">,
    ): Pick<EventCard, "event_started_at" | "event_ended_at"> {
        const [year, month, day] = input.event_date.split("-").map((str) => +str) as [number, number, number];
        const [s_hour, s_min, s_sec] = input.event_start_time.split(":").map((str) => +str) as [number, number, number];
        const [e_hour, e_min, e_sec] = input.event_start_time.split(":").map((str) => +str) as [number, number, number];
        const event_started_at = new Date(Date.UTC(year, month - 1, day, s_hour - 9, s_min, s_sec)).toISOString();
        const event_ended_at = new Date(Date.UTC(year, month - 1, day, e_hour - 9, e_min, e_sec)).toISOString();
        return { event_started_at, event_ended_at };
    }

    async getDTO(input: IEventCardService.GetInput): Promise<EventCardDTO> {
        const card = await this.get(input);
        return {
            ...card,
            thumbnail_image_url: card.thumbnail_image ? this.fileService.getUrl(card.thumbnail_image) : null,
            event_date: this.toYYYYMMDD(card.event_started_at),
            event_start_time: this.toHHmmss(card.event_started_at),
            event_end_time: this.toHHmmss(card.event_ended_at),
        };
    }

    async assertThumbnailImageId(input: Required<Pick<IEventCardService.CreateInput, "thumbnail_image_id">>): Promise<Regex.UUID> {
        const thumbnail_image = await prisma().event_card_file.findFirst({
            where: { id: input.thumbnail_image_id, deleted_at: null },
            include: { attachment_file: true },
        });
        if (thumbnail_image === null)
            throw new Err<EventCardErr.FileNotFound>({ code: "EVENT_CARD_FILE_NOT_FOUND" }, nest.HttpStatus.NOT_FOUND);
        if (thumbnail_image.type !== "thumbnail_image")
            throw new Err<EventCardErr.FileTypeInvalid>({ code: "EVENT_CARD_FILE_TYPE_INVALID" }, nest.HttpStatus.UNPROCESSABLE_ENTITY);
        return thumbnail_image.id;
    }

    async create(input: IEventCardService.CreateInput): Promise<EventCardCreateOutputDTO> {
        const thumbnail_image_id =
            isString(input.thumbnail_image_id) ? await this.assertThumbnailImageId({ thumbnail_image_id: input.thumbnail_image_id }) : null;
        const event_card_id = Make.uuid();
        await prisma().event_card.create({
            data: {
                id: event_card_id,
                template_key: input.template_key,
                thumbnail_image_id,
                password: input.password,
                title: input.title,
                address: input.address,
                address_detail: input.address_detail,
                invitation_message: input.invitation_message,
                ...this.toEventTime(input),
                created_at: new Date(),
                updated_at: null,
            },
        });
        return { event_card_id };
    }
    async createFile(input: IEventCardService.CreateFileInput): Promise<EventCardFileCreateOutputDTO> {
        const file = await this.fileService.create(input);
        await prisma().event_card_file.create({
            data: { id: file.attachment_file_id, type: input.type, created_at: new Date() },
        });
        const presigned_url = await this.fileService.preSign({ key: file.key, action: "put", duration: 60 * 3 /** 3min */ });
        return { event_card_file_id: file.attachment_file_id, presigned_url };
    }

    async remove(target: IEventCardService.GetInput, input: IEventCardService.RemoveInput): Promise<void> {
        const card = await this.get(target);
        if (card.password !== input.password)
            throw new Err<EventCardErr.PasswordInvalid>({ code: "EVENT_CARD_PASSWORD_INVALID" }, nest.HttpStatus.FORBIDDEN);
        await prisma().event_card.updateMany({ where: { id: target.event_card_id }, data: { deleted_at: new Date() } });
    }
}
