import { Routes } from '@angular/router';
import { SalesQuotesComponent } from './sales-quotes/sales-quotes.component';
import { RunQuotesComponent } from './components/run-quotes/run-quotes.component';
import { LoginComponent } from './components/auth/login/login.component';
import { EditComponent } from './components/edit/edit.component';
import { FinalizeComponent } from './components/finalize/finalize.component';
import { FinalizedQuotesComponent } from './finalized-quotes/finalized-quotes.component';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';
import { Login2Component } from './login2/login2.component';
import { Login3Component } from './login3/login3.component';
import { Login4Component } from './login4/login4.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AdminComponent } from './admin/admin.component';

// defines all routes for our front end app. when url at top is changes to /'route', the corresponding component will be rendered
export const routes: Routes = [
  {
    path: '',
    component: SalesQuotesComponent,
  },
  {
    path: 'sales-quotes',
    component: RunQuotesComponent,
  },
  {
    path: 'auth',
    component: LoginComponent,
  },
  {
    path: 'edit',
    component: EditComponent,
  },
  {
    path: 'finalized-quotes',
    component: Login3Component,
  },
  {
    path: 'finalized-quotes2',
    component: FinalizedQuotesComponent,
  },
  {
    path: 'purchase-order',
    component: PurchaseOrderComponent,
  },
  {
    path: 'purchase',
    component: Login2Component,
  },
  {
    path: 'admin',
    component: Login4Component,
  },
  {
    path: 'admin-page',
    component: AdminComponent,
  },

];
