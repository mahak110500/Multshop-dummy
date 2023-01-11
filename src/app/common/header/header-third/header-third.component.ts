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

	isUserAuthenticated:boolean = false;
	private userSub: Subscription = new Subscription;



	constructor(private cart: CartService, private authService: AuthService ,private route:Router) {}

	ngOnInit(): void {
		this.authService.updateNav();
		// this.onUpdateNav();

		//for navbar change
		this.userSub = this.authService.isSellerLoggedIn.subscribe((user:any) => {
			
			this.isAuthenticated = !!user; //outputs true
			console.log(this.isAuthenticated);
		})

		this.isAuthenticated = this.authService.updateNav();
		

		//for no.of items present in cart
		this.cart.cartSubject.subscribe(res => {
			this.cartItem = res;
		})
		this.cartItemFunction();

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

	onUpdateNav(){
		let userToken =JSON.parse(localStorage.getItem('userData'));
		if(userToken.data.tokenCreate.token != null){
			 this.authService.headerSubject.subscribe(res => {
				console.log(res);
			 })
		}
	}
	

	ngOnDestroy(): void {
		this.userSub.unsubscribe();
	}

}
