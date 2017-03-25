import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { LocalizationModule } from 'angular-l10n';

// import { AuthService } from './profile.service'
// import { ConfigService } from './../../config.service' 


import { Profile } from './profile.component';
import { routing } from './profile.routing';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
    routing,
    LocalizationModule
  ],
  declarations: [
    Profile
  ],
  providers: [
    ]

})
export class ProfileModule { }
