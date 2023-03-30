import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'bp-card-field',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './card-field.component.html',
  styleUrls: ['./card-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardFieldComponent {
  @Input() gender: 'male' | 'female' = 'male';
  @Input() label: string | undefined;
  @Input() text: string | undefined | null;
  @Input() icon: string | undefined;

  get iconBackground() {
    return this.gender === 'male'
      ? { background: 'var(--blue)' }
      : { background: 'var(--pink)' };
  }
}
