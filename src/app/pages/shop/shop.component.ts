
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
	newProductsList: any;

	cartNumber: number = 0;
	public category: any;

	rating: any;
	form: FormGroup;
	categoryInfo: any;

	p: number = 1;
	// collection: any[] = this.productAddedList; 


	// product: Observable<Products[]>;

	constructor(private apollo: Apollo, private fb: FormBuilder, private cart: CartService) {
		this.form = this.fb.group({
			rating: ['4', Validators.required],
		})
	}

	ngOnInit(): void {
		this.cart.getDisplayProducts();
		this.cart.getDisplayFiltered();

		// this.filter(this.category);
		this.cart.productSubject.subscribe(res => {
			
			this.productList = res;
			// this.newProductsList = res;
			// this.categoryInfo = this.productList.map(obj => this.category = obj.category);

		
		});



		// this.cart.getProducts().subscribe(res => {
		// 	this.products = res;

		// 	let data = JSON.parse(localStorage.getItem('productsData'));  //object of products getting added to shopping cart and stored in localstorage

		// 	if (this.products == '') {
		// 		this.products = data;
		// 	}
		// })

		

	}

	addToCart(item: any) {
		this.cart.addCart(item);

		this.cart.getCartQty(this.products);
		this.cart.cartNumberFunction();
		// this.cart.getCartQty(this.products);
		// console.log(this.products);

	}

	filter(){

		this.cart.FilterSubject.subscribe(res => {
			
			this.newProductsList = res;
			console.log(this.newProductsList);
			
			// this.categoryInfo = this.productList.map(obj => this.category = obj.category);

		
		});


	 	// var response: any = [];
	 	// //  this.newProductsList = this.productList


		// this.cart.getFilteredProducts().valueChanges
		// 	.subscribe(({data}) => {
		// 		this.newProductsList = data;
		// 		this.newProductsList = data.products;
	 	// 		this.newProductsList = this.newProductsList.edges;

		// 		this.newProductsList 
		// 			.forEach((element:any) => {
		// 				let categoryName = element.node.category.name;

		// 				if(categoryName == category || category == ''){
		// 					response.push(element);
							
		// 				}
		// 		}); 
				
		// 	})

		// console.log(response);
		// this.newProductsList = response;
		
		
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








