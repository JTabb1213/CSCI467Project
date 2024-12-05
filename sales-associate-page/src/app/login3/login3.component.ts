import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CustomerService } from '../services/customer-db.service';
import { associateLogin } from '../models/customer.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'login3',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './login3.component.html',
  styleUrl: './login3.component.css'
})
export class Login3Component {
  constructor(private router: Router, private apiService: CustomerService) { }

  username: string = '';
  password: string = '';
  loginErrorMessage: string = '';
  showColorWheel: boolean = false;


  onLogin() {
    this.showColorWheel = true
    console.log("attemted login")
    console.log(this.username, this.password)
    const login: associateLogin = {
      username: this.username,
      passwrd: this.password
    };

    console.log("login: ", login)
    this.apiService.finalizedLogin(login).subscribe((data: associateLogin) => {
      this.showColorWheel = false
      console.log("login was succesful", data);
      this.router.navigate(['/finalized-quotes2'], { queryParams: { username: this.username } });

    }, error => {
      this.showColorWheel = false
      this.loginErrorMessage = 'Login failed: Incorrect username or password.';
      console.error('Error logging in:', error);
    });
  }

  toFinalizeQuotes() {
    this.router.navigate(['/finalize']);
  }
}
