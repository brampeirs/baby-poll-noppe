import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Poll } from './poll.model';
import { HttpClient } from '@angular/common/http';
import { PollResponse } from './poll-response.model';

@Injectable({
  providedIn: 'root',
})
export class PollService {
  private httpClient = inject(HttpClient);

  getpolls(): Observable<Poll[]> {
    return this.httpClient
      .get<PollResponse<Poll>>(
        'https://tq7au3r5e8.execute-api.us-east-1.amazonaws.com/dev/'
      )
      .pipe(map((response) => response.items));
  }
}
