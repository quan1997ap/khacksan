// https://dev.to/zhiyueyi/create-a-simple-breadcrumb-in-angular-ag5
import { ChangeDetectorRef, Input } from '@angular/core';
import { Component, OnInit } from "@angular/core";
import {
  ActivatedRoute,
  Router,
  NavigationEnd,
} from "@angular/router";
import { filter } from "rxjs/operators";

@Component({
  selector: 'vcs-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {
  @Input() type = 'long-wrap'; // 'long', 'long-wrap', 'truncation';
  @Input() separateCharacter = '/'; // '/', ',', '.';

  collapsed = true;
  breadcrumbConfigs: Breadcrumb[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.breadcrumbConfigs = this.buildBreadCrumb(this.activatedRoute.root);
    this.cd.detectChanges();
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
        this.breadcrumbConfigs = this.buildBreadCrumb(this.activatedRoute.root);
        window.scrollTo(0, 0);
        this.cd.detectChanges();
      });
  }


  buildBreadCrumb(route: ActivatedRoute, url: string = '', breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {

    let sliceChar = '//';
    //If no routeConfig is avalailable we are on the root path
    let breadcrumbConfigs = route.routeConfig && route.routeConfig.data ? route.routeConfig.data.breadcrumb : '';
    let path = route.routeConfig && route.routeConfig.data ? route.routeConfig.path : '';

    // If the route is dynamic route such as ':id', remove it and exchange with data from params
    if (breadcrumbConfigs && breadcrumbConfigs.length) {
      breadcrumbConfigs = breadcrumbConfigs.map((breadCrumb: Breadcrumb) => {
        const breadCrumbLabelSplits = breadCrumb.label.split(sliceChar);
        const breadCrumbWithLabelMappingVal: string[] = breadCrumbLabelSplits.map(label => {
          if (label.charAt(0) === ':') {
            const labelMappingParam = route.snapshot.params[label.slice(1, label.length)];
            label = labelMappingParam ? labelMappingParam : label;
          }
          return label;
        });
        return {
          label: breadCrumbWithLabelMappingVal.join(''),
          url: breadCrumb.url,
          icon: breadCrumb.icon,
        };
      });
    }

    //In the routeConfig the complete path is not available,
    //so we rebuild it each time
    const nextUrl = path ? `${url}/${path}` : url;

    // Only adding route with non-empty label
    const newBreadcrumbs = breadcrumbConfigs ? breadcrumbs.concat(breadcrumbConfigs) : breadcrumbs;
    if (route.firstChild) {
      //If we are not on our current path yet,
      //there will be more children to look after, to build our breadcumb
      return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }
    if (newBreadcrumbs) {
      return newBreadcrumbs;
    } else {
      return [];
    }
  }


  toggleCollapseBreadcrumb(){
    this.collapsed = !this.collapsed;
  }
}

export interface Breadcrumb {
  label: string;
  url: string;
  icon: string;
}
