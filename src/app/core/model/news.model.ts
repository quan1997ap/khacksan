import { User } from "./user.model";

export class News {
    index?: number;
    id: string;
    avatar: string; homeAvatar: string;
    description: string;
    detail: string;
    status: number;
    title: string;

    updatedAt?: number;
    updatedBy?: string; updatedUser?: User;
    
    createdAt?: number; createdUser?: User;
    createdBy?: string;

    constructor() { }
}

export interface CreateUpdateNewsPayload {
    title: string;
    description: string;
    detail: string;
    avatar: string; homeAvatar: string;
    status: number; // 1: active; 2: inactive
}