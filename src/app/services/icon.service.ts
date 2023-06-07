import { Injectable, inject } from '@angular/core';
import { Observable, map, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
// https://stackoverflow.com/questions/53066823/how-do-i-import-svg-from-file-to-a-component-in-angular-5
import { ICON_REGISTER } from './icon.register';
@Injectable({
  providedIn: 'root',
})
export class IconService {
  private httpClient = inject(HttpClient);

  private _cachedIcons = new Map<string, string>();

  setCachedIcon(svgName: string, svg: string): void {
    this._cachedIcons.set(svgName, svg);
  }

  getSvgIcon(svgName: string): Observable<string> {
    const cachedIcon = this._cachedIcons.get(svgName);
    if (cachedIcon) {
      return of(cachedIcon);
    }

    return this._loadSvgIconFromConfig(svgName).pipe(
      tap((svg) => this.setCachedIcon(svgName, svg)),
      map((svg) => svg)
    );
  }
  private _loadSvgIconFromConfig(svgName: string): Observable<string> {
    return this.httpClient.get(`assets/svg/${svgName}.svg`, {
      responseType: 'text',
    });
  }

  constructor() {
    this._setCachedIcons();
  }

  private _setCachedIcons() {
    this.setCachedIcon('arrow_back', ICON_REGISTER.arrowBack);
    this.setCachedIcon('calendar_month', ICON_REGISTER.calendarMonth);
    this.setCachedIcon('close', ICON_REGISTER.close);
    this.setCachedIcon('edit', ICON_REGISTER.edit);
    this.setCachedIcon('female', ICON_REGISTER.female);
    this.setCachedIcon('male', ICON_REGISTER.male);
    this.setCachedIcon('straighten', ICON_REGISTER.straighten);
    this.setCachedIcon('weight', ICON_REGISTER.weight);
  }
}
