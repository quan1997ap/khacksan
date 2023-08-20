import { User } from "./user.model";

//  Permission setting
export class Permission {
    index?: number;
    id: string;
    code: string;
    name: string;
    description: string;
    type: number;
    group: string;
    resource: string;
    route: string;
    createdAt: number;
    updatedAt: number;
    app: string;
    selected?: boolean;
}

export interface PermGroup {
    groupName: string;
    isExpand?: boolean;
}

export interface Resource {
    group: string;
    resource: string;
    selectedAll?: boolean;
}

export interface PermissionsSetting {
    [key: string]: {
        groups: string[];
        permGroups?: PermGroup[];
        permissions: Permission[];
        resources: Resource[];
    }
}


export interface CreateUpdatePermissionGroupPayload {
    name: string;
    description: string;
    type: 1 | 2; // 1: CMS; 2: APP
    applyType: 1 | 2; // 1: Cấp bậc; 2: user
    departmentIds: string[];
    positionIds: string[];
    branchIds: string[];
    status: 1 | 2; // 1: active; 2: deactive
    permissionIds: string[];
}


// PermissionsGroup setting
export class PermissionsGroup {
    index?: number;
    id: string;
    name: string;
    description: string;
    type: 1 | 2; // 1: CMS; 2: APP
    applyType: 1 | 2; // 1: Cấp bậc; 2: user
    departmentIds: string[];
    positionIds: string[];
    branchIds: string[];
    status: 1 | 2; // 1: active; 2: deactive
    permissionIds: string[];

    updatedAt?: number;
    updatedBy?: string; updatedUser?: User;
    
    createdAt?: number; createdUser?: User;
    createdBy?: string;

}