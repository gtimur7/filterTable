import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from 'src/app/core/configuration.service';
import { MainDataService } from 'src/app/core/main-data.service';
import { FilterItem, FilterOperatorItem } from 'src/app/models/filter';
import { HeaderData, TableData } from 'src/app/models/table';

@Component({
  selector: 'app-filtered-table',
  templateUrl: './filtered-table.component.html',
  styleUrls: ['./filtered-table.component.scss']
})
export class FilteredTableComponent implements OnInit {
  items: TableData;
  filter: FilterItem[] = [];
  columns: HeaderData[] = [];
  operators: FilterOperatorItem[] = [];

  constructor(private mainService: MainDataService,
    private configService: ConfigurationService) { }

  ngOnInit(): void {
    this.getData(this.filter);
    this.columns = this.configService.getColumns();
    this.operators = this.configService.getOperators();
  }

  getData(filter: FilterItem[]) {
    this.mainService.getTableData(filter).then(data => {
      console.log(data);
      this.items = data;
    });
  }
}
