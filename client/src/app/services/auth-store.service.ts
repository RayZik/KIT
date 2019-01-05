import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class AuthStoreService {
  private _authInfo = null;
  set authInfo(value) {
    this._authInfo = value;
  }
  get authInfo() {
    return this._authInfo;
  }

  hasAuth() {
    return true;
  }
}
