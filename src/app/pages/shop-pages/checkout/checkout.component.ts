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
	checkoutLineInput: any[];

	constructor(private router: Router,private cart: CartService) { }

	ngOnInit(): void {

		this.cart.getProducts().subscribe(res => {
			
			this.products = res;

			let data = JSON.parse(localStorage.getItem('productsData'));  //object of products getting added to shopping cart and stored in localstorage
			
			if (this.products == '') {
				this.products = data;
				console.log(data);
			}

			let linesInput = this.products.map(item => {
				const itemQty = item.quantity;
				const itemVariantId = item.productVariantId;
				const itemPrice = item.price;
	
				return { itemQty, itemVariantId, itemPrice };
			})

			this.checkoutLineInput = linesInput;
			console.log(this.checkoutLineInput);
			
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
		this.show = !this.show;
	}

	onCheckOut(){
		this.router.navigate(['/order-successful']);
	}

	onSubmit(){
		console.warn(this.checkoutform.value);
	}

	//for getting cart summary amount
	get Total(){
		return this.products?.reduce(
			(sum, x) => ({
				quantity: 1,
				price: sum.price + x.quantity * x.price
			}),
			{ quantity: 1, price: 0 }
		).price

	}


}
