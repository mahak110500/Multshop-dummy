
import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular'
import { Query } from 'src/app/models/product-list.model';
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

	rating: any;

	form: FormGroup;

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
					// console.log(data);

					this.allProducts = data.products;
					this.allProducts = this.allProducts.edges;

					let iterableProducts = this.allProducts.map(item => {
						// console.log(item);

						const prodId = item.node.id;
						const prodName = item.node.name; //name
						const prodCurrency = item.node.pricing.priceRange.start.currency; //currency
						const prodAmount = item.node.pricing.priceRange.start.net.amount; //amount
						const prodImg = item.node.thumbnail.url; //image
						const prodRating = item.node.rating; //rating

						const variantId = item.node.variants[0].id;

						// console.log(prodRating);

						return { prodId, prodName, prodAmount, prodImg, prodRating, variantId };

					});

					this.productAddedList = iterableProducts;
					// console.log(this.productAddedList);

					//for adding quantity and amount to the productsArray
					this.productAddedList.forEach((a: any) => {
						Object.assign(a, { quantity: 1, total: a.prodAmount })
					});

				})

	}

	addToCart(item: any) {
		this.cart.addCart(item);
		this.cartNumberFunction();
	}

	cartNumber: number = 0;
	cartNumberFunction() {
		var cartValue = JSON.parse(localStorage.getItem('productsData'));
		this.cartNumber = cartValue.length;

		this.cart.cartSubject.next(this.cartNumber);

	}


}








