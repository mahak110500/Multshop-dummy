import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  public products: any = [];
  public grandTotal !: number;

  constructor(private cart: CartService) { }

  ngOnInit(): void {
    this.cart.getProducts().subscribe(res => {
      this.products = res;
      this.grandTotal = this.cart.getTotalPrice();
    })
  }

  removeItem(item:any){
    this.cart.removeCartItem(item);
  }

}
