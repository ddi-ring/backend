import { Regex } from "@/util/type";

import {
    EventCardCreateInputDTO,
    EventCardCreateOutputDTO,
    EventCardDTO,
    EventCardFileCreateInputDTO,
    EventCardFileCreateOutputDTO,
} from "./event_card.dto";
import { EventCard } from "./event_card.model";

export interface IEventCardService {
    readonly get: (target: IEventCardService.GetInput) => Promise<EventCardDTO>;
    readonly create: (input: IEventCardService.CreateInput) => Promise<EventCardCreateOutputDTO>;
    readonly createFile: (input: IEventCardService.CreateFileInput) => Promise<EventCardFileCreateOutputDTO>;
    readonly remove: (target: IEventCardService.GetInput, input: IEventCardService.RemoveInput) => Promise<void>;
}

export namespace IEventCardService {
    export const Token = Symbol("EventCardServce");
    export interface GetInput {
        event_card_id: Regex.UUID;
    }
    export interface CreateInput extends EventCardCreateInputDTO {}
    export interface CreateFileInput extends EventCardFileCreateInputDTO {}

    export interface RemoveInput extends Pick<EventCard, "password"> {}
}
