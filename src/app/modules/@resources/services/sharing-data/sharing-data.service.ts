import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharingDataService {
  counter = 1;
  count: BehaviorSubject<number>;

  fave: BehaviorSubject<any>;

// share static data (not subject or begaviorSubject)
  public storage: any;

  constructor() {
    this.count = new BehaviorSubject(this.counter);
    this.fave = new BehaviorSubject(this.counter);
  }

  nextCount(data) {
    this.count.next(data);
  }

  nextFave(data) {
    this.fave.next(data);
  }
}
