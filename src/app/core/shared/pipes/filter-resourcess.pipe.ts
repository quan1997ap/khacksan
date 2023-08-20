import { Pipe, PipeTransform } from '@angular/core';
// https://stackoverflow.com/questions/34164413/how-to-apply-filters-to-ngfor
@Pipe({
    name: 'filterResource',
    pure: false
})
export class FilterResourcesPipe implements PipeTransform {
    // filter by group = "App permissions"
    // filter by resource "Tin tức"
    transform(resources: any[], group: string ): any {
        if (!resources || !group) {
            return resources;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        return resources.filter(resource => resource.group == group);
    }
}