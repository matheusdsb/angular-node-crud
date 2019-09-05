import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Cliente } from '../interfaces/cliente.interface';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ClienteService {
  constructor(private http: HttpClient) { }

  apiUrl = '/api/cliente';

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

  save(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.apiUrl + '/save', cliente)
    .pipe(
      catchError(this.handleError)
    );
  }

  getAll() {
    return this.http.get<Cliente[]>(this.apiUrl);
  }

  getById(id: number) {
    return this.http.get<Cliente>(this.apiUrl + '/' + id);
  }

  delete(id: number) {
    return this.http.delete(this.apiUrl + '/' + id);
  }
}
