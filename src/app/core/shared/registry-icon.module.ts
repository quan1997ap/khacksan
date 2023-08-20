import { DomSanitizer } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
class IconModel {
  iconName: string;
  svgFileName: string;
}

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [  
    MatIconModule
  ]
})

export class RegistryIconModule {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
    ){
    let icons: IconModel[] = [
      {iconName: "cb_filter", svgFileName : "filter.svg"},
      {iconName: "cb_export", svgFileName : "export.svg"},
      {iconName: "cb_search", svgFileName : "search.svg"},
      {iconName: "cb_edit", svgFileName : "edit.svg"},
      {iconName: "cb_view", svgFileName : "view.svg"},
      {iconName: "cb_trash", svgFileName : "trash.svg"},
      {iconName: "cb_date", svgFileName : "date.svg"}
    ]

    icons.forEach( (icon: IconModel) => {
      this.matIconRegistry.addSvgIcon(
        icon.iconName,
        this.domSanitizer.bypassSecurityTrustResourceUrl(`../../../assets/media/registry-svg-icon/${icon.svgFileName}`)
      );
    })
  }
}
