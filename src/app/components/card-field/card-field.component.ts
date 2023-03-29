import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bp-card-field',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-field.component.html',
  styleUrls: ['./card-field.component.scss'],
})
export class CardFieldComponent {
  @Input() gender: 'male' | 'female' = 'male';
  @Input() label: string | undefined;
  @Input() text: string | undefined | null;
  @Input() icon: string | undefined;
}
