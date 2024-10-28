import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllCustomrsComponent } from './all-customrs.component';

const routes: Routes = [
  {
    path: '',
    component: AllCustomrsComponent,
    children: [
      {
        path: 'all_customers',
        component: AllCustomrsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllCustomrsRoutingModule { }
