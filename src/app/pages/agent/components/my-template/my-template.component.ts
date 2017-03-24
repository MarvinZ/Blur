
import { MyTemplateService } from './my-template.service';
import { Component, ViewContainerRef, OnInit, HostListener } from '@angular/core';
import { ReportResponse } from './../../../../models/api';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ConfigService } from './../../../../config.service'
import { Router } from '@angular/router'
import { Angular2Csv } from 'angular2-csv/angular2-csv';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';
import { CheckboxInputs } from './../forms/components/inputs/components/checkboxInputs';
import { Localization, LocaleService, TranslationService } from 'angular-l10n';

@Component({
  selector: 'my-template',
  templateUrl: './my-template.html',
  styleUrls: ['./my-template.scss']
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
    { value: 'All', display: 'ALL' }
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

  constructor(private templateService: MyTemplateService,
    public toastr: ToastsManager, private router: Router,
    public vcr: ViewContainerRef, public locale: LocaleService,
    public translation: TranslationService, private config: ConfigService) {
    super(locale, translation);
    this.options = new DatePickerOptions();
    this.options2 = new DatePickerOptions();

    let today = new Date();
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
    if (!this.config.currentUser) {
      this.router.navigate(['/login']);
    }

  }

  go() {
    this.response = null;
    this.loading = true;

    let t0 = performance.now();
    this.templateService.GetWeeklyTransactions(this.config.currentUser.id, this.date.year + '-' + this.date.month + '-' + this.date.day)
      .subscribe(response => {
        this.response = response;
        this.loading = false;

        console.log(this.response);
        let t1 = performance.now();
        this.toastr.success('This query took ' + (t1 - t0) + ' milliseconds..', 'Success');
      },
      error => this.errorMessage = <any>error);
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


}  //end of class
