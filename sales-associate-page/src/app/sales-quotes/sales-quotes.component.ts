import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sales-quotes',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sales-quotes.component.html',
  styleUrl: './sales-quotes.component.css'
})
export class SalesQuotesComponent {
  constructor(private router: Router) {} // Inject Router service

  navigateTo(page: string) {
    switch (page) {
      case 'create':
        this.router.navigate(['/create']); // Adjust path as needed
        break;
      case 'edit':
        this.router.navigate(['/edit']); // Adjust path as needed
        break;
      case 'convert':
        this.router.navigate(['/convert']); // Adjust path as needed
        break;
      default:
        console.error('Unknown page:', page);
        break;
    }
  }
}
