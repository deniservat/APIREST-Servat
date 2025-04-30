import { Injectable } from '@angular/core';
import { User } from 'app/feature/auth/login/interface/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authUser: User | null = null;

  constructor() { }

  login(email: string, password: string) : boolean {
    if( email !== "den@gmail.com" || password !== "1234"){
      return false;
    }
    this.authUser= {
      email,
      role: password};
    return true;
  }
  logout(){
    this.authUser = null;
  }
}
