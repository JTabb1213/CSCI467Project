import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homep',
  standalone: true,
  imports: [],
  templateUrl: './homep.component.html',
  styleUrl: './homep.component.css'
})
export class HomepComponent {
  constructor(private router: Router) { }

  navigateToAllCustomers() {
    this.router.navigate(['/all-customers']);
  }
}
