import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class responseUntil {
    @Field()
    code: string

    @Field()
    message: string

    constructor(code: string, message: string) {
        this.code = code;
        this.message = message;
    }
}