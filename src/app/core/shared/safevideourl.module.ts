import { NgModule } from '@angular/core';
import { SafePipe } from "./pipes/safevideourl.pipe";

@NgModule({
    imports: [
        // dep modules
    ],
    declarations: [
        SafePipe
    ],
    exports: [
        SafePipe
    ]
})
export class SafeUrlPipesModule { }