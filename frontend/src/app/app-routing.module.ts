import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { TableComponent } from './table/feature/table/table.component';

const routes: Routes = [
  { path: 'table', component: TableComponent },
  { path: '404', component: NotFoundComponent },
  { path: '', redirectTo: 'table', pathMatch: 'full' },
  { path: '**', redirectTo: '404', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
