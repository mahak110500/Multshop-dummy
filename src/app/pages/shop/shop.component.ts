
import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular'
import {  Query } from 'src/app/models/product-list.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';


@Component({
	selector: 'app-shop',
	templateUrl: './shop.component.html',
	styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
	loading = true;
	error: any;

	allProducts: any;
	productAddedList: any[];

	cartData:any;


	currentRate = 0;
	rating:any;

	form: FormGroup;


	// product: Observable<Products[]>;

	constructor(private apollo: Apollo,private fb: FormBuilder, private cart:CartService) {
		this.form = this.fb.group({
			rating: ['4', Validators.required],
		  })
		
	 }

	ngOnInit(): void {

		this.apollo.watchQuery<Query>({
			query: gql`
			query  {
				products(
				  first: 9
				  channel: "default-channel"
				) {
				  edges {
					node {
					  id
					  name
					  rating
					  category {
						name
					  }
					  thumbnail {
						url
					  }
					  pricing {
						priceRange {
						  start {
							currency
							net {
							  amount
							}
						  }
						}
					  }
					  variants {
						id
						name
					  }
					}
				  }
				}
			  }
			  
			`
		})
			.valueChanges
			.subscribe(
				({ data }) => {
					this.allProducts = data.products;
					this.allProducts = this.allProducts.edges;

					 let iterableProducts = this.allProducts.map(item => {
						console.log(item);
						
						const prodId = item.node.id;
						const prodName =  item.node.name; //name
						const prodCurrency = item.node.pricing.priceRange.start.currency; //currency
						const prodAmount = item.node.pricing.priceRange.start.net.amount; //amount
						const prodImg = item.node.thumbnail.url; //image

						const variantId = item.node.variants[0].id;
						
						const prodRating = item.node.rating; //rating
						// console.log(prodRating);
						

						return {prodId,prodName, prodCurrency, prodAmount, prodImg, prodRating,variantId} ;
						
						
					});

					this.productAddedList = iterableProducts;
					console.log(this.productAddedList);

					this.productAddedList.forEach((a:any) => {
						Object.assign(a,{quantity:1, total:a.prodAmount})
					});
					
				})

	}

	addToCart(item:any){
		this.cart.getAddProductsToCart().subscribe(({ data }: any) => {
			this.cartData = data;
		  });

	}



}




