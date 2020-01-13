import { Injectable } from '@angular/core';
//import { QUOTES } from './mock-quotes';
import { Quote } from './quote';

import { MessageService } from './message.service';

import { Observable, of, from } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class QuoteService {

  //private quoteUrl = 'api/quotes';
  //private quoteUrl = 'https://gist.githubusercontent.com/tnobile/4408dea67a2b3778bda28fdb19fe5392/raw/c68b102cde92c3fe0acef44fac9ece51e423c0db/quotes.json';
  //private quoteUrl = 'https://gist.githubusercontent.com/tnobile/4408dea67a2b3778bda28fdb19fe5392/raw/4d9b0550a08eca23e3854e7ac739d69331f5efeb/quotes.json';
  private quoteUrl = 'https://gist.githubusercontent.com/tnobile/4408dea67a2b3778bda28fdb19fe5392/raw/1285ea93a20a3612c42141270b487bab7a57c7d3/quotes.json';

  constructor(private messageService: MessageService, private http: HttpClient) { }

  async getQuotesAsync(): Promise<Quote[]> {
    try {
      const promise = await fetch(this.quoteUrl);

      if (promise.ok) {
        const json = await promise.json();
        return json.quotes as Quote[];
      } else {
        this.log("async error code");
        //throw "mierda";
        return Promise.reject(new Error(promise.statusText));
      }
    } catch (err) {
      this.log("async error");
      return Promise.reject(new Error(err));
    }
  }

  getQuotes2(): Observable<Quote[]> {
    this.messageService.add('QuoteService: fetching quotes async');
    const promise = this.getQuotesAsync()
      .then(a => a)
      .catch(e => {
        this.log("puta:" + e);
        return [] as Quote[];
      });
    return from(promise);
    //return from(this.getQuotesAsync());
  }

  getQuotes(): Observable<Quote[]> {
    this.messageService.add('QuoteService: fetching quotes');
    const promise = fetch(this.quoteUrl)
      .then(response => response.json())
      .then(data => {
        return data.quotes as Quote[];
      })
      .catch(error => { this.log("got error" + error); return [] as Quote[]; });
    return from(promise);

    //return of(q);
    //;return this.http.get<Quote[]>(this.quoteUrl)
    //  .pipe(
    //    tap(_ => this.log('fetched in service ')),
    //    catchError(this.handleError<Quote[]>('getQuotes', []))
    //  );
  }

  private log(message: string) {
    this.messageService.add(`QuoteService: ${message}`);
  }

  private handleError<T>(operation = 'op', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`op of ${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
