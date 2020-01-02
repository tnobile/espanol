import { Component, OnInit } from '@angular/core';
//import { QUOTES } from '../mock-quotes';
import { Quote } from '../quote';
import { QuoteService } from "../quote.service";

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})
export class QuotesComponent implements OnInit {

  private colors = ["#c72923", "#116063", "#57aefc", "#ed674d", "#9c5b93", "#4dd3ed", "#000000", "#55515e"];

  currentQuote: Quote;
  dateTime: Date = new Date();
  quotes: Quote[];
  id: number;
  color: string = "white";

  constructor(private quoteService: QuoteService) {
  }

  ngOnInit() {
    this.getQuotes();
    this.getNewQuote();
  }

  getNewQuote() {
    console.log("querying...");
    this.dateTime = new Date();

    this.id = Math.floor(Math.random() * this.quotes.length);
    this.currentQuote = this.quotes[this.id];
    this.color = this.getRandomColor();
  }

  getQuotes() {
    this.quoteService.getQuotes()
        .subscribe(quotes => this.quotes = quotes);
  }

  getRandomColor() {
    return this.colors[Math.floor(Math.random() * this.colors.length)];
  }
}
