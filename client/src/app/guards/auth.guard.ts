import { CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { AuthStoreService } from '../services/auth-store.service';
import { Injectable } from '@angular/core';


@Injectable()
export class AuthGuard implements CanLoad {
  constructor(private _authService: AuthStoreService, private _router: Router) {

  }


  canLoad(route: Route, segments: UrlSegment[]): boolean {
    if (this._authService.hasAuth()) {
      return true;
    }
    this._router.navigateByUrl('guest');
  }
}
