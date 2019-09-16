import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'replaceCurrencySymbol' })
export class replaceCurrencySymbol implements PipeTransform {
    transform(value: string): string {
        if (value) {
            return value.replace('GBP', '£'); // This should handle the case of multiple currencies for different countries
        }
    }
}