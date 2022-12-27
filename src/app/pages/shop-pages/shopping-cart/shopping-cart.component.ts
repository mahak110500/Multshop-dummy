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
	items:any = [];

	cartTotal:any = 0;

	constructor(private cart: CartService) { }


	ngOnInit(): void {
		this.cart.getProducts().subscribe(res => {
			this.products = res; //array of products getting added to cart
			
			this.grandTotal = this.cart.getTotalPrice(); //for total cart price 

			let data = JSON.parse(localStorage.getItem('productsData'));  //object of products getting added to shopping cart and stored in localstorage
			// console.log(data);

			if (this.products == '') {
				this.products = data;
			}
			
			this.products.forEach(item => {
				this.cartTotal += (item.quantity*item.price)
			});
			// console.log(this.cartTotal);

		// this.cart.emitAmt.next(this.cartTotal);

			
		})

		// this.cart.getCartProductData();
	
	}

	removeItem(item: any) {
		this.cart.removeCartItem(item,this.products);

		let res = this.cart.removeCartItem(item,this.products);
		console.log(res);

		this.cartNum = 0;
		this.products = res;
		for (let i = 0; i < this.products.length; i++) {
			this.cartNum = this.products[i].quantity + this.cartNum
		}

		this.cartNumberFunction();

	}

	//for storing the length of array of products being added to cart
	cartNumber: number = 0;
	cartNumberFunction(){
		var cartValue = JSON.parse(localStorage.getItem('productsData'));
		this.cartNumber = cartValue.length;
		// console.log(this.cartNumber);
		
		this.cart.cartSubject.next(this.cartNum);
	}


	cartNum: any = 0;
	onIncrement(productId, quantity) {
		
		for(let i=0; i< this.products.length; i++){
			if(this.products[i].productId === productId){
				if(quantity != 5){
					this.products[i].quantity = parseInt(quantity) + 1;
				}
			}
		}
		if( quantity == 5){
			window.alert('You can add upto 5 items only')
		}

		this.cartNum =0;
		for(let i = 0; i< this.products.length; i++){
			this.cartNum = this.products[i].quantity + this.cartNum;
		}
		// console.log(this.cartNum); //total qty of products in the cart after doing increment
		localStorage.setItem('productsData', JSON.stringify(this.products));
		
		this.cartNumberFunction();
		
	}

	onDecrement(productId,quantity) {
		for (let i = 0; i < this.products.length; i++) {
			if (this.products[i].productId === productId) {
				if (quantity != 1)
					this.products[i].quantity = parseInt(quantity) - 1;
			}
		}
		localStorage.setItem('productsData',JSON.stringify(this.products));

		this.cartNum = 0;
		for(let i = 0; i< this.products.length; i++){
			this.cartNum = this.products[i].quantity + this.cartNum;
		}
		this.cartNumberFunction();
		
	}

}
