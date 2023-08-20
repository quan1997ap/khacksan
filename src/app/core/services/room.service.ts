import { URLNoEncoder } from '../shared/angular/url-no-encode';
import { Injectable } from '@angular/core';
import { Observable, timeout } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { API_URL, EXPORT_TIMEOUT } from '../../../assets/configs/app.config';
import { ResponseListModel, ResponseModel, SortPayload } from '../model/ultils.model';
import { Room, CreateUpdateRoomPayload } from '../model/room.model';

@Injectable({
	providedIn: 'root'
})
export class RoomService {

	private roomUrl = `${API_URL}/rooms`;

	constructor(
		private http: HttpClient
	) { }
	
	getRooms(
		page: number | null,
		pageSize: number | null,
		filters?: Array<string> | null,
		sort?: SortPayload | null,
		isExport?: boolean
	): Observable<ResponseListModel<Room[]> | any> {

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
				`${this.roomUrl}/export`,
				{
					params: queryParams,
					responseType: 'blob' as 'json',
					observe: 'response',
					reportProgress: true
				})
				.pipe(timeout(EXPORT_TIMEOUT));
		} else {
			return this.http.get<ResponseListModel<Room[]>>(`${this.roomUrl}`, { params: queryParams });
		}
	}

	createRoom(automarketing: CreateUpdateRoomPayload): Observable<ResponseModel<Room>> {
		return this.http.post<ResponseModel<Room>>(this.roomUrl, automarketing);
	}

	updateRoom(id: string, automarketing: CreateUpdateRoomPayload): Observable<ResponseModel<Room>> {
		return this.http.put<ResponseModel<Room>>(`${this.roomUrl}/${id}`, automarketing);
	}

	removeRoom(id: string): Observable<ResponseModel<any>> {
		return this.http.delete<ResponseModel<any>>(`${this.roomUrl}/${id}`);
	}


}
