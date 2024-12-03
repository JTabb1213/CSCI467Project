import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // In order to get the login boxes to work 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule], // need to add it here too in order to enable it
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  onLogin() { // Logs the username and password on the console (Can be seen in chrome deveoper tools)
    console.log('Username:', this.username);
    console.log('Password:', this.password);

    // Goes straight to successful login
    // Currently doesn't check, sucess as long as you enter anything
    alert('Login Successful!');
  }
}