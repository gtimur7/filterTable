export interface HeaderData {
  Name: string;
  Caption: string;
}
export interface BodyColumnData {
  ColumnName: string;
  Value: any;
}

export interface BodyData {
  Columns: BodyColumnData[];
}

export interface TableData {
  Header: HeaderData[];
  Body: BodyData[];
}
