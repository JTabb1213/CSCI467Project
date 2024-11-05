import { Component } from '@angular/core';
import { ButtonToViewAllCustomersComponent } from '../button-to-view-all-customers/button-to-view-all-customers.component';
import { Customer, PurchaseOrder } from '../../models/customer.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomerService } from '../../services/customer-db.service';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ButtonToViewAllCustomersComponent, CommonModule, FormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  constructor(private apiService: CustomerService) { }
  showSidebar = false;
  customerList: Customer[] = []; // Array to hold the customer data
  ord: PurchaseOrder | null = null;//neccesary unless cuz there only is one purchaseorder at once
  showColorWheel: boolean = false;
  customersHere: boolean = false;
  customerID: number = 0;
  amount: number = 0.00;
  salesID: string = 'hh332';

  // Method to handle received data
  onCustomersLoaded(customers: Customer[]): void {
    this.customerList = customers;
    this.customersHere = customers.length > 0;// So the 'all customers' header wont always appear
    console.log(customers)
  }

  setWorking(): void {
    this.showColorWheel = !this.showColorWheel; // Toggle the color wheel display
  }

  hideCustomerList(): void {
    this.customersHere = false;
    this.customerList = []; //clear the array
  }

  submitCustomerOrder(): void {
    const ord: PurchaseOrder = { //get details for the order, store them in model
      associateID: this.salesID,
      custID: this.customerID,
      amount: this.amount
    }

    this.apiService.addQuotes(ord).subscribe((data: PurchaseOrder) => {
      this.ord = data;
      console.log(this.ord);
    }, error => {
      console.error('Error submitting order:', error);
    });
  }


}
