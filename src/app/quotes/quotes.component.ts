import { Component, OnInit } from '@angular/core';
import { QUOTES} from '../mock-quotes';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})
export class QuotesComponent implements OnInit {

  constructor() { }

  colors = ["#c72923","#116063","#57aefc","#ed674d","#9c5b93", "#4dd3ed", "#000000", "#55515e"];

  quote: string = "";
  author: string = "";
  dateTime: Date = new Date();
  quotes = QUOTES;
  id: number;
  color: string = "white";

  ngOnInit() {
  }

  getNewQuote(){
    console.log("querying...");
    this.dateTime = new Date();

    this.id = Math.floor(Math.random() * this.quotes.length);
    this.quote = this.quotes[this.id].quote;
    this.author = this.quotes[this.id].name;
    this.color = this.getRandomColor();
  }

  getRandomColor(){
    return this.colors[Math.floor(Math.random() * this.colors.length)];
  }
}
