import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService, TAuthInfo } from "../services/auth.service";

@Injectable()
export class PermResolver implements Resolve<TAuthInfo | undefined> {
  constructor(private auth: AuthService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.auth.getAndSetUserAuthInfo()
  }
}