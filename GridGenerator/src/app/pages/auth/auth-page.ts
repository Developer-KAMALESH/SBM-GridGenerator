import { Component, inject } from '@angular/core';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth',
  imports: [FormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export class AuthPage {
  private auth=inject(Auth);
  private route=inject(Router);
  protected password:string='';
  protected errorMessage:string='';
  login():void{
    if(this.auth.login(this.password)){
      this.route.navigate(['/generator']);
    } else {
      this.errorMessage = 'Incorrect password!';
    }
  }
}
