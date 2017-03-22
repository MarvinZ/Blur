import { Component, HostListener } from '@angular/core';

import { GlobalState } from '../../../global.state';

import { Localization, LocaleService, TranslationService } from 'angular-l10n';
import { ConfigService } from '../../../config.service'


import 'style-loader!./baPageTop.scss';

@Component({
  selector: 'ba-page-top',
  templateUrl: './baPageTop.html',
})
export class BaPageTop extends Localization {

  public isScrolled: boolean = false;
  public isMenuCollapsed: boolean = false;

  today: number;



  languages: any =
  [
    { "name": "United States", "countryCode": "US", "language": "en", "currency": "USD" },
    { "name": "United Kingdom", "countryCode": "GB", "language": "en", "currency": "GBP" },
    { "name": "Italia", "countryCode": "IT", "language": "it", "currency": "EUR" }];

  ddlCountries: string = 'United States'

  constructor(private _state: GlobalState, public locale: LocaleService, private config: ConfigService,
    public translation: TranslationService) {
    super(locale, translation);

    this.ddlCountries = this.languages.find(x => x.countryCode === this.locale.getCurrentCountry()).name;
    this.today = Date.now();


    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });
  }


  changeLanguage(country: string) {
    let selectedcountry = this.languages.find(x => x.name === country);
    // console.log(selectedcountry.callingCode[0]);
    this.selectLocale(selectedcountry.language, selectedcountry.countryCode, selectedcountry.currency);
  }
  selectLocale(language: string, country: string, currency: string): void {
    this.locale.setDefaultLocale(language, country);
    this.locale.setCurrentCurrency(currency);
    console.log(this.locale.getCurrentLanguage());

  }
  public toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    return false;
  }

  logUser() {
    alert('vea el log!');
    console.log(this.config);
  }
  public scrolledChanged(isScrolled) {
    this.isScrolled = isScrolled;
  }
}
