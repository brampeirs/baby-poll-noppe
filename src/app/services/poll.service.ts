import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Poll, PollPostDto } from './poll.model';
import { HttpClient } from '@angular/common/http';
import { PollResponse } from './poll-response.model';

@Injectable({
  providedIn: 'root',
})
export class PollService {
  private readonly apiUrl = 'https://api.babypeirs.be';
  private httpClient = inject(HttpClient);

  getpolls(): Observable<Poll[]> {
    return this.httpClient
      .get<PollResponse<Poll>>(this.apiUrl)
      .pipe(map((response) => response.items));
  }

  postPoll(poll: PollPostDto): Observable<void> {
    return this.httpClient.post<void>(this.apiUrl, poll);
  }
}
