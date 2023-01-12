
import { Component, OnInit } from '@angular/core';
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
	productAddedList: any[];
	filterCategory: any;
	cartNumber: number = 0;

	rating: any;
	form: FormGroup;

	p: number = 1;
	// collection: any[] = this.productAddedList; 
	

	// product: Observable<Products[]>;

	constructor(private apollo: Apollo, private fb: FormBuilder, private cart: CartService) {
		this.form = this.fb.group({
			rating: ['4', Validators.required],
		})

	}

	ngOnInit(): void {

		this.cart.displayProductList().valueChanges
			.subscribe(
				({ data }) => {
					console.log(data);

					this.allProducts = data.products;
					this.allProducts = this.allProducts.edges;

					let iterableProducts = this.allProducts.map(item => {
						// console.log(item);

						const prodId = item.node.id;
						const prodName = item.node.name; //name
						const prodAmount = item.node.pricing.priceRange.start.net.amount; //amount
						const prodImg = item.node.thumbnail.url; //image
						const prodRating = item.node.rating; //rating

						const variantId = item.node.variants[0].id;
						const category = item.node.category.name;

						// console.log(prodRating);

						return { prodId, prodName, prodAmount, prodImg, prodRating, variantId, category};

					});
					

					this.productAddedList = iterableProducts;
					// console.log(this.productAddedList);

					//for filtering category
					this.filterCategory = iterableProducts;
					console.log(this.filterCategory);
					

					//for adding quantity and amount to the productsArray
					this.productAddedList.forEach((a: any) => {
						Object.assign(a, { quantity: 1, total: a.prodAmount })
					});
					
				})

		this.cart.getProducts().subscribe(res => {
			this.products = res;

			let data = JSON.parse(localStorage.getItem('productsData'));  //object of products getting added to shopping cart and stored in localstorage
			
			if (this.products == '') {
				this.products = data;
			}
		})
		
	}

	addToCart(item: any) {
		this.cart.addCart(item);

		this.cart.getCartQty(this.products);
		this.cart.cartNumberFunction();
		// this.cart.getCartQty(this.products);
		// console.log(this.products);

	}

	
	filter(category:string){
		this.filterCategory = this.productAddedList
		.filter((a:any) => {
			if(a.category == category || category == ''){
				return a;
			}
		})
	}

}








