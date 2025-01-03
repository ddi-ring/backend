export class Err<Body extends Err.Body<string>> extends Error {
    constructor(
        readonly body: Body,
        readonly status: number,
        ...cause: Error[]
    ) {
        super(body.code);
        if (cause.length > 0) super.cause = cause;
    }

    static is(input: unknown): input is Err<Err.Body<string>> {
        return input instanceof Err;
    }
}

export namespace Err {
    export interface Body<T extends string> {
        readonly code: T;
        readonly message?: string;
    }
    // export class Http<Body extends Err.Body<string>> extends Err<Body> {
    //     constructor(
    //         readonly status: number,
    //         body: Body,
    //         ...cause: Error[]
    //     ) {
    //         super(body, ...cause);
    //     }

    //     static override is(input: unknown): input is Err.Http<Err.Body<string>> {
    //         return input instanceof Err.Http;
    //     }
    // }
}
