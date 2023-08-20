import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
/**
 * set width for fixed table pagination
 */
@Injectable()
export class SidebarService {

    private sidebarStatus = new Subject<boolean>();

    constructor() { }

    public getSidebarStatus(): Observable<boolean> {
        return this.sidebarStatus.asObservable();
    }

    public setSidebarStatus(status: boolean) {
        return this.sidebarStatus.next(status);
    }

    public checkSidebarExpand(){
        const sidebar: any =  document.getElementById('kt_aside_toggle');
        const isSidebarExpand = sidebar?.classList.contains('active') == false  ? true : false ;
        this.setSidebarStatus(isSidebarExpand);
    }

}