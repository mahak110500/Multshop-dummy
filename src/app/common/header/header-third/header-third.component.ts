import { ThisReceiver } from '@angular/compiler';
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
    this.cart.cartSubject.subscribe(res => {
      this.cartItem = res;
    })

    this.cartItemFunction();

    this.cart.getProducts().subscribe(res => {
      // this.totalItem = res.length;
    })

    this.cart.emitQty.subscribe((res:any) => {
      // console.log(res);
      this.totalItem = res;
    })

  }

  cartItem:number = 0;
  cartItemFunction(){
    // if(localStorage.getItem('productsData') != null){
    //   var cartCount = JSON.parse(localStorage.getItem('productsData'));
    //   this.cartItem = cartCount.length;
    //   console.log(cartCount);
      
    // }

    if(localStorage.getItem('productsData') != null){
      var cartCount = JSON.parse(localStorage.getItem('productsData'));
      console.log(cartCount);

      for(let i=0; i<cartCount.length; i++){
        this.cartItem = cartCount[i].quantity + this.cartItem
      }
      
    }
  }

}
