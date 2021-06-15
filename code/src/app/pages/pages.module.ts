import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { FilteredTableComponent } from './filtered-table/filtered-table.component';
import { ComponentsModule } from '../components/components.module';
import { CoreModule } from '../core/core.module';


@NgModule({
  declarations: [FilteredTableComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ComponentsModule,
    CoreModule
  ]
})
export class PagesModule { }
