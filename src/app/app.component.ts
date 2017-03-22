import { Component, ViewContainerRef } from '@angular/core';

import { GlobalState } from './global.state';
import { BaImageLoaderService, BaThemePreloader, BaThemeSpinner } from './theme/services';
import { BaThemeConfig } from './theme/theme.config';
import { layoutPaths } from './theme/theme.constants';

import { Localization, LocaleService, TranslationService } from 'angular-l10n';


import 'style-loader!./app.scss';
import 'style-loader!./theme/initial.scss';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  template: `
    <main [ngClass]="{'menu-collapsed': isMenuCollapsed}" baThemeRun>
      <div class="additional-bg"></div>
           
      <router-outlet></router-outlet>

    </main>
  `
})
export class App extends Localization {

  isMenuCollapsed: boolean = false;

  constructor(private _state: GlobalState,
    private _imageLoader: BaImageLoaderService,
    private _spinner: BaThemeSpinner,
    private viewContainerRef: ViewContainerRef,
    private themeConfig: BaThemeConfig,
    public locale: LocaleService, public translation: TranslationService) {
    super(locale, translation);
    
    
    this.locale.AddConfiguration()
      .AddLanguages(['en', 'it'])
      .SetCookieExpiration(30)
      .DefineDefaultLocale('en', 'US')
      .DefineCurrency('USD');
    this.locale.init();

    this.translation.AddConfiguration()
      .AddProvider('./assets/locale-');
    this.translation.init();


    themeConfig.config();

    this._loadImages();

    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });
  }

  public ngAfterViewInit(): void {
    // hide spinner once all loaders are completed
    BaThemePreloader.load().then((values) => {
      this._spinner.hide();
    });
  }

  private _loadImages(): void {
    // register some loaders
    BaThemePreloader.registerLoader(this._imageLoader.load(layoutPaths.images.root + 'sky-bg.jpg'));
  }

}
