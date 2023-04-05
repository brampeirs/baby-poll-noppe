import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { FormsModule } from '@angular/forms';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'bp-poll',
  standalone: true,
  imports: [CommonModule, RouterLink, ButtonComponent, FormsModule],
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'translateY(0)' })),
      transition(':enter', [
        style({ transform: 'translateY(25px)' }),
        animate(250),
      ]),
    ]),
  ],
})
export class PollComponent {
  weight = 2.5;
  currentStep = 0;
  showAll = false;
  constructor(private router: Router) {}

  navigateBack() {
    console.log(this.currentStep);
    if (this.currentStep === 0) {
      this.router.navigate(['/']);
    } else {
      this.currentStep = this.currentStep - 1;
    }
  }
}
