import { Component } from '@angular/core';
import { AuthStoreService } from 'src/app/services/auth-store.service';



@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  constructor(private _authService: AuthStoreService) {
    _authService.clearAuth();
  }
}
