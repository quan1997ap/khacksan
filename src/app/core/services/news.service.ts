import { URLNoEncoder } from '../shared/angular/url-no-encode';
import { Injectable } from '@angular/core';
import { Observable, timeout } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { API_URL, EXPORT_TIMEOUT } from '../../../assets/configs/app.config';
import { CreateUpdateNewsPayload, News } from '../model/news.model';
import { ResponseListModel, ResponseModel, SortPayload } from '../model/ultils.model';
@Injectable({
	providedIn: 'root'
})
export class NewsService {

	private newsUrl = `${API_URL}/news`;

	constructor(
		private http: HttpClient
	) { }
	
	getNews(
		page?: number,
		pageSize?: number,
		filters?: Array<string> | null,
		sort?: SortPayload | null,
		isExport?: boolean 
	): Observable<ResponseListModel<News[]> | any> {

		let queryParams = new HttpParams({ encoder: new URLNoEncoder() });
		if (page != null) { queryParams = queryParams.append('page', page) };
		if (pageSize != null) { queryParams = queryParams.append('pageSize', pageSize) };

		if (sort != null) {
			queryParams = queryParams.append('sortKey', `${sort.sortKey}`);
			queryParams = queryParams.append('sortType', `${sort.sortType}`);
		}

		// filter chỉ dùng được tối đa 2 key ( or )
		if (filters != null && filters?.length) {
			filters.forEach((searchKey: string) => {
				queryParams = queryParams.append('searchKey', searchKey);
			})
		};

		if(isExport){
			return this.http.get(
				`${this.newsUrl}/export`, 
				{ 
					params: queryParams ,
					responseType: 'blob' as 'json', 
					observe: 'response', 
					reportProgress: true
				})
				.pipe( timeout( EXPORT_TIMEOUT) );
		} else{
			return this.http.get<ResponseListModel<News[]>>(`${this.newsUrl}`, { params: queryParams });
		}
		
	}

	createNews(news: CreateUpdateNewsPayload): Observable<ResponseModel<News>> {
		return this.http.post<ResponseModel<News>>(this.newsUrl, news);
	}

	updateNews(id: string, news: CreateUpdateNewsPayload): Observable<ResponseModel<News>> {
		return this.http.put<ResponseModel<News>>(`${this.newsUrl}/${id}`, news);
	}

	removeNews(id: string): Observable<ResponseModel<any>> {
		return this.http.delete<ResponseModel<any>>(`${this.newsUrl}/${id}`);
	}


}
