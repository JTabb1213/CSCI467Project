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
  customerList: Customer[] = [];
  quotesList: EnterQuotes[] = []

  ord: EnterQuotes | null = null;
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

  onCustomersLoaded(customers: Customer[]): void {
    this.showColorWheel = true;
    setTimeout(() => {
      this.customerList = customers;
      this.customersHere = customers.length > 0;// So the 'all customers' header wont always appear
      console.log(customers)
      this.showColorWheel = false;
    }, 1000)
  }

  getAllQuotes(salesID: string): void {
    this.showColorWheel = true;
    this.apiService.getQuotes(salesID).subscribe(data => {
      this.quotesList = data;
      this.quotesHere = data.length > 0;// So the 'all customers' header wont always appear
      console.log(data)
      this.showColorWheel = false;
      //console.log(this.allQuotes);
    }, error => {
      console.error('Error fetching quotes:', error);
      this.showColorWheel = false;
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
    this.showColorWheel = !this.showColorWheel;
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
