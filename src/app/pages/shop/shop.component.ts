
import { Component, DoCheck, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';


@Component({
	selector: 'app-shop',
	templateUrl: './shop.component.html',
	styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
	error: any;
	product: any;
	public products: any = [];

	allProducts: any;
	productList: any;
	arrays: any;
	newProductsList: any;

	cartNumber: number = 0;
	public category: any;

	rating: any;
	form: FormGroup;
	categoryInfo: any;

	p: number = 1;

	//Price Filter
	tempPriceArray: any = [];
	newPriceArray: any = [];

	//category filter
	tempArray: any = [];
	newArray: any = [];




	// product: Observable<Products[]>;

	constructor(private apollo: Apollo, private fb: FormBuilder, private cart: CartService) {
		this.form = this.fb.group({
			rating: ['4', Validators.required],
		})
	}

	ngOnInit(): void {
		this.cart.getDisplayProducts();

		// this.filter(this.category);
		this.cart.productSubject.subscribe(res => {

			console.log(res);

			this.productList = res;
			this.arrays = res;

			// this.newProductsList = res;
			// this.categoryInfo = this.productList.map(obj => this.category = obj.category);


		});

		this.cart.getProducts().subscribe(res => {
			this.products = res; //array of products getting added to cart

			let data = JSON.parse(localStorage.getItem('productsData'));  //object of products getting added to shopping cart and stored in localstorage

			if (this.products == '') {
				this.products = data;
			}

		});


	}

	addToCart(item: any) {
		this.cart.addCart(item);

		this.cart.getCartQty(this.products);
		this.cart.cartNumberFunction();
		// this.cart.getCartQty(this.products);
		// console.log(this.products);

	}

	filter(category) {
		// console.log(category);


		// this.cart.FilterSubject.subscribe(res => {
		// 	this.newProductsList = res;
		// 	console.log(this.newProductsList);

		// 	// this.categoryInfo = this.productList.map(obj => this.category = obj.category);
		// });


		// var response: any = [];

		// this.cart.getFilteredProducts().valueChanges
		// 	.subscribe(({ data }) => {
		// 		this.newProductsList = data.products;
		// 		this.newProductsList = this.newProductsList.edges;


		// 		let iterableProducts = this.newProductsList.map(item => {

		// 			const prodId = item.node.id;
		// 			const prodName = item.node.name; //name
		// 			const prodAmount = item.node.pricing.priceRange.start.net.amount; //amount
		// 			const prodImg = item.node.thumbnail.url; //image
		// 			const prodRating = item.node.rating; //rating

		// 			const variantId = item.node.variants[0].id;
		// 			const category = item.node.category.name;

		// 			return { prodId, prodName, prodAmount, prodImg, prodRating, variantId, category};

		// 		});

		// 		this.newProductsList = iterableProducts;

		// 		this.newProductsList
		// 			.forEach((element: any) => {
		// 				if (element.category == category || category == '') {
		// 					response.push(element);
		// 				}
		// 			});

		// 	})

		// this.newProductsList = response;
		// this.productList = this.newProductsList;
		// console.log(this.productList);


	}


	//category filter
	onFilter(event: any) {

		if (event.target.checked) {
			this.tempArray = this.arrays.filter((e: any) => e.category == event.target.value);

			this.productList = [];

			this.newArray.push(this.tempArray);

			for (let i = 0; i < this.newArray.length; i++) {
				var firstArray = this.newArray[i];
				for (let i = 0; i < firstArray.length; i++) {
					var obj = firstArray[i];
					this.productList.push(obj);
				}
			}

		} else {
			this.tempArray = this.productList.filter((e: any) => e.category != event.target.value);
			this.newArray = [];
			this.productList = [];

			this.newArray.push(this.tempArray);
			for (let i = 0; i < this.newArray.length; i++) {
				var firstArray = this.newArray[i];
				for (let i = 0; i < firstArray.length; i++) {
					var obj = firstArray[i];
					this.productList.push(obj);
				}
			}
			console.log(this.newArray);

		}

	}

	//Price Filter
	value1 = [15,14,13,12,11,10];
	value2 = [10,9,8,7,6,5];
	onFilterPrice(event: any) {
		var response: any = [];

		if (event.target.checked) {
			console.log(this.arrays);
			

			// this.tempPriceArray = this.arrays.filter((e:any) => {
			// 	if(e.prodAmount > 10 && e.prodAmount <= 15){
			// 		// console.log(e.prodAmount);
			// 		this.tempPriceArray = this.arrays.filter((e: any) => e.prodAmount == event.target.value);
			// 		console.log(this.tempPriceArray);
			// 	} else if (e.prodAmount > 5 && e.prodAmount <= 10) {
			// 		this.tempPriceArray = this.arrays.filter((e: any) => e.prodAmount == event.target.value);
						
			// 	} else if (e.prodAmount > 0 && e.prodAmount <= 5) {
			// 		this.tempPriceArray = this.arrays.filter((e: any) => e.prodAmount == event.target.value);
						
			// 	}
				
			// });

			
			
			// if (this.arrays.prodAmount > 10 && this.arrays.prodAmount <= 15) {
			// 	this.tempPriceArray = this.arrays.filter((e: any) => e.prodAmount == event.target.value);
			// 	console.log('aaa');
			// } else if (this.arrays.prodAmount > 5 && this.arrays.prodAmount <= 10) {
			// 	this.tempPriceArray = this.arrays.filter((e: any) => e.prodAmount == event.target.value);
			// 	console.log('bbb');

			// } else if (this.arrays.prodAmount > 0 && this.arrays.prodAmount <= 5) {
			// 	this.tempPriceArray = this.arrays.filter((e: any) => e.prodAmount == event.target.value);
			// 	console.log('ccc');

			// }

			this.productList = [];

			this.newPriceArray.push(this.tempPriceArray);

			for (let i = 0; i < this.newPriceArray.length; i++) {
				var firstPriceArray = this.newPriceArray[i];
				for (let i = 0; i < firstPriceArray.length; i++) {
					var priceObj = firstPriceArray[i];
					this.productList.push(priceObj);
				}
				
			}
			


		} else {
			this.tempPriceArray = this.productList.filter((e: any) => e.prodAmount != event.target.value);

			this.newPriceArray = [];
			this.productList = [];

			this.newPriceArray.push(this.tempPriceArray);
			for (let i = 0; i < this.newPriceArray.length; i++) {
				var firstPriceArray = this.newPriceArray[i];
				for (let i = 0; i < firstPriceArray.length; i++) {
					var priceObj = firstPriceArray[i];
					this.productList.push(priceObj);
				}
			}
			console.log(this.productList);


		}

	}





	// filter(category) {
	// 	var response: any = []
	// 	 this.newProductsList = this.productList
	// 		.forEach((element:any) => {
	// 			if(element.category == category || category == ''){
	// 					response.push(element);
	// 			}
	// 		}); 

	// 	this.newProductsList = response;
	// 	localStorage.setItem('filteredData', JSON.stringify(this.newProductsList));;

	// }




}








