import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomerService } from '../../services/customer-db.service'; // Adjust the path
import { Customer } from '../../models/customer.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-all-customers-layout',
  standalone: true,
  imports: [RouterModule, CommonModule], // Add HttpClientModule here if standalone
  templateUrl: './all-customers-layout.component.html',
  styleUrls: ['./all-customers-layout.component.css'],
})
export class AllCustomersLayoutComponent {
  constructor(private apiService: CustomerService) { }
  message: string | undefined;
  allCustomers: Customer[] = []; //define array of customers
  fetchData(): void {
    this.apiService.getMessage().subscribe(data => {
      console.log(data);
      this.message = data.message;//set the data to the message
    });
  }

  getAllCustomers(): void {
    this.apiService.getAllCustomerInfo().subscribe(data => {
      console.log(data);
      this.allCustomers = data;
    });
  }
}
