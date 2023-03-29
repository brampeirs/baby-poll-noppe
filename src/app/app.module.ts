import { registerLocaleData } from '@angular/common';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonComponent } from './components/button/button.component';
import { CardComponent } from './components/card/card.component';
import localeNl from '@angular/common/locales/nl-BE';
registerLocaleData(localeNl);
@NgModule({
  declarations: [AppComponent],
  imports: [ButtonComponent, BrowserModule, AppRoutingModule, CardComponent],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'nl-BE',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
