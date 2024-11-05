import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer, PurchaseOrder } from '../models/customer.model';
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

  addQuotes(order: PurchaseOrder): Observable<any> {
    return this.http.post<PurchaseOrder>(`${this.apiUrl}/purchase_order`, order);
  }
}
