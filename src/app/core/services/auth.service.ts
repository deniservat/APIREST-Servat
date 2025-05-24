import { Injectable } from '@angular/core';
import { RootState } from '@core/store';
import { setAuthUser } from '@core/store/auth/auth.actions';
import { Store } from '@ngrx/store';
import { User } from 'app/featured/auth/interfaces/user';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _authUser = new BehaviorSubject<User | null>(null);
  authUser$ = this._authUser.asObservable();

  private TOKEN = 'my_secret_token';

  private users = [
    {
      name: 'Denise',
      email: 'den@gmail.com',
      password: '1234',
      role: 'admin',
    },
    {
      name: 'Sofia',
      email: 'sofi@gmail.com',
      password: '1234',
      role: 'user',
    },
    {
      name: 'Emiliano',
      email: 'emi@gmail.com',
      password: '1234',
      role: 'user',
    },
  ];

  constructor(private store: Store<RootState>) {}

  login(email: string, password: string): boolean {
   
    const user = this.users.find(
      (user) => user.email === email && user.password === password
    );

    if (!user) {
      return false;
    }

    this.store.dispatch(
      setAuthUser({
        payload: user,
      })
    );

    this._authUser.next(user);

    localStorage.setItem('token', this.TOKEN);
    // localStorage.setItem('user', JSON.stringify(user));

    return true;
  }

  getRole() {
    return this.authUser$;
  }

  verifyToken(): Observable<boolean> {
    const token = localStorage.getItem('token');

    return of(token === this.TOKEN);
  }

  logout() {
    this._authUser.next(null);
  }
}
