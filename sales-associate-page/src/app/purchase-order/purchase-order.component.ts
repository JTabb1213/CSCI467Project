import { Component } from '@angular/core';
import { PurchaseOrderQuotes, EnterQuotes, Customer, Quotes } from '../models/customer.model';
import { CustomerService } from '../services/customer-db.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonToViewAllCustomersComponent } from '../components/button-to-view-all-customers/button-to-view-all-customers.component';

@Component({
  selector: 'app-purchase-order',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonToViewAllCustomersComponent],
  templateUrl: './purchase-order.component.html',
  styleUrl: './purchase-order.component.css'
})
export class PurchaseOrderComponent {
  constructor(private apiService: CustomerService) { }
  quotesList: Quotes[] = []
  ord: PurchaseOrderQuotes | null = null;
  quotesHere: boolean = false;
  quote: number = 0;
  finalDiscount: number = 0.00;
  finalAmount: number = 0.00;
  processingDate: string = "";
  commissionRate: string = "";
  salesCommission: number = 0.00;
  associateID: string = "";
  custID: string = ""
  email: string = ""
  customerList: Customer[] = [];
  customersHere: boolean = false;

  onCustomersLoaded(customers: Customer[]): void {
    this.customerList = customers;
    this.customersHere = customers.length > 0;// So the 'all customers' header wont always appear
    console.log(customers)
  }

  sendPurchase(): void {
    const ord: PurchaseOrderQuotes = { //get details for the order, store them in model
      AssociateID: this.associateID,
      quoteID: this.quote,
      discount: this.finalDiscount,
      custID: this.custID,
      email: this.email
    };
    this.apiService.sendPurchaseOrder(ord).subscribe(data => {
      console.log(data);
      console.log(data.amount);
      this.processingDate = data.processDay
      this.commissionRate = data.commission
      this.finalAmount = data.final_amount
      this.salesCommission = data.paid
    }, error => {
      console.error('Error fetching quotes:', error);
    });
  }

  getAllFinalizedQuotes(): void {
    this.apiService.getFinalizedQuotes().subscribe(data => {
      this.quotesList = data;
      this.quotesHere = data.length > 0;// So the 'all customers' header wont always appear
      console.log(data)
      //console.log(this.allQuotes);
    }, error => {
      console.error('Error fetching quotes:', error);
    });
  }

  hideQuotesList(): void {
    this.quotesHere = false;
    this.quotesList = []; //clear the array
  }

  hideCustomerList(): void {
    this.customersHere = false;
    this.customerList = []; //clear the array
  }
}
