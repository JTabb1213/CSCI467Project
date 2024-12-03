import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesQuotesComponent } from './sales-quotes.component';
import { RunQuotesComponent } from '../components/run-quotes/run-quotes.component';
import { FinalizedQuotesComponent } from '../finalized-quotes/finalized-quotes.component'; // Import FinalizedQuotesComponent

const routes: Routes = [
  {
    path: '',
    component: SalesQuotesComponent,
    children: [
      {
        path: 'sales-quotes',
        component: RunQuotesComponent,
      },
      {
        path: 'finalized-quotes', // Add finalized-quotes as a child route
        component: FinalizedQuotesComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalesQuotesRoutingModule {}
