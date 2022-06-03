import { NgModule } from '@angular/core';
import { FilterPipe } from './filter.pipe';
import { KdvPipe } from './kdv.pipe';

@NgModule({
    declarations: [
        KdvPipe,
        FilterPipe
    ],
    imports: [],
    exports: [
        KdvPipe,
        FilterPipe
    ]
})
export class PipeModule { }
