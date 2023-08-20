import { Pipe, PipeTransform } from '@angular/core';
// https://stackoverflow.com/questions/34164413/how-to-apply-filters-to-ngfor
@Pipe({
    name: 'filterPerms',
    pure: false
})
export class FilterPermsPipe implements PipeTransform {
    // filter by group = "App permissions"
    // filter by resource "Tin tức"
    transform(perms: any[], app: string, group: string, resource: string ): any {
        if (!perms || !app || !group || !resource) {
            return perms;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        return perms.filter(perm => perm.app == app &&  perm.group == group && perm.resource == resource);
    }
}