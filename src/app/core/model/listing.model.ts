// https://stackoverflow.com/questions/30840596/how-to-do-dynamic-objects-in-typescript
interface ColumnModel{
    title?: string;
    key?: string; 
    sortKey?: string; // trường hợp key dùng sort != key trả về ở list. Chỉ dùng ở 1 số module
    sort?: any| 'asc' | 'desc' ; currentSort?: boolean;
    width?: string; // Ex:  160px 
    minWidth?: string;  // Ex:  160px 
    maxWidth?: string;  // Ex:  160px 
    tooltip?: string;
}
export interface TableColumnModel{
    [name:string]: ColumnModel;

    /*
     Ex:  
        'type.name': { title: 'Loại chi nhánh', key: 'type.name' },
        'type.name'  :   must same
        Object key   :  'type.name'  for get column display
        Key          :  'type.name'        for get data

    */
}


export class ResponseListing{
    count: number;      // item per page
    data: any[];        // page data
    page: number;       // current page : from 1
    pageCount: number;  // total page
    total: number;      // total page count
}

export interface Pagination{
    currentPage: number;
    pageSize: number;
    totalItems: number;
}