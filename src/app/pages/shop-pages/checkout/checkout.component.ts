import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';


@Component({
	selector: 'app-checkout',
	templateUrl: './checkout.component.html',
	styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
	checkoutform: any;
	checkoutform1: any;
	show: boolean;
	totalCartAmount:number;
	public products: any = [];
	checkoutLineInput: any[]; 

	finalData = {};
	checkoutUsersData:any;


	constructor(private router: Router,private cart: CartService, private checkoutService:CheckoutService) { }

	ngOnInit(): void {

		this.cart.getProducts().subscribe(res => {
			
			this.products = res;

			let data = JSON.parse(localStorage.getItem('productsData'));  //object of products getting added to shopping cart and stored in localstorage
			
			if (this.products == '') {
				this.products = data;
				// console.log(data);
			}

			let linesInput = this.products.map(item => {
				const itemQty = item.quantity;
				const itemVariantId = item.productVariantId;
				const itemPrice = item.price;
	
				return { itemQty, itemVariantId, itemPrice };
			})

			this.checkoutLineInput = linesInput;
			// console.log(this.checkoutLineInput); 
			
		})

		this.show = false;

		this.checkoutform = new FormGroup({
			checkoutInfo: new FormGroup({
				firstName: new FormControl(null, Validators.required),
				lastName: new FormControl(null, Validators.required),
				companyName: new FormControl(null, Validators.required),
				address1: new FormControl(null, Validators.required),
				address2: new FormControl(null, Validators.required),
				city: new FormControl(null, Validators.required),
				cityArea: new FormControl(null, Validators.required),
				zipCode: new FormControl(null, Validators.required),
				country: new FormControl(null, Validators.required),
				countryArea: new FormControl(null, Validators.required),
				email: new FormControl(null, [Validators.required, Validators.email]),
				state: new FormControl(null, Validators.required),
			})
		});
		// let AddressInput = this.checkoutInfo.value

		this.checkoutService.getLineInput();
	}

	// saveData(checkoutform:NgForm){
	// 	this.checkoutform = checkoutform.value;

	// 	const addressInput = Object.assign(this.finalData, checkoutform.value);
		
	// 	Object.keys(addressInput).forEach(function (key){
	// 		// console.log(addressInput[key]);
	// 		const result = [
	// 			{
	// 				'firstName':addressInput[key].firstName,
	// 				'lastName':addressInput[key].lastName,
	// 				'streetAddress1':addressInput[key].address1,				
	// 				'streetAddress2':addressInput[key].address2,
	// 				'city':addressInput[key].city,
	// 				'postalCode':addressInput[key].zipCode,
	// 				'country':addressInput[key].country,
	// 				'phone':addressInput[key].mobileNo,
	// 			}
	// 		]
	// 		console.log(result);
			
	// 	});
	// }


	showDiv() {
		this.show = !this.show;
	}

	onCheckOut(checkoutData:any){
		this.checkoutform1 = checkoutData;

		// this.checkoutService.onSubscribing(this.checkoutform1);

		this.checkoutService.onCheckout(this.checkoutform1).subscribe(data => {
			this.checkoutUsersData = data;
			console.log(this.checkoutUsersData);
			
			this.router.navigate(['/order-successful']);
			localStorage.removeItem('productsData');

		})
	}


	// onSubmit(){
	// 	console.warn(this.checkoutform.value);
	// }


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
