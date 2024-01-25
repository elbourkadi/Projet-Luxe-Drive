import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor() { }

  deleteTokenFromLocalStorage(): void {
    const localStorageKeys = Object.keys(localStorage);

    const tokenKey = localStorageKeys.find(key => key.startsWith('token'));

    if (tokenKey) {
      localStorage.removeItem(tokenKey);
      console.log('Token deleted from local storage.');
    } else {
      console.log('Token does not exist in local storage.');
    }
  }
}
