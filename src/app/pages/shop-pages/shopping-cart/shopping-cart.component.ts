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

	removeItem(item: any) {
		this.cart.removeCartItem(item);
	}

	onIncrement(prodId, quantity) {
		for(let i=0; i< this.products.length; i++){
			if(this.products[i].prodId === prodId){
				if(quantity != 5){
					this.products[i].quantity = parseInt(quantity) + 1;
				}
			}
		}
		
	}

	onDecrement(prodId,quantity) {
		for (let i = 0; i < this.products.length; i++) {
			if (this.products[i].prodId === prodId) {
				if (quantity != 1)
					this.products[i].quantity = parseInt(quantity) - 1;
			}
		}
	}

}
