import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routing } from './pages.routing';
import { NgaModule } from '../theme/nga.module';

import { Pages } from './pages.component';

import { LocalizationModule } from 'angular-l10n';



// import { ConfigService } from './../config.service'


@NgModule({
  imports: [CommonModule, NgaModule, routing,
    LocalizationModule
  ],
  declarations: [Pages],
  providers: [
    // ConfigService
    ]
})
export class PagesModule {
}
