import { Component, ViewChild } from '@angular/core';
import { ButtonToViewAllCustomersComponent } from '../button-to-view-all-customers/button-to-view-all-customers.component';
//import { ViewAllQuotesButtonComponent } from '../view-all-quotes-button/view-all-quotes-button.component';
import { Customer, EnterQuotes } from '../../models/customer.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomerService } from '../../services/customer-db.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ButtonToViewAllCustomersComponent /*ViewAllQuotesButtonComponent*/, CommonModule, FormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  //@ViewChild('quotesButton') quotesButton!: ViewAllQuotesButtonComponent;
  constructor(private apiService: CustomerService, private route: ActivatedRoute) { }
  salesID: string = this.route.snapshot.queryParams['username'] || 'defaultSalesID';//to make sure there is never a null value

  ngOnInit(): void {
    console.log(this.salesID)
  }

  showSidebar = false;
  customerList: Customer[] = []; // Array to hold the customer data
  quotesList: EnterQuotes[] = [] // Array to hold the quotes

  ord: EnterQuotes | null = null;//neccesary unless cuz there only is one purchaseorder at once
  showColorWheel: boolean = false;
  customersHere: boolean = false;
  quotesHere: boolean = false;
  customerID: number = 0;
  price: number = 0.00;
  //salesID: string = this.route.snapshot.queryParams['username'];
  email: string = "";
  description: string = "";
  secretNotes: string = "";
  isFinalized: boolean = false;
  allQuotes: EnterQuotes[] = [];

  // Method to handle received data
  onCustomersLoaded(customers: Customer[]): void {
    this.customerList = customers;
    this.customersHere = customers.length > 0;// So the 'all customers' header wont always appear
    console.log(customers)
  }

  getAllQuotes(salesID: string): void {
    this.apiService.getQuotes(salesID).subscribe(data => {
      this.quotesList = data;
      this.quotesHere = data.length > 0;// So the 'all customers' header wont always appear
      console.log(data)
      //console.log(this.allQuotes);
    }, error => {
      console.error('Error fetching quotes:', error);
    });
  }

  /*
    onQuotesLoaded(quotes: EnterQuotes[]): void {
      console.log("salesID:", this.salesID);
      this.quotesList = quotes;
      this.quotesHere = quotes.length > 0;// So the 'all customers' header wont always appear
      console.log(quotes)
    }
  */
  setWorking(): void {
    this.showColorWheel = !this.showColorWheel; // Toggle the color wheel display
  }

  hideCustomerList(): void {
    this.customersHere = false;
    this.customerList = []; //clear the array
  }

  hideQuotesList(): void {
    this.quotesHere = false;
    this.quotesList = []; //clear the array
  }

  submitCustomerOrder(): void {
    const ord: EnterQuotes = { //get details for the order, store them in model
      associateID: this.salesID,
      custID: this.customerID,
      price: this.price,
      email: this.email,
      description: this.description,
      secretNotes: this.secretNotes,
      isFinalized: this.isFinalized
    };
    console.log("isFinalized value:", this.isFinalized);
    console.log("isFinalized type:", typeof this.isFinalized)
    console.log(this.isFinalized);

    this.apiService.addQuotes(ord).subscribe((data: EnterQuotes) => {
      this.ord = data;
      console.log(this.ord);
    }, error => {
      console.error('Error submitting order:', error);
    });
  }
}
