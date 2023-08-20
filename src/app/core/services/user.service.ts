import { User } from './../model/user.model';
import { URLNoEncoder } from '../shared/angular/url-no-encode';
import { ResponseListing } from '../model/listing.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { API_URL } from '../../../assets/configs/app.config';

@Injectable({
	providedIn: 'root'
})
export class UsersService {

	userUrl = `${API_URL}/users`;

	constructor(
		private http: HttpClient
	) { }

	getUsers( 
		limit: number, 
		offset: number, 
		sort?: { [keyName:string]: 'ASC' | 'DESC' } | null,
		search?: any | null ,
		): Observable<ResponseListing> {
		/**
		  Convert sort = {id: 'ASC' }   =>  ?sort=name,ASC  |  ?sort=name,ASC&sort=id,DESC
		  Ex filter = [ [ 'isVillain', '$eq', false ], [ 'join', '$eq', true ]   ]
		 */
		let queryParams = new HttpParams( {encoder: new URLNoEncoder() } );
		
		// if (limit != null) { queryParams = queryParams.append('limit', limit) };
		// if (offset != null) { queryParams = queryParams.append('offset', offset) };

		if (sort != null && Object.keys(sort)?.length ){
			Object.keys(sort).forEach((sortByKey: string ) => {
				queryParams = queryParams.append( 'sort', `${sortByKey},${sort[sortByKey]}`);
			});
		}

		if (search != null ) { 
			queryParams = queryParams.append('s', JSON.stringify(search));
		};

		let userUrl = `${this.userUrl}`;
		userUrl += `?join=roles`;
		return this.http.get<ResponseListing>( userUrl, { params: queryParams });
	}

	updateUser(user: User) {
		return this.http.patch(`${this.userUrl}/${user.id}`, user);
	}

	createUser(user: User) {
		const accountInfo = JSON.parse(JSON.stringify(user));
		delete accountInfo.id;
		return this.http.post(`${this.userUrl}`, accountInfo);
	}

	
	removeUser(userId: string| any){
		return this.http.delete(`${this.userUrl}/${userId}`);
	}

}
