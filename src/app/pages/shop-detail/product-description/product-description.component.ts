import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-description',
  templateUrl: './product-description.component.html',
  styleUrls: ['./product-description.component.css']
})
export class ProductDescriptionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  current1 = true;
  current2 = false;
  current3 = false;


  onDivChange1() {
    this.current1 = true;
    this.current2 = false;
    this.current3 = false;
  }
  onDivChange2() {
    this.current1 = false;
    this.current2 = true;
    this.current3 = false;
  }
  onDivChange3() {
    this.current1 = false;
    this.current2 = false;
    this.current3 = true;
  }

}
