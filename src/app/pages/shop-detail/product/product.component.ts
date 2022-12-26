import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular'
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Query } from 'src/app/models/product-list.model';
import { CartService } from 'src/app/services/cart.service';


@Component({
	selector: 'app-product',
	templateUrl: './product.component.html',
	styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
	allProducts: any;
	productAddedList: any[];


	constructor(private apollo: Apollo, private cart:CartService) { }

	ngOnInit(): void {

		this.apollo.watchQuery<Query>({
			query: gql`
			query  {
				products(
				  first: 1
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
						// console.log(item);

						const prodId = item.node.id;
						const prodName = item.node.name; //name
						const prodCurrency = item.node.pricing.priceRange.start.currency; //currency
						const prodAmount = item.node.pricing.priceRange.start.net.amount; //amount
						const prodImg = item.node.thumbnail.url; //image

						const variantId = item.node.variants[0].id;

						const prodRating = item.node.rating; //rating

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

	customOptions: OwlOptions = {

		loop: true,
		mouseDrag: true,
		touchDrag: false,
		pullDrag: true,
		dots: false,
		navSpeed: 600,
		autoplay:true,
		autoplayTimeout:3000,
		navText: ["<div class='nav-button owl-prev'>‹</div>", "<div class='nav-button owl-next'>›</div>"],
		responsive: {
			0: {
				items: 1
			},
			400: {
				items: 1
			},
			740: {
				items: 1
			},
			940: {
				items: 1
			}
		},
		nav: true
	}

	addToCart(item: any) {
		// console.log(item);
		this.cart.addCart(item);
	}


}
