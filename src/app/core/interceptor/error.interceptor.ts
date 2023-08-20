import { AuthService } from './../services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { catchError, switchMap, map, tap } from 'rxjs/operators';
import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, empty, throwError, BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';

// https://www.bezkoder.com/angular-14-refresh-token/
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
	private isRefreshing = false;
	constructor(
		private translate: TranslateService, 
		private authService: AuthService) { }


	// add custom headers
	addHeaders(req: HttpRequest<any>): HttpRequest<any> {
		const headers = {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		};

		// encrytp body
		const requestBody = req.body;
		const reqHeaders = new HttpHeaders(headers);
		return req.clone({ headers: reqHeaders, withCredentials: true, url: req.url, body: requestBody });
	}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(req).pipe(
			catchError((err: HttpErrorResponse) => {
				switch (err.status) {
					case 0:
						const errorMessage = `Connect to server error`;
						return throwError(errorMessage);
					case 401:
						return this.handle401Error(req, next);
					default:
						return throwError(err);
				}
			}));
	}

	private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		if (!this.isRefreshing) {
			this.isRefreshing = true;

			const currentUser = this.authService.currentAuthInfo;
			if (currentUser) {
				return this.authService.refreshToken().pipe(
					switchMap(() => {
						this.isRefreshing = false;
						return next.handle(request);
					}),
					catchError((error) => {
						this.isRefreshing = false;
						this.authService.logout();
						return throwError(() => error);
					})
				);
			}
		}

		return next.handle(request);
	}

}
