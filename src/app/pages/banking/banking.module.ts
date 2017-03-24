import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { routing } from './banking.routing';
import { Banking } from './banking.component';
import { MyTemplate } from './components/my-template/my-template.component';
import { MyTemplateService } from './components/my-template/my-template.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router'
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { LocalizationModule } from 'angular-l10n';
import { DatePickerModule } from 'ng2-datepicker';
import { DropdownModule, ModalModule } from 'ng2-bootstrap';
import { LoadingModule } from './../loading/loading.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing,
    ReactiveFormsModule,
    HttpModule,
    ToastModule.forRoot(),
    LocalizationModule,
    DatePickerModule,
    DropdownModule.forRoot(),
    ModalModule.forRoot(),
    LoadingModule
  ],
  declarations: [
    Banking,
    MyTemplate

  ],
  providers: [
    MyTemplateService,
    // ConfigService,

  ]
})
export class BankingModule {
}
