import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer, EnterQuotes, PurchaseOrderQuotes, associateLogin, Quotes } from '../models/customer.model';
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

  addQuotes(order: EnterQuotes): Observable<any> {
    return this.http.post<EnterQuotes>(`${this.apiUrl}/purchase_order`, order);
  }

  getQuotes(associateID: string): Observable<EnterQuotes[]> {
    return this.http.get<EnterQuotes[]>(`${this.apiUrl}/view_all_quotes?associateID=${associateID}`);
  }

  associateLogin(user: associateLogin): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/attempt_associate_login`, user);
  }

  adminLogin(user: associateLogin): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/attempt_admin_login`, user);
  }

  finalizedLogin(user: associateLogin): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/attempt_finalized_login`, user);
  }

  purchaseOrderLogin(user: associateLogin): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/attempt_purchaseOrder_login`, user);
  }

  getFinalizedQuotes(): Observable<Quotes[]> {
    return this.http.get<Quotes[]>(`${this.apiUrl}/get_finalized_quotes`);
  }

  sendPurchaseOrder(order: PurchaseOrderQuotes): Observable<any> {
    return this.http.post<PurchaseOrderQuotes>(`${this.apiUrl}/send_purchase_order`, order);
  }

  applyFinalDiscount(discount: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/applyFinalDiscount`, discount);
  }
}
