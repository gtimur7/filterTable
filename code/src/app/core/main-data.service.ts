import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { BodyColumnData, BodyData, HeaderData, TableData } from '../models/table';
import { FilterItem, FilterOperator } from '../models/filter';
import { ConfigurationService } from './configuration.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MainDataService {
  constructor(private http: HttpClient, private configService: ConfigurationService) { }

  getTableData(filter: FilterItem[]): Observable<TableData> {
    return this.http.get(environment.pathToData + this.buildFilterString(filter)).pipe(
      map(value => this.converData(value, filter)),
    );
  }

  private buildFilterString(filter: FilterItem[]): string {
    const result = filter.map((item, index) => {
      item.Column
      return `column[${index}]=${item.Column}&operator[${index}]=${item.Operator}&value[${index}]=${item.Value}`;
    }).join('&')
    return '?' + result;
  }

  private converData(value, filterObject: FilterItem[]) {
    const values = Object.values(value)
    const filtered = this.filterData(values, filterObject);
    const limitedData = filtered; //.slice(0, 10);

    const columns = this.configService.getColumns();
    const bodyValue = limitedData.map(bodyItem => {
      const body: BodyData = { Columns: [] };
      columns.forEach(column => {
        const columnName = column.Name;
        let columnValue;
        if (bodyItem.hasOwnProperty(column.Name)) {
          columnValue = bodyItem[column.Name];
        }
        const bf: BodyColumnData = {
          ColumnName: columnName,
          Value: columnValue
        }
        body.Columns.push(bf);
      })
      return body;
    });
    const tableData: TableData = {
      Header: columns,
      Body: bodyValue

    };
    return tableData
  }

  filterData(data: any[], filterObject: FilterItem[]) {
    filterObject.forEach(filterItem => {
      console.log(filterItem)
      const filterValue = String(filterItem.Value).toLowerCase();
      switch (Number(filterItem.Operator)) {
        case FilterOperator.Equal:
          data = data.filter(item => String(item[filterItem.Column]).toLowerCase() == filterValue);
          break;
        case FilterOperator.NotEqual:
          data = data.filter(item => String(item[filterItem.Column]).toLowerCase() != filterValue);
          break;
        case FilterOperator.Contains:
          data = data.filter(item => String(item[filterItem.Column]).toLowerCase().indexOf(filterValue) > -1);
          break;
      }
    });
    return data;
  }
}
