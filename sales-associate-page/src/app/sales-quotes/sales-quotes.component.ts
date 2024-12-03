import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sales-quotes',
  standalone: true,
  templateUrl: './sales-quotes.component.html',
  styleUrls: ['./sales-quotes.component.css'],
  imports:[RouterModule]
})
export class SalesQuotesComponent {
  constructor(private router: Router) {}

  navigateTo(page: string): void {
    switch (page) {
      case 'create':
        this.router.navigate(['/sales-quotes']); 
        break;
      case 'finalized-quotes':
        this.router.navigate(['/login3']); 
        break;
      case 'purchase':
        this.router.navigate(['/']); 
        break;
      default:
        console.error('Unknown navigation page:', page);
    }
  }
}
