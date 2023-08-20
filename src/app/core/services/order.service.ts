import { URLNoEncoder } from '../shared/angular/url-no-encode';
import { Injectable } from '@angular/core';
import { Observable, timeout } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { API_URL, EXPORT_TIMEOUT } from '../../../assets/configs/app.config';
import { ResponseListModel, ResponseModel, SortPayload } from '../model/ultils.model';
import { Order, CreateUpdateOrderPayload } from '../model/order.model';

@Injectable({
	providedIn: 'root'
})
export class OrderService {

	private orderUrl = `${API_URL}/orders`;

	constructor(
		private http: HttpClient
	) { }
	
	getOrders(
		page: number | null,
		pageSize: number | null,
		filters?: Array<string> | null,
		sort?: SortPayload | null,
		isExport?: boolean
	): Observable<ResponseListModel<Order[]> | any> {

		let queryParams = new HttpParams({ encoder: new URLNoEncoder() });
		if (page != null) { queryParams = queryParams.append('page', page) };
		if (pageSize != null) { queryParams = queryParams.append('pageSize', pageSize) };

		if (sort != null) {
			queryParams = queryParams.append('sortKey', `${sort.sortKey}`);
			queryParams = queryParams.append('sortType', `${sort.sortType}`);
		}

		// Filter chỉ dùng được tối đa 2 key ( or )
		if (filters != null && filters?.length) {
			filters.forEach((searchKey: string) => {
				queryParams = queryParams.append('searchKey', searchKey);
			})
		};

		if (isExport) {
			return this.http.get(
				`${this.orderUrl}/export`,
				{
					params: queryParams,
					responseType: 'blob' as 'json',
					observe: 'response',
					reportProgress: true
				})
				.pipe(timeout(EXPORT_TIMEOUT));
		} else {
			return this.http.get<ResponseListModel<Order[]>>(`${this.orderUrl}`, { params: queryParams });
		}
	}

	createOrder(automarketing: CreateUpdateOrderPayload): Observable<ResponseModel<Order>> {
		return this.http.post<ResponseModel<Order>>(this.orderUrl, automarketing);
	}

	updateOrder(id: string, automarketing: CreateUpdateOrderPayload): Observable<ResponseModel<Order>> {
		return this.http.put<ResponseModel<Order>>(`${this.orderUrl}/${id}`, automarketing);
	}

	removeOrder(id: string): Observable<ResponseModel<any>> {
		return this.http.delete<ResponseModel<any>>(`${this.orderUrl}/${id}`);
	}


}
