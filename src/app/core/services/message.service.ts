import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})

export class MessageService {
    constructor(
        private toastr: ToastrService
    ) {

    }
    showMessage(type: 'error' | 'info' | 'success' | 'warning' | string, summary: string, detail: string) {
        switch (type) {
            case 'error':
                this.toastr.error(detail, summary);
                break;
            case 'info':
                this.toastr.info(detail, summary);
                break;
            case 'success':
                this.toastr.success(detail, summary);
                break;
            case 'warning':
                this.toastr.warning(detail, summary);
                break;
            default:
                this.toastr.success(detail, summary);
                break;
        }
    }

    clearAll(){
        this.toastr.clear();
    }

}
