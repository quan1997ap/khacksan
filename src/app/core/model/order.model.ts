import { User } from "./user.model";

export class Order {
    index?: number;
    id: string;
    code: string;
    title: string;
    description: string;
    constructor() { }
}

export interface CreateUpdateOrderPayload {
    code?: string;
    title: string;
    description: string;
}