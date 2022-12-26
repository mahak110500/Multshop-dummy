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
	cartNum: any = 0;

	 cartTotal:any = 0;

	constructor(private cart: CartService) { }


	ngOnInit(): void {
		this.cart.getProducts().subscribe(res => {
			// console.log(res);
			this.products = res;
			this.grandTotal = this.cart.getTotalPrice();

			
			this.products.forEach(item => {
				this.cartTotal += (item.quantity*item.price)
			});
		})

		//for displaying total product count in header cart
		this.cart.totalItemsCount(this.cart.productCount)
	}

	removeItem(item: any) {
		this.cart.removeCartItem(item);

		//for displaying total product count in header cart
		this.cart.totalItemsCount(item);
	}


	onIncrement(prodId, quantity) {
		// console.log(item);
		
		for(let i=0; i< this.products.length; i++){
			if(this.products[i].prodId === prodId){
				if(quantity != 5){
					this.products[i].quantity = parseInt(quantity) + 1;
				}
			}
		}

		this.cartNum = 0;

		for (let i = 0; i < this.products.length; i++) {
			this.cartNum = this.products[i].quantity + this.cartNum
		}
		// this.cartNumberFunc();

		//for displaying total product count in header cart
		this.cart.totalItemsCount(this.products.item);
		
	}

	onDecrement(prodId,quantity) {
		for (let i = 0; i < this.products.length; i++) {
			if (this.products[i].prodId === prodId) {
				if (quantity != 1)
					this.products[i].quantity = parseInt(quantity) - 1;
			}
		}

		//for displaying total product count in header cart
		this.cart.totalItemsCount(this.products);
	}

}
