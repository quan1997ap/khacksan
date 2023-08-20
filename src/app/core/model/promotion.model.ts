export class Promotion {
    index?: number;
    id: string;
    code: string;
    title: string;
    description: string;
    constructor() { }
}

export interface CreateUpdatePromotionPayload {
    code?: string;
    title: string;
    description: string;
}