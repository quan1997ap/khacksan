import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SystemSettingService } from "../services/system-setting.service";
import { CommonSystemSetting } from "../model/system-setting.model";

@Injectable()
export class AppConfigResolver implements Resolve<CommonSystemSetting[] | undefined> {
  constructor(
    private systemSettingService: SystemSettingService,
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.systemSettingService.getAndSetAppConfig();
  }
}