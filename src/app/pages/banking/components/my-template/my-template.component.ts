
import { MyTemplateService } from './my-template.service';
//  import { LocalDataSource } from 'ng2-smart-table';

import { Component, ViewContainerRef, OnInit, HostListener } from '@angular/core';
import { ReportResponse } from './../../../../models/api';
// import { AffiliateService } from './../services/affiliate.service'
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ConfigService } from './../../../../config.service'
import { Router } from '@angular/router'
import { Angular2Csv } from 'angular2-csv/angular2-csv';

import { DatePickerOptions, DateModel } from 'ng2-datepicker';
import { CheckboxInputs } from './../forms/components/inputs/components/checkboxInputs';

import { Localization, LocaleService, TranslationService } from 'angular-l10n';

// import 'style-loader!./smartTables.scss';

@Component({
  selector: 'my-template',
  templateUrl: './my-template.html',
})
export class MyTemplate extends Localization implements OnInit {


  date: DateModel;
  date2: DateModel;
  options: DatePickerOptions;
  options2: DatePickerOptions;


  loading: boolean = false;
  Showfutures: Boolean = false;

  today: number;
  pi: number;
  value: number;


  public checkboxModel = [{
    name: 'Show futures',
    checked: false,
    class: 'col-md-4'
  }, {
    name: 'Check 2',
    checked: true,
    class: 'col-md-4'
  }, {
    name: 'Check 3',
    checked: false,
    class: 'col-md-4'
  }];

  // isDisabled: boolean = false;

  public checkboxPropertiesMapping = {
    model: 'checked',
    value: 'name',
    label: 'name',
    baCheckboxClass: 'class'
  };
  ddlSports: string = 'NFL'
  ddlTransType: string = '-1'
  ddlCurrency: string = '1'

  public sports = [
    { value: 'NFL', display: 'NFL' },
    { value: 'MU', display: 'MU' },
    { value: 'MLB', display: 'MLB' },
    { value: 'CBB', display: 'CBB' },
    { value: 'CFB', display: 'CFB' },
    { value: 'PROP', display: 'PROP' },
    { value: 'CBB', display: 'CBB' },
    { value: 'NBA', display: 'NBA' },
    { value: 'SOC', display: 'SOC' },
    { value: 'TNT', display: 'TNT' },
    { value: 'NHL', display: 'NHL' },
    { value: 'ALL', display: 'ALL' }
  ];

  public currencies = [
    { value: '1', display: 'USD' },
    { value: '2', display: 'MXN' },
    { value: '3', display: 'GBP' },
    { value: '4', display: 'EUR' }
  ];

  public transactionTypes = [
    { value: '-1', display: 'All' },
    { value: '0', display: 'Sports' },
    { value: '1', display: 'Casino' },
    { value: '2', display: 'Racing' }
  ];

  response: any
  errorMessage: string



  constructor(/*private affiliateService: AffiliateService,*/
    public toastr: ToastsManager, private router: Router,
    public vcr: ViewContainerRef, public locale: LocaleService,
    public translation: TranslationService, private config: ConfigService) {
    super(locale, translation);
    this.options = new DatePickerOptions();
    this.options2 = new DatePickerOptions();

    let today = new Date();
    // let yyyy = today.getFullYear();
    // let mm = today.getMonth () + 1; 
    // let dd = today.getDate ();
    this.options.initialDate = new Date();// yyyy+'-'+mm+'-'+dd;
    this.options2.initialDate = new Date(new Date().getTime() - (60 * 60 * 24 * 7 * 1000));

    this.toastr.setRootViewContainerRef(vcr);

    this.today = Date.now();
    this.pi = 3.14159;
    this.value = Math.round(Math.random() * 1000000) / 100;

  }
  change() {
    this.value = Math.round(Math.random() * 1000000) / 100;
    console.log(this.locale);
  }

  selectLocale(language: string, country: string, currency: string): void {
    this.locale.setDefaultLocale(language, country);
    this.locale.setCurrentCurrency(currency);

  }


  ngOnInit() {
    // if (!this.auth.currentUser) {
    //   this.router.navigate(['/user/login']);
    // }

  }

  go() {
    this.response = null;
    this.loading = true;
    this.toastr.success('yeahhh', 'Success');
    console.log(this.config.currentUser);

    //  let startDate = this.dateModel2.beginDate.year + '-' + this.dateModel2.beginDate.month + '-' + this.dateModel2.beginDate.day;
    // let endDate = this.dateModel2.endDate.year + '-' + this.dateModel2.endDate.month + '-' + this.dateModel2.endDate.day;

    // let t0 = performance.now();
    // this.affiliateService.GetTest(this.auth.currentUser.id/*, this.dateModel.date.year + '-' + this.dateModel.date.month + '-' + this.dateModel.date.day*/)
    //   .subscribe(response => {
    //     this.response = response;
    //     this.loading = false;

    //     console.log(this.response);
    //     let t1 = performance.now();
    //     this.toastr.success('This query took ' + (t1 - t0) + ' milliseconds..', 'Success');
    //   },
    //   error => this.errorMessage = <any>error);
  }

  ExportToExcel() {
    console.log(this.response.CashFlowList);
    try {
      var options = {
        showLabels: true
      };
      var displayDate = '-D:' + new Date().toLocaleDateString() + 'T:' + new Date().toLocaleTimeString();

      new Angular2Csv(this.response.CashFlowList, 'WeeklyTransactions' + displayDate, options);
    } catch (error) {
      alert(error);
    }
  }

  // parceFrac(frac: string) {

  //   if (frac.includes("frac")) {

  //     if (frac.includes("&frac12;")) {
  //       return frac.replace("&frac12;", " 1/2 ");
  //     }
  //     else if (frac.includes("&frac13;")) {
  //       return frac.replace("&frac13;", " 1/3 ");
  //     }
  //     else if (frac.includes("&frac14;")) {
  //       return frac.replace("&frac14;", " 1/4 ");
  //     }
  //     else if (frac.includes("&frac15;")) {
  //       return frac.replace("&frac15;", " 1/5 ");
  //     }
  //     else if (frac.includes("&frac16;")) {
  //       return frac.replace("&frac16;", " 1/6 ");
  //     }
  //     else if (frac.includes("&frac17;")) {
  //       return frac.replace("&frac17;", " 1/7 ");
  //     }
  //     else if (frac.includes("&frac18;")) {
  //       return frac.replace("&frac18;", " 1/8 ");
  //     }
  //     else if (frac.includes("&frac19;")) {
  //       return frac.replace("&frac19;", " 1/9 ");
  //     }
  //     else
  //       return frac;

  //   } else
  //     return frac;
  // }



}  //end of class
