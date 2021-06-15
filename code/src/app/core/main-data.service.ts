import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BodyColumnData, BodyData, TableData } from '../models/table';
import { FilterItem, FilterOperator } from '../models/filter';
import { ConfigurationService } from './configuration.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MainDataService {
  cache: any;
  constructor(private http: HttpClient, private configService: ConfigurationService) { }

  getTableData(filterObject: FilterItem[]): Promise<TableData> {
    const getData = new Promise((resolve, reject) => {
      let queryPath = environment.pathToData;
      if (!environment.filterOnClient) {
        queryPath += this.buildFilterString(filterObject);
      }
      if (this.cache && environment.filterOnClient) {
        resolve(this.cache);
      } else {
        this.http.get(queryPath).subscribe(data => {
          this.cache = data;
          resolve(this.cache);
        });
      }
    });

    return getData
      .then(obj => new Promise((resolve, reject) => {
        const values = Object.values(obj);
        const filtered = environment.filterOnClient ? this.filterData(values, filterObject) : values;
        resolve(filtered);
      }))
      .then((filtered: any[]) => new Promise((resolve, reject) => {
        const converted = this.convertData(filtered);
        resolve(converted);
      }));
  }

  private buildFilterString(filter: FilterItem[]): string {
    const result = filter.map((item, index) => {
      return `column[${index}]=${item.Column}&operator[${index}]=${item.Operator}&value[${index}]=${item.Value}`;
    }).join('&');
    return '?' + result;
  }

  private convertData(values: any[]): TableData {
    const columns = this.configService.getColumns();
    const bodyValue = values.map(bodyItem => {
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
        };
        body.Columns.push(bf);
      });
      return body;
    });
    const tableData: TableData = {
      Header: columns,
      Body: bodyValue
    };
    return tableData;
  }

  filterData<T>(data: T[], filterObject: FilterItem[]): T[] {
    filterObject.forEach(filterItem => {
      const filterValue = String(filterItem.Value).toLowerCase();
      switch (Number(filterItem.Operator)) {
        case FilterOperator.Equal:
          data = data.filter(item => String(item[filterItem.Column]).toLowerCase() === filterValue);
          break;
        case FilterOperator.NotEqual:
          data = data.filter(item => String(item[filterItem.Column]).toLowerCase() !== filterValue);
          break;
        case FilterOperator.Contains:
          data = data.filter(item => String(item[filterItem.Column]).toLowerCase().indexOf(filterValue) > -1);
          break;
      }
    });
    return data;
  }
}
