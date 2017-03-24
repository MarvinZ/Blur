import { Routes, RouterModule }  from '@angular/router';

import { Loading } from './loading.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: Loading
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
