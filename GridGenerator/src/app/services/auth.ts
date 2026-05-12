import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private password:string='123zxc!@#';
  isAuthenticated():boolean{
    return !!localStorage.getItem('isAuthenticated');
  }
  login(enteredPassword:string):boolean{
    if(enteredPassword === this.password) {
      localStorage.setItem('isAuthenticated', 'true');
      return true;
    }
    return false;
  }
  logout():void{
    localStorage.removeItem('isAuthenticated');
  }
}