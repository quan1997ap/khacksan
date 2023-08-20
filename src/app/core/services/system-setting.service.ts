import { NgxSpinnerService } from 'ngx-spinner';
import { tap, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_URL, UPLOAD_IMG_TYPES, AUTO_LOGOUT_TIME, ITEMS_PER_PAGE } from '../../../assets/configs/app.config';
import { MessageService } from './message.service';
import { CMSSetting, CommonSystemSetting, UpdateSystemSettingPayload } from '../model/system-setting.model';
import { AuthService } from './auth.service';


@Injectable({
	providedIn: 'root'
})
export class SystemSettingService {

	systemSettingUrl = `${API_URL}/system-settings`;
	private systemSetting: CMSSetting;
	constructor(
		private http: HttpClient,
		private messageService: MessageService,
		private authService: AuthService,
		private spinner: NgxSpinnerService
	) { }

	getSystemSettings(): Observable<CommonSystemSetting[]> {
		return this.http.get<any>(this.systemSettingUrl).pipe(map(res => res.data));
	}

	updateSetting(setting: UpdateSystemSettingPayload): Observable<any> {
		return this.http.put(this.systemSettingUrl, setting);
	}

	getSetting(): CMSSetting {
		return this.systemSetting;
	}

	setSetting(systemSetting: CMSSetting) {
		this.systemSetting = systemSetting;
	}

	getAndSetAppConfig(): Observable<CommonSystemSetting[] | undefined> {
		const currentUser = this.authService.currentAuthInfo;
		if (currentUser) {
			this.spinner.show();
			return this.getSystemSettings().pipe(
				tap( setting => {
					this.setSetting(this.getCMSSetting(setting));
					this.spinner.hide();
				}),
				catchError( e => {
					this.setSetting(this.getCMSSetting([]));
					this.messageService.showMessage('error', 'Cấu hình hệ thống', 'Lỗi khi lấy thông tin cấu hình hệ thống');
					this.spinner.hide();
					return of(undefined)
				})
			)
		} else {
			this.setSetting(this.getCMSSetting([]));
			return of(undefined);
		}
	}



	getCMSSetting( commonSystemSetting : CommonSystemSetting[]): CMSSetting{
		let systemSetting: CMSSetting = {
			webTimeout: AUTO_LOGOUT_TIME,
			pageSizes: ITEMS_PER_PAGE,
			uploadFileTypes: UPLOAD_IMG_TYPES
		}
		if(commonSystemSetting?.length){
			const webTimeout = commonSystemSetting.find( setting => setting.settingKey ===  "webTimeout" )?.settingValue;
			const pageSizes = commonSystemSetting.find( setting => setting.settingKey ===  "pageSizes" )?.settingValue;
			const uploadFileTypes = commonSystemSetting.find( setting => setting.settingKey ===  "uploadFileTypes" )?.settingValue;
			systemSetting = {
				webTimeout: webTimeout ? webTimeout :  AUTO_LOGOUT_TIME,
				pageSizes: pageSizes ? pageSizes :  ITEMS_PER_PAGE,
				uploadFileTypes:  uploadFileTypes ? uploadFileTypes : UPLOAD_IMG_TYPES
			}
		}
		return systemSetting;
	}
}
