import { Roles } from "../../core/enum";

export interface ReqUser {
    id: number,
    username: string,
    role: Roles,
    firstname: string,
    lastname: string
}