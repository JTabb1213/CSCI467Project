import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient for API calls
import { FormsModule } from '@angular/forms'; // For [(ngModel)]
import { CommonModule } from '@angular/common'; // For *ngFor, *ngIf, and CurrencyPipe
import { CustomerService } from '../services/customer-db.service';

@Component({
  selector: 'app-finalized-quotes',
  standalone: true,
  imports: [FormsModule, CommonModule], // Add FormsModule and CommonModule
  templateUrl: './finalized-quotes.component.html',
  styleUrls: ['./finalized-quotes.component.css'],
})
export class FinalizedQuotesComponent {
  custID: string = ''; // Customer ID input
  lineItems: { item: string; price: number; email?: string; secretNotes?: string }[] = [];
  discountValue: number = 0.00;
  discountType: 'percentage' | 'amount' = 'percentage';
  totalPrice: number = 0;
  secretNotes: string = ''; // Notes for the quote

  constructor(private http: HttpClient, private apiService: CustomerService) {} // Inject HttpClient

  retrieveQuote(): void {
    console.log('Retrieving quote with custID:', this.custID);
    if (!this.custID) {
      alert('Please enter a Customer ID.');
      return;
    }

    this.http.get(`http://localhost:5001/api/get-quote?custID=${this.custID}`)
      .subscribe(
        (response: any) => {
          if (response && Array.isArray(response)) {
            this.lineItems = response.map((quote: any) => ({
              item: quote.item, // Backend returns 'item'
              price: parseFloat(quote.price), // Ensure price is a number
              email: quote.email, // Add 'email'
              secretNotes: quote.secretNotes, // Add 'secretNotes'
            }));
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

  // Edit an existing line item and update in the database
editLineItem(index: number, updatedItem: { item: string; price: number; email?: string; secretNotes?: string }): void {
  const updatedLineItem = this.lineItems[index];
  const updatePayload = {
    quoteID: this.custID,
    item: updatedLineItem.item,
    price: updatedLineItem.price,
    email: updatedLineItem.email,
    secretNotes: updatedLineItem.secretNotes,
  };

  this.http.put('http://localhost:5001/api/update-quote', updatePayload)
    .subscribe(
      (response: any) => {
        console.log(`Successfully updated line item at index ${index}:`, response);
        this.calculateTotal();
      },
      (error) => {
        console.error(`Error updating line item at index ${index}:`, error);
      }
    );
}


  // Remove a line item
  removeLineItem(index: number): void {
    const removedItem = this.lineItems.splice(index, 1);
    console.log(`Removed line item at index ${index}:`, removedItem);
    this.calculateTotal();
  }

  // Apply discount
  applyDiscount() {
    const discountPayload = {
      quoteID: this.custID, 
      discountValue: this.discountValue,
      discountType: this.discountType
    };
  
    this.http.post('http://localhost:5001/apply_discount', discountPayload).subscribe(
      (response: any) => {
        if (response.discountedPrice !== undefined) {
          this.totalPrice = response.discountedPrice;
        }
      },
      (error) => {
        console.error('Error applying discount:', error);
      }
    );
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
    console.log('Sending email for custID:', this.custID);
  }
}
