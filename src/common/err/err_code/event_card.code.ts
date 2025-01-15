import { Err } from "@/common/err/err";

export namespace EventCardErr {
    export interface NotFound extends Err.Body<"EVENT_CARD_NOT_FOUND"> {}
    export interface FileNotFound extends Err.Body<"EVENT_CARD_FILE_NOT_FOUND"> {}
    export interface FileTypeInvalid extends Err.Body<"EVENT_CARD_FILE_TYPE_INVALID"> {}
}
