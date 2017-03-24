import { Routes, RouterModule }  from '@angular/router';

import { Agent } from './agent.component';
// import { BasicTables } from './components/basicTables/basicTables.component';
// import { SmartTables } from './components/smartTables/smartTables.component';
  import { MyTemplate } from './components/my-template/my-template.component';


// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Agent,
    children: [
       { path: 'template', component: MyTemplate },
      // { path: 'smarttables', component: SmartTables }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
