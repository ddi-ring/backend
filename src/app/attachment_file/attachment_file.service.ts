import * as s3 from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { isNull } from "@fxts/core";
import * as nest from "@nestjs/common";

import { Err } from "@/common/err/err";
import { AttachmentFileErr } from "@/common/err/err_code/attachment_file.code";
import { config } from "@/infrastructure/config";
import { prisma } from "@/infrastructure/db";
import { Make } from "@/util/make";
import { OmitKeyof, Regex } from "@/util/type";

import { AttachmentFileCreateOutputDTO } from "./attachment_file.dto";
import { AttachmentFile } from "./attachment_file.model";
import { IAttachmentFileService } from "./attachment_file.service.interface";

@nest.Injectable()
export class AttachmentFileService implements IAttachmentFileService {
    async get(input: IAttachmentFileService.GetInput): Promise<OmitKeyof<AttachmentFile<string>, "type">> {
        const file = await prisma().attachment_file.findFirst({ where: { id: input.attachment_file_id, deleted_at: null } });
        if (isNull(file)) throw new Err<AttachmentFileErr.NotFound>({ code: "ATTACHMENT_FILE_NOT_FOUND" }, nest.HttpStatus.NOT_FOUND);
        return {
            id: file.id,
            key: file.key,
            name: file.name,
            extension: file.extension,
            created_at: file.created_at.toISOString(),
        };
    }
    async create(input: IAttachmentFileService.CreateInput): Promise<AttachmentFileCreateOutputDTO> {
        const attachment_file_id = Make.uuid();
        const extension = input.extension.replaceAll(/[^a-zA-Z0-9]/g, "").toLowerCase();
        const key = `${input.type}s/${attachment_file_id}.${extension}`;
        await prisma().attachment_file.create({
            data: { id: attachment_file_id, name: input.name, extension, key, created_at: new Date() },
        });
        return { attachment_file_id, key };
    }
    async preSign(input: IAttachmentFileService.PreSignInput): Promise<Regex.URI> {
        const Bucket = config("BUCKET");
        const Key = input.key;
        const _url = new URL(
            await getSignedUrl(
                new s3.S3Client(),
                input.action === "get" ?
                    new s3.GetObjectCommand({ Bucket, Key, ResponseContentDisposition: "inline" })
                :   new s3.PutObjectCommand({ Bucket, Key }),
                { expiresIn: input.duration },
            ),
        );
        _url.hostname = config("RESOURCE_DOMAIN");
        return _url.toString();
    }

    getUrl(input: IAttachmentFileService.GetUrlInput): Regex.URI {
        return `https://${config("RESOURCE_DOMAIN")}/${input.key}`;
    }
}
