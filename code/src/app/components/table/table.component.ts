import { Component, Input, OnInit } from '@angular/core';
import { TableData } from 'src/app/models/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() items: TableData;
  constructor() { }

  ngOnInit(): void {
  }

}
