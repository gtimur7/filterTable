export interface FilterItem {
  Column: any;
  Operator: any;
  Value: any;
}

export enum FilterOperator {
  LessThan,
  LessThanOrEqualTo,
  MoreThan,
  MoreThanOrEqualTo,
  Equal,
  NotEqual,
  Contains,
  DoesNotContain
}

export interface FilterOperatorItem {
  Operator: FilterOperator;
  Caption: string;
}