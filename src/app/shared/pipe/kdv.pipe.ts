import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'kdv'
})

export class KdvPipe implements PipeTransform {

    transform(value: number, args?: number): any {
        let kdv = 18;
        if (args) {
            kdv = args;
        }
        return value + ((value / 100) * kdv);
    }

}