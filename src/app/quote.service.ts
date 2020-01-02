import { Injectable } from '@angular/core';
import { QUOTES } from './mock-quotes';
import { Quote } from './quote';

import { MessageService } from './message.service';

import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class QuoteService {

  constructor(private messageService: MessageService) { }

  getQuotes(): Observable<Quote[]> {
    this.messageService.add('QuoteService: fetched quotes');
    return of(QUOTES);
  }
}
