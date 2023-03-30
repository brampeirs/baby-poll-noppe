import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import { IconComponent } from '../icon/icon.component';

@Component({
  standalone: true,
  imports: [CommonModule, IconComponent],
  selector: 'button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() icon: string | undefined;

  @HostBinding('class')
  get btnClass() {
    return this.icon ? 'icon-btn' : undefined;
  }
}
