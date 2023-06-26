import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { CardComponent } from 'src/app/components/card/card.component';
import { RouterLink } from '@angular/router';
import { PollService } from 'src/app/services/poll.service';
import { Poll } from 'src/app/services/poll.model';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';
import { Observable, filter, map } from 'rxjs';

interface PollSummary {
  participants: number;
  maleVotes: number;
  femaleVotes: number;
  popularNames: {
    name: string;
    count: number;
  }[];
}

@Component({
  selector: 'bp-overview',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    CardComponent,
    RouterLink,
    SpinnerComponent,
    ScrollingModule,
  ],
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent {
  private pollService = inject(PollService);
  public polls$ = this.pollService.polls$;
  public isRequesting$ = this.pollService.isRequesting$;

  public summary$: Observable<PollSummary> = this.polls$.pipe(
    filter((polls) => polls.length > 0),
    map((polls) => this.getPollSummary(polls))
  );

  constructor() {
    this.pollService.loadPolls();
  }

  trackById(index: number, poll: Poll): string {
    return poll.id;
  }

  private getPollSummary(polls: Poll[]): PollSummary {
    const nameCountMap = new Map<string, number>();

    polls.forEach((poll) => {
      // remove the diacritic marks
      const normalizedName = poll.name
        .trim()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
      const count = nameCountMap.get(normalizedName) || 0;
      nameCountMap.set(normalizedName, count + 1);
    });

    const namesCount = Array.from(nameCountMap.entries()).map(
      ([name, count]) => ({ name, count })
    );

    namesCount.sort((a, b) => b.count - a.count);

    const topFiveResultsPresentAtLeastTwice = namesCount
      .slice(0, 5)
      .filter((result) => result.count > 1);

    const pollSummary: PollSummary = {
      participants: polls.length,
      maleVotes: polls.filter((poll) => poll.gender === 'male').length,
      femaleVotes: polls.filter((poll) => poll.gender === 'female').length,
      popularNames: topFiveResultsPresentAtLeastTwice,
    };
    return pollSummary;
  }
}
