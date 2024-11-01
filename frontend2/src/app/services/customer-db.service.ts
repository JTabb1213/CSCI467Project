// src/app/customer.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer.model';
@Injectable({
  providedIn: 'root', // This makes the service available throughout the app
})
export class CustomerService {
  private apiUrl = 'http://localhost:5001'; // Your backend endpoint

  constructor(private http: HttpClient) { }

  // Get the message
  getMessage(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/message`); // change /message for different endpoints
  }

  getAllCustomerInfo(): Observable<any> {
    return this.http.get<Customer[]>(`${this.apiUrl}/all_customer_info`);
  }

  // Add other methods as needed
  // For example, get a specific customer, add a new customer, etc.
}

