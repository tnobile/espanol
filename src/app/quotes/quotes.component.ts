import { Component, OnInit } from '@angular/core';
import { QUOTES } from '../mock-quotes';
import { Quote } from '../quote';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})
export class QuotesComponent implements OnInit {

  constructor() { }

  private colors = ["#c72923", "#116063", "#57aefc", "#ed674d", "#9c5b93", "#4dd3ed", "#000000", "#55515e"];

  currentQuote: Quote;
  dateTime: Date = new Date();
  quotes = QUOTES;
  id: number;
  color: string = "white";

  ngOnInit() {
    this.getNewQuote();
  }

  getNewQuote() {
    console.log("querying...");
    this.dateTime = new Date();

    this.id = Math.floor(Math.random() * this.quotes.length);
    this.currentQuote = this.quotes[this.id];
    this.color = this.getRandomColor();
  }

  getRandomColor() {
    return this.colors[Math.floor(Math.random() * this.colors.length)];
  }
}
