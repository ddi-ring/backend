import { Regex } from "@/util/type";

import {
    EventCardCreateInputDTO,
    EventCardCreateOutputDTO,
    EventCardDTO,
    EventCardFileCreateInputDTO,
    EventCardFileCreateOutputDTO,
} from "./event_card.dto";

export interface IEventCardService {
    readonly get: (input: IEventCardService.GetInput) => Promise<EventCardDTO>;
    readonly create: (input: IEventCardService.CreateInput) => Promise<EventCardCreateOutputDTO>;
    readonly createFile: (input: IEventCardService.CreateFileInput) => Promise<EventCardFileCreateOutputDTO>;
    readonly remove: (input: IEventCardService.GetInput) => Promise<void>;
}

export namespace IEventCardService {
    export const Token = Symbol("EventCardServce");
    export interface GetInput {
        event_card_id: Regex.UUID;
    }
    export interface CreateInput extends EventCardCreateInputDTO {}
    export interface CreateFileInput extends EventCardFileCreateInputDTO {}
}
