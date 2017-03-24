import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

// import { AuthService } from './login.service'
// import { ConfigService } from './../../config.service' 


import { Loading } from './loading.component';
import { routing } from './loading.routing';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
    routing
  ],
  declarations: [
    Loading
  ],
  providers: [
    ],
  exports: [Loading]

})
export class LoadingModule { }
