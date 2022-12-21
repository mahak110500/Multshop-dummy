import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header-third',
  templateUrl: './header-third.component.html',
  styleUrls: ['./header-third.component.css']
})
export class HeaderThirdComponent implements OnInit {


  public totalItem: number = 0;

  constructor(private cart:CartService) { }

  ngOnInit(): void {
    this.cart.getProducts().subscribe(res => {
      this.totalItem = res.length;
    })

  }

}
