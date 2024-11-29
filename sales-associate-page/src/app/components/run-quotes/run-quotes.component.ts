import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CustomerService } from '../../services/customer-db.service';
import { associateLogin } from '../../models/customer.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-run-quotes',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './run-quotes.component.html',
  styleUrl: './run-quotes.component.css'
})
export class RunQuotesComponent {
  constructor(private router: Router, private apiService: CustomerService) { }

  username: string = '';
  password: string = '';
  loginErrorMessage: string = '';

  //navigateToEditQuotes() {
  // this.router.navigate(['/edit']);
  //}

  onLogin() {
    console.log("attemted login")
    console.log(this.username, this.password)
    const login: associateLogin = { //get details for the order, store them in model
      username: this.username,
      passwrd: this.password
    };

    console.log("login: ", login)
    this.apiService.associateLogin(login).subscribe((data: associateLogin) => {
      console.log("login was succesful", data); // Logging response from the backend
      this.router.navigate(['/edit'], { queryParams: { username: this.username } });
    }, error => {
      this.loginErrorMessage = 'Login failed: Incorrect username or password.';
      console.error('Error logging in:', error);
    });
  }

  toFinalizeQuotes() {
    this.router.navigate(['/finalize']);
  }
}
