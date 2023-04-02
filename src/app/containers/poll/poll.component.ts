import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'bp-poll',
  standalone: true,
  imports: [CommonModule, RouterLink, ButtonComponent, FormsModule],
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.scss'],
})
export class PollComponent {
  weight = 3.5;
}
