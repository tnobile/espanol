import { Injectable } from '@angular/core';
//import { QUOTES } from './mock-quotes';
import { Quote } from './quote';

import { MessageService } from './message.service';

import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class QuoteService {

  private quoteUrl = 'api/quotes';

  constructor(private messageService: MessageService, private http: HttpClient) { }

  getQuotes(): Observable<Quote[]> {
    this.messageService.add('QuoteService: fetched quotes');
    //return of(QUOTES);
    return this.http.get<Quote[]>(this.quoteUrl)
      .pipe(
        tap(_ => this.log('fetched quote')),
        catchError(this.handleError<Quote[]>('getQuotes', []))
      );
  }
  private log(message: string) {
    this.messageService.add(`QuoteService: ${message}`);
  }

  private handleError<T>(operation = 'op', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
