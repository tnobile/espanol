import { Component, OnInit } from '@angular/core';
//import { QUOTES } from '../mock-quotes';
import { Quote } from '../quote';
import { QuoteService } from '../quote.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})
export class QuotesComponent implements OnInit {

  private colors = ["#c72923", "#116063", "#57aefc", "#ed674d", "#9c5b93", "#4dd3ed", "#000000", "#55515e"];

  currentQuote: Quote;
  dateTime: Date = new Date();
  quotes: Quote[] = [];
  id: number;
  color: string = "white";

  constructor(private quoteService: QuoteService, private messageService: MessageService) {
  }

  ngOnInit() {
    this.quotes[0] = { "name": "wise man", "quote": 'A quien madruga, Dios le ayuda', "id": 0 };

    this.getQuotes();
    this.getNewQuote();
  }

  getNewQuote() {
    this.dateTime = new Date();

    this.id = Math.floor(Math.random() * this.quotes.length);
    this.currentQuote = this.quotes[this.id];
    this.color = this.getRandomColor();
  }

  getQuotes() {
    this.quoteService.getQuotes2()
      .subscribe(quotes => {
        if (quotes.length > 0) {
          this.quotes = quotes;
          this.messageService.add(`Got ${this.quotes.length} quotes`);
        }
      });
  }

  getRandomColor() {
    return this.colors[Math.floor(Math.random() * this.colors.length)];
  }
}
