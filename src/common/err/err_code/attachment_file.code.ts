import { Err } from "@/common/err/err";

export namespace AttachmentFileErr {
    export type NotFound = Err.Body<"ATTACHMENT_FILE_NOT_FOUND">;
}
