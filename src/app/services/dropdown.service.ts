import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  private openServicesSource = new Subject<void>();
  openServices$ = this.openServicesSource.asObservable();

  openServices() {
    this.openServicesSource.next();
  }
}
