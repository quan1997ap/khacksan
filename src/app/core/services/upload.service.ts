import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { API_URL } from '../../../assets/configs/app.config';
@Injectable({
    providedIn: 'root'
})
export class UploadService {

    private uploadImageUrl = `${API_URL}/storage/upload`;

    constructor(
        private http: HttpClient
    ) { }

    uploadImage(file: File): Observable<HttpEvent<any>> {
        const formData: FormData = new FormData();
        formData.append('file', file);
        const req = new HttpRequest('POST', `${this.uploadImageUrl}`, formData, {
            reportProgress: true,
            responseType: 'json',
        });
        return this.http.request(req);
    }
}
