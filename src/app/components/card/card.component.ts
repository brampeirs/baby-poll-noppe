import { Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bp-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() color: 'blue' | 'pink' = 'blue';

  @HostBinding('style.border-color')
  get borderColor() {
    return this.color === 'blue' ? 'var(--blue)' : 'var(--pink)';
  }
}
