import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CardFieldComponent } from '../card-field/card-field.component';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'bp-card',
  standalone: true,
  imports: [CommonModule, CardFieldComponent, DatePipe, ButtonComponent],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @Input() gender: 'male' | 'female' = 'male';
  @Input() name: string | undefined;
  @Input() participant: string | undefined;
  @Input() length: number | undefined;
  @Input() birthDateTime: string | undefined;
  @Input() weight: number | undefined;
  @Input() backgroundImage: 'giraffe' | 'owl' | 'frog' | 'coala' = 'frog';
  @Input() canEdit = false;

  get borderColor() {
    return this.gender === 'male'
      ? { borderColor: 'var(--blue)' }
      : { borderColor: 'var(--pink)' };
  }

  get overlayClass() {
    return this.backgroundImage;
  }

  constructor() {
    this.backgroundImage = this.getRandomAnimal();
  }
  getRandomAnimal(): 'giraffe' | 'owl' | 'frog' | 'coala' {
    const animals: Array<'giraffe' | 'owl' | 'frog' | 'coala'> = [
      'giraffe',
      'owl',
      'frog',
      'coala',
    ];
    const randomIndex = Math.floor(Math.random() * animals.length);
    return animals[randomIndex];
  }
}
