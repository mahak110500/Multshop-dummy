import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
	selector: 'app-header-first',
	templateUrl: './header-first.component.html',
	styleUrls: ['./header-first.component.css']
})
export class HeaderFirstComponent implements OnInit {

	isLoginMode = true;
	cartItem:number;

	isAuthenticated: boolean = false;
	private userSub: Subscription = new Subscription;


	constructor(private activatedRoute: ActivatedRoute, private route: Router, private authService: AuthService, private cart:CartService) { }

	ngOnInit(): void {
			//for navbar change
			this.userSub = this.authService.isSellerLoggedIn.subscribe((user:any) => {
				this.isAuthenticated = !!user; //outputs true
				console.log(this.isAuthenticated);
			})
			this.isAuthenticated = this.authService.updateNav();

	
			// let userToken =JSON.parse(localStorage.getItem('userData'))
	
			// if(userToken.data.tokenCreate.token) {
			// 	this.isAuthenticated= true;
			// }
	}

	logout() {
		this.authService.isSellerLoggedIn.next(false);
		localStorage.removeItem('userData');
		this.route.navigate(['/auth/login']); 

		// this.cart.cartSubject.next(0);

	}

}
