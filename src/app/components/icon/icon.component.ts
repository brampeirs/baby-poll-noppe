import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { IconService } from 'src/app/services/icon.service';
import { take } from 'rxjs';
@Component({
  selector: 'bp-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  constructor(
    private iconService: IconService,
    private sanitizer: DomSanitizer,
    private changeDetectorRef: ChangeDetectorRef
  ) {}
  @Input() set name(value: string | undefined) {
    if (value) {
      this.#injectSvgIcon(value);
    }
  }

  #injectSvgIcon(name: string) {
    this.iconService
      .getSvgIcon(name)
      .pipe(take(1))
      .subscribe((value) => {
        this.svgIcon = this.sanitizer.bypassSecurityTrustHtml(value);
        this.changeDetectorRef.markForCheck();
      });
  }

  public svgIcon: any;
}
