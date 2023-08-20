import { User } from "./user.model";

export class CommonSystemSetting {
    index?: number;
    id: string;
    settingKey: "uploadFileTypes" | "pageSizes" | "appTimeout" | "webTimeout" ;
    settingValue: string | string[] | any;

    updatedAt?: number;
    updatedBy?: string; updatedUser?: User;
    
    createdAt?: number; createdUser?: User;
    createdBy?: string;

    constructor() { }
}

export interface UpdateSystemSettingPayload {
    settingKey: string;
    settingValue: string | string[] | any;
}

export class CMSSetting{
    webTimeout: number;
    uploadFileTypes: string[];
    pageSizes: number[];
}