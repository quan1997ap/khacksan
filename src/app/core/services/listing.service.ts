import { TableColumnModel } from './../model/listing.model';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class ListingService {
	constructor() {

	}

    public getColumnName(columns: TableColumnModel): string[]{
        // return columns.map( (column:TableColumnModel) => column.key);
        return Object.keys(columns)
    }

}
