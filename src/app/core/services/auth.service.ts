import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthModel, User } from './../model/user.model';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, Subscription, of } from 'rxjs';
import { map, catchError, finalize, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { API_URL } from '../../../assets/configs/app.config';
import { ResponseModel } from '../model/ultils.model';

export type TAuthInfo  = AuthModel | undefined;

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  // private fields
  authUrl = `${API_URL}/auth`;
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  public authLocalStorageToken = `${environment.appVersion}-auth`;

  // public fields
  isLoading$: Observable<boolean>;
  currentAuthSubject: BehaviorSubject<TAuthInfo >;
  isLoadingSubject: BehaviorSubject<boolean>;

  get currentAuthInfo(): TAuthInfo  {
    return this.currentAuthSubject.value;
  }

  set currentAuthInfo(user: TAuthInfo ) {
    this.currentAuthSubject.next(user);
  }

  constructor(
    private router: Router,
    private http: HttpClient,
    private spinner: NgxSpinnerService
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.currentAuthSubject = new BehaviorSubject<TAuthInfo >(undefined);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }


  login(username: string, password: string): Observable<TAuthInfo  | undefined> {
    this.isLoadingSubject.next(true);
    return this.http.post<ResponseModel<TAuthInfo >>(`${this.authUrl}/login`, {
      "username": username,
      "password": password
    }).pipe(
      map((res) => {
        // store + emit user logged in
        this.setAuthToLocalStorage(res.data);
        this.currentAuthSubject.next(res.data);
        return res.data;
      }),
      catchError((err) => {
        throw err.error.statusCode;
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  logout() {
    localStorage.removeItem(this.authLocalStorageToken);
    this.currentAuthSubject.next(null!);
    this.router.navigate(['/auth/login'], {
      queryParams: {},
    });
    this.spinner.hide();
    console.log('logout')
  }
  
  // TODO
  refreshToken() {
    return this.http.post<ResponseModel<TAuthInfo >>(`${this.authUrl}/refresh-token`, { }).pipe(
      map((res) => {
        // store + emit user logged in
        this.setAuthToLocalStorage(res.data);
        this.currentAuthSubject.next(res.data);
        return res.data;
      })
    );;
  }

  getAndSetUserAuthInfo(): Observable<TAuthInfo  | undefined>{
    const authInfo = this.getAuthFromLocalStorage();
    if (!authInfo) {
      this.logout();
      return of(undefined);
    }
    this.currentAuthSubject.next(authInfo);
    return of(authInfo);
  }

  private getAuthFromLocalStorage(): TAuthInfo  | undefined {
    try {
      const lsValue = localStorage.getItem(this.authLocalStorageToken);
      if (!lsValue) {
        return undefined;
      }
      const authData = JSON.parse(lsValue);
      return authData;
    } catch (error) {
      return undefined;
    }
  }

  // private methods
  private setAuthToLocalStorage(auth: TAuthInfo ) {
    // store auth authToken/refreshToken/epiresIn in local storage to keep user logged in between page refreshes
    localStorage.setItem(this.authLocalStorageToken, JSON.stringify(auth));
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
