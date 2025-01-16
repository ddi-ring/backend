import { Err } from "../err";

export namespace EventCardCommentErr {
    export type NotFound = Err.Body<"EVENT_CARD_COMMENT_NOT_FOUND">;
    export type PasswordInvalid = Err.Body<"EVENT_CARD_COMMENT_PASSWORD_INVALID">;
}
