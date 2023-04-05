import { registerLocaleData } from '@angular/common';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import localeNl from '@angular/common/locales/nl-BE';
registerLocaleData(localeNl);
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'nl-BE',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
