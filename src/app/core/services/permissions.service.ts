import { CreateUpdatePermissionGroupPayload, PermGroup, PermissionsGroup } from './../model/permissions.model';
import { URLNoEncoder } from '../shared/angular/url-no-encode';
import { ResponseListing } from '../model/listing.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { API_URL } from '../../../assets/configs/app.config';
import { ResponseListModel, SortPayload } from '../model/ultils.model';

@Injectable({
	providedIn: 'root'
})
export class PermissionsService {

	permissionsUrl = `${API_URL}/permissions`;
	rolesUrl = `${API_URL}/roles`;
	permissionGroupsUrl = `${API_URL}/permission-groups`;

	constructor(
		private http: HttpClient
	) {}


	// Permission ------------------------------------------------------------------------------

	getPermissions( ): Observable<any> {
		return this.http.get<ResponseListing>(this.permissionsUrl);
	}

	createPermissionGroup(payload : CreateUpdatePermissionGroupPayload ){
		return this.http.post(this.permissionGroupsUrl, payload);
	}

	updatePermissionGroup( groupId: string, payload : CreateUpdatePermissionGroupPayload ){
		return this.http.patch(`${this.permissionGroupsUrl}/${groupId}`, groupId);
	}

	removePermissionGroup(permissionId: string | any ){
		return this.http.delete(`${this.permissionGroupsUrl}/${permissionId}`);
	}
	
	getPermissionGroups(
		page: number,
		pageSize: number,
		filters?: Array<string> | null,
		sort?: SortPayload | null,
	): Observable<ResponseListModel<PermissionsGroup[]>> {

		let queryParams = new HttpParams({ encoder: new URLNoEncoder() });
		if (page != null) { queryParams = queryParams.append('page', page) };
		if (pageSize != null) { queryParams = queryParams.append('pageSize', pageSize) };

		// if (sort != null) {
		// 	queryParams = queryParams.append('sortKey', `${sort.sortKey}`);
		// 	queryParams = queryParams.append('sortType', `${sort.sortType}`);
		// }

		// Filter chỉ dùng được tối đa 2 key ( or )
		if (filters != null && filters?.length) {
			filters.forEach((searchKey: string) => {
				queryParams = queryParams.append('searchKey', searchKey);
			})
		};

		return this.http.get<ResponseListModel<PermissionsGroup[]>>(`${this.permissionGroupsUrl}`, { params: queryParams });
	}

	
}
