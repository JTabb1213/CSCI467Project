import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesQuotesComponent } from './sales-quotes.component';
import { RunQuotesComponent } from '../components/run-quotes/run-quotes.component';

const routes: Routes = [
  {
    path: '',//
    component: SalesQuotesComponent,
    children: [
      {
        path: 'sales-quotes',
        component: RunQuotesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesQuotesRoutingModule { }
