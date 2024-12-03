import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sales-quotes',
  templateUrl: './sales-quotes.component.html',
  styleUrls: ['./sales-quotes.component.css'],
})
export class SalesQuotesComponent {
  constructor(private router: Router) {}

  navigateTo(page: string): void {
    switch (page) {
      case 'create':
        this.router.navigate(['/sales-quotes']); // Navigate to create/manage quotes
        break;
      case 'finalized-quotes':
        this.router.navigate(['/finalized-quotes']); // Navigate to finalized quotes
        break;
      case 'purchase':
        this.router.navigate(['/purchase']); // Navigate to purchase orders
        break;
      default:
        console.error('Unknown navigation page:', page);
    }
  }
}
