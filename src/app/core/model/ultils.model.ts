export interface ResponseModel<T> {
    status: number;
    message: string;
    data: T;
}

export interface ResponseListModel<T> {
    status: number;
    message: string;
    data: {
        [key:string]: T;
        total: number | any;
    };
}

export interface SortPayload {
    sortKey: string;
    sortType : 'asc' | 'desc';
}