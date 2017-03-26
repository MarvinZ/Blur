import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { LocalizationModule } from 'angular-l10n';

// import { AuthService } from './settings.service'
// import { ConfigService } from './../../config.service' 


import { Settings } from './settings.component';
import { routing } from './settings.routing';


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
    Settings
  ],
  providers: [
    ]

})
export class SettingsModule { }
