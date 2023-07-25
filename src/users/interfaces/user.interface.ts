import { Roles } from "../../core/enum";

export interface ReqUser {
    id: string,
    username: string,
    role: Roles,
    firstname: string,
    lastname: string
}