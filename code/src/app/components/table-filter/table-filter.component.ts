import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FilterItem, FilterOperatorItem } from 'src/app/models/filter';
import { HeaderData } from 'src/app/models/table';

@Component({
  selector: 'app-table-filter',
  templateUrl: './table-filter.component.html',
  styleUrls: ['./table-filter.component.scss']
})
export class TableFilterComponent implements OnInit {
  @Input() columns: HeaderData[] = [];
  @Input() operators: FilterOperatorItem[] = [];
  @Input() filter: FilterItem[] = [];

  @Output() startFilter = new EventEmitter<FilterItem[]>();
  filterForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.filterForm = this.fb.group({
      FilterItems: this.fb.array([
        this.getFilterItemFormGroup()
      ])
    });
  }

  getFilterItemFormGroup(): FormGroup {
    return this.fb.group({
      Column: ['', [Validators.required]],
      Operator: ['', [Validators.required]],
      Value: ['', [Validators.required]]
    });
  }

  get filterItems(): FormArray {
    return this.filterForm.get('FilterItems') as FormArray;
  }

  addFilterItem(): void {
    this.filterItems.push(this.getFilterItemFormGroup());
  }

  removeFilterItem(index: number): void {
    this.filterItems.removeAt(index);
  }

  filterData(): void {
    if (this.filterForm.valid) {
      this.startFilter.emit(this.filterForm.value.FilterItems as FilterItem[]);
    }
  }
}
