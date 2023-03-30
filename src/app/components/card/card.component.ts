import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CardFieldComponent } from '../card-field/card-field.component';

@Component({
  selector: 'bp-card',
  standalone: true,
  imports: [CommonModule, CardFieldComponent, DatePipe],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @Input() gender: 'male' | 'female' = 'male';
  @Input() name: string | undefined;
  @Input() participant: string | undefined;
  @Input() relation: string | undefined;
  @Input() birthDateTime: Date | undefined;
  @Input() weight: number | undefined;
  @Input() backgroundImage: 'giraffe' | 'owl' | 'frog' | 'coala' = 'frog';

  @HostBinding('style.border-color')
  get borderColor() {
    return this.gender === 'male' ? 'var(--blue)' : 'var(--pink)';
  }

  get overlayClass() {
    return this.backgroundImage;
  }
}
