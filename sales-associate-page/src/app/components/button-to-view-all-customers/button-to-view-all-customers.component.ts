import { Component, Output, EventEmitter } from '@angular/core';
import { CustomerService } from '../../services/customer-db.service';
import { Customer } from '../../models/customer.model';
@Component({
  selector: 'app-button-to-view-all-customers',
  standalone: true,
  imports: [],
  templateUrl: './button-to-view-all-customers.component.html',
  styleUrl: './button-to-view-all-customers.component.css'
})
export class ButtonToViewAllCustomersComponent {
  allCustomers: Customer[] = []; //define array of customers
  //next two lines, along with .emit line allow this component to send its data to any component that uses it
  constructor(private apiService: CustomerService) { }
  @Output() customersLoaded = new EventEmitter<Customer[]>();
  getAllCustomers(): void {
    this.apiService.getAllCustomerInfo().subscribe(data => {
      this.allCustomers = data;
      this.customersLoaded.emit(this.allCustomers);
      //console.log(this.allCustomers)
    });
  }
}
