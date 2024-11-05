import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-run-quotes',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './run-quotes.component.html',
  styleUrl: './run-quotes.component.css'
})
export class RunQuotesComponent {
  constructor(private router: Router) { }

  navigateToEditQuotes() {
    this.router.navigate(['/edit']);
  }

  toFinalizeQuotes() {
    this.router.navigate(['/finalize']);
  }
}
