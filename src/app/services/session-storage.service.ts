import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class localStorageService {
  constructor() {}
  setExpirationForOneHour() {
    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 1); // Add one hour to the current time
    localStorage.setItem('expirationDate', expirationDate.toISOString());
  }
}
