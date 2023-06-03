import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { CardComponent } from 'src/app/components/card/card.component';
import { RouterLink } from '@angular/router';
import { PollService } from 'src/app/services/poll.service';

@Component({
  selector: 'bp-overview',
  standalone: true,
  imports: [CommonModule, ButtonComponent, CardComponent, RouterLink],
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent {
  date = new Date();

  private pollService = inject(PollService);
  public polls$ = this.pollService.getpolls();
}
