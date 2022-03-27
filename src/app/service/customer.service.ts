import { Injectable } from '@angular/core';
import {
  HttpHeaders,
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import { throwError } from 'rxjs/internal/observable/throwError';
import { Observable } from 'rxjs';
import { catchError, delay, map, tap } from 'rxjs/operators';

import { Router } from '@angular/router';
import { Customer } from '../models/customer.class';
@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  currentUser = 'LocLT8';
  private REST_API_SERVER = 'http://localhost:3000';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // Authorization: 'my-auth-token',
      // Authorization: 'Basic ' + btoa('username:password'),
    }),
  };
  constructor(private httpClient: HttpClient, private router: Router) {}

  public getListCustomer(query?: string) {
    const url = `${this.REST_API_SERVER}/customers`;
    return this.httpClient.get<any>(url, this.httpOptions).pipe(
      catchError(this.handleError),
      delay(500),
      map((data) =>
        data.filter((u: any) => {
          console.log('check===>u=>', u);
          if (!query) return true;
          return (
            u.firstName.toLowerCase().startsWith(query.toLowerCase()) ||
            u.lastName.toLowerCase().startsWith(query.toLowerCase()) ||
            u.email.toLowerCase().startsWith(query.toLowerCase())
          );
        })
      )
    );
  }

  public getCustomer(customerId: number) {
    const url = `${this.REST_API_SERVER}/customers/` + customerId;
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }
  public addCustomer(data: Customer) {
    const url = `${this.REST_API_SERVER}/customers`;
    return this.httpClient
      .post<any>(url, data, this.httpOptions)
      .pipe(catchError(this.handleError));
  }
  public EditCustomer(customerId: number, data: Customer) {
    const url = `${this.REST_API_SERVER}/customers/` + customerId;
    return this.httpClient
      .put<any>(url, data, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public deleteCustomer(customerId: string) {
    const url = `${this.REST_API_SERVER}/customers/` + customerId;
    return this.httpClient.delete<any>(url).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
}
