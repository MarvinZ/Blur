import { Component } from '@angular/core';
import { Localization, LocaleService, TranslationService } from 'angular-l10n';


import './ckeditor.loader';
import 'ckeditor';
import 'style-loader!./ckeditor.scss';

@Component({
  selector: 'ckeditor-component',
  templateUrl: './ckeditor.html',
})

export class Ckeditor extends Localization{
  public ckeditorContent:string = '<p>Hello CKEditor</p>';
  public config = {
    uiColor: '#F0F3F4',
    height: '600',
  };

  constructor(public locale: LocaleService,
    public translation: TranslationService) {
                super(locale, translation);

  }
}
