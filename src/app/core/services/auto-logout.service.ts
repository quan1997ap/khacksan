/**
 * Use in topbar component
 */

// https://www.section.io/engineering-education/auto-logout-angular/
import { AuthService } from './auth.service';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { SystemSettingService } from './system-setting.service';
@Injectable({
    providedIn: 'root'
})
export class AutoLogoutService {

    //log off details
    isLogin = false;
    logoutTime: number; // Millisecond

    constructor(
        private ngZone: NgZone,
        private authService: AuthService,
        private systemSettingService: SystemSettingService
    ) {
       const setting = this.systemSettingService.getSetting();
       if(setting){
        this.logoutTime = setting.webTimeout * 60000;
       }
    }
    
    init(){
        this.lastAction(Date.now());
        this.check();
        this.initListener();
        this.initInterval();
    }

    /**
     * last action
     */
    getLastAction(): any {
        return localStorage.getItem('lastAction');
    }

    /**
     * set last action
     * @param value
     */
    lastAction(value: any) {
        localStorage.setItem('lastAction', JSON.stringify(value))
    }

    /**
     * start event listener
     */
    initListener() {
        this.ngZone.runOutsideAngular(() => {
            document.body.addEventListener('click', () => this.reset());
        });
    }

    /**
     * time interval 
     * pass instance of service videocallService to check isCallCenter
     */
    initInterval() {
        this.ngZone.runOutsideAngular(() => {
            setInterval(() => {
                this.check();
            }, 10000);
        })
    }

    /**
     * reset timer
     */
    reset() {
        this.lastAction(Date.now());
    }

    /**
     * check timer
     */
    check() {
        if (this.isUserLoggedIn()) {
            this.isLogin = true;
        }
        const now = Date.now();
        const timeLeft = parseInt(this.getLastAction()) + this.logoutTime;
        const diff = timeLeft - now;
        const isTimeout = diff < 0;
        this.ngZone.run(() => {
            if (isTimeout && this.isLogin) {
                localStorage.removeItem('lastAction');
                console.log("Your Session Expired due to longer Inactivity, Login Again To Continue");
                this.authService.logout();
                document.location.reload();
            }
        });
    }

    /**
     *check if a user is logged in
     */
    isUserLoggedIn(): boolean {
        const currentUser = this.authService.currentAuthInfo;
        if (currentUser) {
          // logged in so return true
          return true;
        } 
        return false;
    }
}