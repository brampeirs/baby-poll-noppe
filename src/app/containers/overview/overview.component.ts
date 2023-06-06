import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { CardComponent } from 'src/app/components/card/card.component';
import { RouterLink } from '@angular/router';
import { PollService } from 'src/app/services/poll.service';
import { Poll } from 'src/app/services/poll.model';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';

@Component({
  selector: 'bp-overview',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    CardComponent,
    RouterLink,
    SpinnerComponent,
  ],
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent {
  date = new Date();

  private pollService = inject(PollService);
  public polls$ = this.pollService.polls$;
  public isRequesting$ = this.pollService.isRequesting$;

  constructor() {
    this.pollService.loadPolls();
  }

  trackById(index: number, poll: Poll): string {
    return poll.id;
  }
}
