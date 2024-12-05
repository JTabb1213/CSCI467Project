import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient for API calls
import { FormsModule } from '@angular/forms'; // For [(ngModel)]
import { CommonModule } from '@angular/common'; // For *ngFor, *ngIf, and CurrencyPipe

@Component({
  selector: 'app-finalized-quotes',
  standalone: true,
  imports: [FormsModule, CommonModule], // Add FormsModule and CommonModule
  templateUrl: './finalized-quotes.component.html',
  styleUrls: ['./finalized-quotes.component.css'],
})
export class FinalizedQuotesComponent {
  quoteID: string = '';
  lineItems: { item: string; price: number }[] = [];
  discountValue: number = 0;
  discountType: 'percentage' | 'amount' = 'percentage';
  totalPrice: number = 0;
  secretNotes: string = '';

  constructor(private http: HttpClient) {} // Inject HttpClient

  retrieveQuote(): void {
    console.log('Retrieving quote with ID:', this.quoteID);
    if (!this.quoteID) {
      alert('Please enter a Quote ID.');
      return;
    }
  
    this.http.get(`http://localhost:5001/api/get-quote?quoteID=${this.quoteID}`)
      .subscribe(
        (response: any) => {
          if (response && response.lineItems) {
            this.lineItems = response.lineItems;
            this.secretNotes = response.secretNotes || '';
            this.calculateTotal();
          } else {
            alert('Quote not found or invalid data.');
            this.lineItems = [];
          }
        },
        (error) => {
          alert(`Error retrieving quote: ${error.message || 'Unknown error'}`);
          console.error(error);
          this.lineItems = [];
        }
      );
  }
  

  // Add a new line item
  addLineItem(): void {
    const newItem = { item: 'New Item', price: 0 };
    this.lineItems.push(newItem);
    console.log('Added line item:', newItem);
  }

  // Edit an existing line item
  editLineItem(index: number, updatedItem: { item: string; price: number }): void {
    this.lineItems[index] = updatedItem;
    console.log(`Edited line item at index ${index}:`, updatedItem);
    this.calculateTotal();
  }

  // Remove a line item
  removeLineItem(index: number): void {
    const removedItem = this.lineItems.splice(index, 1);
    console.log(`Removed line item at index ${index}:`, removedItem);
    this.calculateTotal();
  }

  // Apply discount
  applyDiscount(): void {
    if (this.discountType === 'percentage') {
      this.totalPrice -= (this.totalPrice * this.discountValue) / 100;
    } else {
      this.totalPrice -= this.discountValue;
    }
    console.log(`Applied discount: ${this.discountValue} (${this.discountType})`);
  }

  // Calculate the total price
  calculateTotal(): void {
    this.totalPrice = this.lineItems.reduce((sum, item) => sum + item.price, 0);
    console.log('Total price:', this.totalPrice);
  }

  // Save secret notes
  saveNotes(): void {
    console.log('Saving notes:', this.secretNotes);
  }

  // Send email (mock function)
  sendEmail(): void {
    console.log('Sending email for quote ID:', this.quoteID);
  }
}
