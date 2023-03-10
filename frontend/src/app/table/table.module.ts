import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './feature/table/table.component';
import { SharedModule } from '../shared/shared.module';
import { AlphanumericDirective } from '../shared/directives/alphanumeric.directive';

@NgModule({
  declarations: [TableComponent],
  imports: [CommonModule,   SharedModule, AlphanumericDirective],
})
export class TableModule {}
