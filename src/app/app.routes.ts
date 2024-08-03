import { Routes } from '@angular/router';
import { CompanyComponent } from './pages/company/company.component';
import { UserComponent } from './pages/user/user.component';
import { SummaryComponent } from './pages/summary/summary.component';
import { SaveComponent } from './pages/save/save.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'company',
    pathMatch: 'full'
  },
  {
    path: 'company',
    component:CompanyComponent
  },
  {
    path: 'user',
    component:UserComponent
  },
  {
    path: 'summary',
    component:SummaryComponent
  },
  {
    path: 'save',
    component:SaveComponent
  }
];
