import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';


@Component({
	selector: 'app-checkout',
	templateUrl: './checkout.component.html',
	styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
	checkoutform: any;
	show: boolean;
	totalCartAmount:number;
	public products: any = [];


	constructor(private router: Router,private cart: CartService) { }

	ngOnInit(): void {

		this.cart.getProducts().subscribe(res => {
			console.log(res);
			
			this.products = res;

			let data = JSON.parse(localStorage.getItem('productsData'));  //object of products getting added to shopping cart and stored in localstorage
			
			if (this.products == '') {
				this.products = data;
			}
		})

		this.show = false;

		this.checkoutform = new FormGroup({
			checkoutInfo: new FormGroup({
				firstName: new FormControl(null, Validators.required),
				lastName: new FormControl(null, Validators.required),
				mobileNo: new FormControl(null, Validators.required),
				email: new FormControl(null, [Validators.required, Validators.email]),
				address1: new FormControl(null, Validators.required),
				address2: new FormControl(null, Validators.required),
				country: new FormControl(null, Validators.required),
				city: new FormControl(null, Validators.required),
				state: new FormControl(null, Validators.required),
				zipCode: new FormControl(null, Validators.required,),

			})
		});
	}


	showDiv() {
		// console.log(this.show);
		this.show = !this.show;
	}

	onCheckOut(){
		this.router.navigate(['/order-successful']);
	}


}
