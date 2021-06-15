import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilteredTableComponent } from './filtered-table/filtered-table.component';

const routes: Routes = [
  {
    path: '',
    component: FilteredTableComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
