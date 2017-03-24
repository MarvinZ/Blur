import { Component } from '@angular/core';
import { Localization, LocaleService, TranslationService } from 'angular-l10n';


@Component({
  selector: 'agent',
  template: `<router-outlet></router-outlet>`
})
export class Agent extends Localization {

  constructor(public locale: LocaleService, public translation: TranslationService) {
    super(locale, translation);

  }
}
