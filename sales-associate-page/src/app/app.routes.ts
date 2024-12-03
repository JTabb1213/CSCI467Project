import { Routes } from '@angular/router';
import { SalesQuotesComponent } from './sales-quotes/sales-quotes.component';
import { RunQuotesComponent } from './components/run-quotes/run-quotes.component';
import { LoginComponent } from './components/auth/login/login.component';
import { EditComponent } from './components/edit/edit.component';
import { FinalizeComponent } from './components/finalize/finalize.component';
import { FinalizedQuotesComponent } from './finalized-quotes/finalized-quotes.component';

export const routes: Routes = [
    // App routes
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
        path: 'finalize',
        component: FinalizeComponent,
    },
    {
        path: 'finalized-quotes', // Add the finalized-quotes route
        component: FinalizedQuotesComponent,
    },
];
