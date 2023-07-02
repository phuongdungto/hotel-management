import { Roles } from "../enum";

export interface ReqUser {
    id: string,
    role: Roles,
    username: string
}