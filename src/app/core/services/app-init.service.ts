// https://www.tektutorialshub.com/angular/angular-how-to-use-app-initializer/
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { PERMISSIONS } from 'src/assets/configs/perm.config';
import { NgxPermissionsService } from 'ngx-permissions';

@Injectable()
export class AppInitService {
    constructor(
        private auth: AuthService,
        private permissionsService: NgxPermissionsService,
    ) {
    }

    init() {
        return new Promise<void>((resolve, reject) => {
            console.log("AppInitService.init() called");
            this.auth.getAndSetUserAuthInfo().subscribe({
                next: (data) => {
                    // TODO : Load perm here
                    this.loadALLPermissions();
                    resolve();
                },
                error: (e) => {
                    resolve();
                },
                complete: () => { resolve(); }
            });

        });
    }

    loadALLPermissions() {
        // https://www.npmjs.com/package/ngx-permissions#to-load-permissions-before-application-start-up
        const allPerm: string[] = [];
        Object.keys(PERMISSIONS).forEach((permCode: string, permissionIndex) => {
            if (permCode) {
                allPerm.push(permCode)
            }
        })
        this.permissionsService.loadPermissions(allPerm);
        var permissions = this.permissionsService.getPermissions();
        console.log(permissions)
    }

}
