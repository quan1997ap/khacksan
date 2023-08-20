import { AuthService } from './../services/auth.service';import { Observable ,  BehaviorSubject, throwError, empty } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent,
	HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent } from '@angular/common/http';
    @Injectable()
export class RequestInterceptor implements HttpInterceptor {
    private translate: TranslateService;
    urlsShouldNoteAddToken = []; // api of CALL-CENTER VNPT

    constructor(
        private injector: Injector,
        private authService: AuthService    
    ) {
    }
    // add custom headers
    addHeaders(req: HttpRequest<any>): HttpRequest<any> {
        const authInfo = this.authService.currentAuthInfo;
        return req.clone({ 
            setHeaders: {
                Authorization: `Bearer ${authInfo?.accessToken}`
            }
        });
    }


    // intercept requests
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse
                | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
        // check if url should encrypt or not
        let noAddToken = false;
        let newRequest;
        this.urlsShouldNoteAddToken.forEach( url => {
            if( req.url.includes(url) ) {
                noAddToken = true;
            }
        })
        if( !noAddToken ){
            newRequest = this.addHeaders(req);
        } else {
            newRequest = req; 
        }
        return next.handle(newRequest);
    }
}
