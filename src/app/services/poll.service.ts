import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Poll, PollPostDto } from './poll.model';
import { HttpClient } from '@angular/common/http';
import { PollResponse } from './poll-response.model';

@Injectable({
  providedIn: 'root',
})
export class PollService {
  private readonly apiUrl = 'https://api.babynoppe.be';
  private httpClient = inject(HttpClient);
  private readonly _polls$ = new BehaviorSubject<Poll[]>([]);
  private readonly _isRequesting$ = new BehaviorSubject<boolean>(false);

  public readonly polls$ = this._polls$.asObservable();
  public readonly isRequesting$ = this._isRequesting$.asObservable();

  loadPolls(): void {
    // don't set requesting if we can use cache
    if (this.noCacheAvailable()) {
      this._isRequesting$.next(true);
    }
    this.httpClient
      .get<PollResponse<Poll>>(this.apiUrl)
      .pipe(map((response) => response.items))
      .subscribe((polls) => {
        this._isRequesting$.next(false);
        this._polls$.next(polls);
      });
  }

  postPoll(poll: PollPostDto): Observable<void> {
    return this.httpClient.post<void>(this.apiUrl, poll);
  }

  private noCacheAvailable(): boolean {
    return this._polls$.value?.length === 0;
  }
}
