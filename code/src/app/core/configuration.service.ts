import { Injectable } from '@angular/core';
import { FilterOperator, FilterOperatorItem } from '../models/filter';
import { HeaderData } from '../models/table';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  constructor() { }

  getColumns(): HeaderData[] {
    const columns: HeaderData[] = [
      { Name: 'id', Caption: 'ID' },
      { Name: 'additional', Caption: 'Additional' },
      { Name: 'category', Caption: 'Category' },
      { Name: 'color', Caption: 'Color' },
      { Name: 'gtin', Caption: 'GTIN' },
      { Name: 'product_name', Caption: 'Product Name' }
    ];
    return columns;
  }

  getOperators(): FilterOperatorItem[] {
    const operators: FilterOperatorItem[] = [
      { Operator: FilterOperator.Contains, Caption: 'Contains' },
      { Operator: FilterOperator.Equal, Caption: 'Equals' },
      { Operator: FilterOperator.DoesNotContain, Caption: 'Does Not Contain' },
    ];
    return operators;
  }
}
