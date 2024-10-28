import { Routes } from '@angular/router';
import { HomepageLayoutComponent } from './layouts/homepage-layout/homepage-layout.component';
import { AllCustomersLayoutComponent } from './layouts/all-customers-layout/all-customers-layout.component';

export const routes: Routes = [
    // App routes
    {
        path: '',
        component: HomepageLayoutComponent,
        children: [
            {
                path: '',
                redirectTo: '/homepage',
                pathMatch: 'full'
            },
            {
                path: 'homepage',
                loadChildren: () => import('./homep/homep.module').then(module => module.HomepModule)
            }
        ]
    },

    // All customers routes
    {
        path: '',
        component: AllCustomersLayoutComponent,
        children: [
            {
                path: '',
                redirectTo: '/all-customers',
                pathMatch: 'full'
            },
            {
                path: 'all-customers',
                loadChildren: () => import('./all-customrs/all-customrs.module').then(m => m.AllCustomrsModule)
            }
        ]
    }

];
