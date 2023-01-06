import { ThisReceiver } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
	selector: 'app-header-third',
	templateUrl: './header-third.component.html',
	styleUrls: ['./header-third.component.css']
})
export class HeaderThirdComponent implements OnInit, OnDestroy {
	
	public totalItem: number = 0;

	cartItem: number = 0;

	isAuthenticated:boolean = false;
	private userSub: Subscription = new Subscription;


	constructor(private cart: CartService, private authService: AuthService ,private route:Router) { }

	ngOnInit(): void {

		// this.isAuthenticated= false;

		//for navbar change
		this.userSub = this.authService.isSellerLoggedIn.subscribe((user:any) => {
			console.log(user);
			
			console.log(this.isAuthenticated);
			this.isAuthenticated = !user; //outputs true
		})

		// let userToken =JSON.parse(localStorage.getItem('userData'))
		// if(userToken.data.tokenCreate.token) {
		// 	this.isAuthenticated= true;
		// }
		

		this.cart.cartSubject.subscribe(res => {
			this.cartItem = res;
		})
		this.cartItemFunction();

		// this.route.events.subscribe((val: any) => {
		// 	console.log(val.url);
		// 	if (val.url) {
		// 		console.log(val.url);
		// 		if(localStorage.getItem('userData') && val.url.includes('userData')){
		// 			console.log('in seller area');
		// 			this.menuType = "userData";
		// 		}else{
		// 			console.warn('outside seller area');
		// 			this.menuType = "default";
		// 		}

		// 	}
		// })

		

	}

	cartItemFunction() {
		
		if (localStorage.getItem('productsData') != null) {
			var cartCount = JSON.parse(localStorage.getItem('productsData'));
			console.log(cartCount);
			
			for (let i = 0; i < cartCount.length; i++) {
				this.cartItem = cartCount[i].quantity + this.cartItem
			}
			console.log(this.cartItem);

			// if(localStorage.getItem('productsData') != null){
			//   var cartCount = JSON.parse(localStorage.getItem('productsData'));
			//   this.cartItem = cartCount.length;
			//   console.log(cartCount);
	
			// }
		}
	}

	

	ngOnDestroy(): void {
		this.userSub.unsubscribe();
	}

}
