import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter'
})

export class FilterPipe implements PipeTransform {
    transform(value: any[], prop: string, filteredText?: string): any {
        if (!value) { return value; }
        if (!filteredText) { return value; }

        const filter = filteredText.toLocaleLowerCase();
        return value.filter(product => product[prop]?.toLocaleLowerCase().indexOf(filter) !== -1);
    }
}