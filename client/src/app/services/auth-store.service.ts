import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class AuthStoreService {
  private _authInfo = null;
  set authInfo(value: { token: string }) {
    this._authInfo = value;
    localStorage.setItem('token', value.token);
  }
  get authInfo() {
    return this._authInfo;
  }

  hasAuth() {
    return localStorage.getItem('token') ? true : false;
  }

  clearAuth() {
    localStorage.removeItem('token');
    this._authInfo = null;
  }
}
