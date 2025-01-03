import core from "@nestia/core";
import * as nest from "@nestjs/common";
import { Request } from "express";

import { UserErr } from "@/common/err/err_code/user.code";
import { notImpl } from "@/util/not_impl";
import { Regex } from "@/util/type";

@nest.Controller("users")
export class UsersController {
    /**
     * 사용자 정보를 불러옵니다.
     *
     * @summary 사용자 정보 보기
     * @tag User
     * @param user_id user id
     * @return 사용자 정보
     */
    @core.TypedException<UserErr.NotFound>({ status: nest.HttpStatus.NOT_FOUND })
    @core.TypedRoute.Get(":user_id")
    async profile(@nest.Request() req: Request, @core.TypedParam("user_id") user_id: Regex.UUID): Promise<void> {
        req;
        user_id;
        return notImpl();
    }
}
