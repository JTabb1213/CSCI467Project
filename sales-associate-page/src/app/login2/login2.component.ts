import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CustomerService } from '../services/customer-db.service';
import { associateLogin } from '../models/customer.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'login2',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './login2.component.html',
  styleUrl: './login2.component.css'
})
export class Login2Component {
  constructor(private router: Router, private apiService: CustomerService) { }

  username: string = '';
  password: string = '';
  loginErrorMessage: string = '';


  onLogin() {
    console.log("attemted login")
    console.log(this.username, this.password)
    const login: associateLogin = {
      username: this.username,
      passwrd: this.password
    };

    console.log("login: ", login)
    this.apiService.purchaseOrderLogin(login).subscribe((data: associateLogin) => {
      console.log("login was succesful", data);
      this.router.navigate(['/purchase-order'], { queryParams: { username: this.username } });
    }, error => {
      this.loginErrorMessage = 'Login failed: Incorrect username or password.';
      console.error('Error logging in:', error);
    });
  }

  toFinalizeQuotes() {
    this.router.navigate(['/finalize']);
  }
}
