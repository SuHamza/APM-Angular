import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { IProduct } from './product';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    // Local URL to data file
    private productURL = 'api/products/products.json';
    // Inject HTTP Client
    constructor(private http: HttpClient) {}

    getProducts(): Observable<IProduct[]> {
        return this.http.get<IProduct[]>(this.productURL).pipe(
            tap( data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    private handleError(err: HttpErrorResponse) {
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
            // A client side or network error occurred
            // Handle it accordingly
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            // The backend returned an unsuccessful response code
            errorMessage = `Service returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
    }
}