import { User } from "./user.model";

export class Room {
    index?: number;
    id: string;
    code: string;
    title: string;
    description: string;
    constructor() { }
}

export interface CreateUpdateRoomPayload {
    code?: string;
    title: string;
    description: string;
}