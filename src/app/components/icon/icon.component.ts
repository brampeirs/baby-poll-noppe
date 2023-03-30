import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
// https://stackoverflow.com/questions/53066823/how-do-i-import-svg-from-file-to-a-component-in-angular-5
@Component({
  selector: 'bp-icon',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
})
export class IconComponent {
  constructor(
    private httpClient: HttpClient,
    private sanitizer: DomSanitizer,
    private changeDetectorRef: ChangeDetectorRef
  ) {}
  @Input() set name(value: string | undefined) {
    if (value) {
      this.#injectSvgIcon(value);
    }
  }

  #injectSvgIcon(name: string) {
    this.httpClient
      .get(`assets/svg/${name}.svg`, { responseType: 'text' })
      .subscribe((value) => {
        console.log('test', value);
        this.svgIcon = this.sanitizer.bypassSecurityTrustHtml(value);
        this.changeDetectorRef.detectChanges();
      });
  }

  public svgIcon: any;
}
