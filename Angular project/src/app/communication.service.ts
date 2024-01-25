import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  constructor() { }

  private submitSubject = new Subject<void>();

  submitEvent$ = this.submitSubject.asObservable().pipe(debounceTime(300));

  triggerSubmitEvent() {
    this.submitSubject.next();
  }
}
