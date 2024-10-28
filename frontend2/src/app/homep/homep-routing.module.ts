import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepComponent } from './homep.component';

const routes: Routes = [
  {
    path: '',
    component: HomepComponent,
    children: [
      {
        path: 'home',
        component: HomepComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomepRoutingModule { }
