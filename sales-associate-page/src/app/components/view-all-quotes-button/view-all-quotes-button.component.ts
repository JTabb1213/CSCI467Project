import { Component, Output, EventEmitter } from '@angular/core';
import { CustomerService } from '../../services/customer-db.service';
import { EnterQuotes } from '../../models/customer.model';

@Component({
  selector: 'app-view-all-quotes-button',
  standalone: true,
  imports: [],
  templateUrl: './view-all-quotes-button.component.html',
  styleUrl: './view-all-quotes-button.component.css'
})
export class ViewAllQuotesButtonComponent {
  allQuotes: EnterQuotes[] = []; //define array of customers
  //next two lines, along with .emit line allow this component to send its data to any component that uses it
  constructor(private apiService: CustomerService) { }
  @Output() quotesLoaded = new EventEmitter<EnterQuotes[]>();
  getAllQuotes(): void {
    this.apiService.getQuotes().subscribe(data => {
      this.allQuotes = data;
      this.quotesLoaded.emit(this.allQuotes);
      //console.log(this.allCustomers)
    });
  }
}
