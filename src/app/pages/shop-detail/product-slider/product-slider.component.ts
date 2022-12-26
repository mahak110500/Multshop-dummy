import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular'
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Query } from 'src/app/models/product-list.model';

@Component({
	selector: 'app-product-slider',
	templateUrl: './product-slider.component.html',
	styleUrls: ['./product-slider.component.css']
})
export class ProductSliderComponent implements OnInit {
	allProducts: any;
	productAddedList: any[];

	constructor(private apollo: Apollo) { }

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
						// console.log(item);

						const prodId = item.node.id;
						const prodName = item.node.name; //name
						const prodCurrency = item.node.pricing.priceRange.start.currency; //currency
						const prodAmount = item.node.pricing.priceRange.start.net.amount; //amount
						const prodImg = item.node.thumbnail.url; //image

						const variantId = item.node.variants[0].id;

						const prodRating = item.node.rating; //rating
						// console.log(prodRating);


						return { prodId, prodName, prodAmount, prodImg, prodRating, variantId };


					});

					this.productAddedList = iterableProducts;
					console.log(this.productAddedList);

					//for adding quantity and amount to the productsArray
					this.productAddedList.forEach((a: any) => {
						Object.assign(a, { quantity: 1, total: a.prodAmount })
					});

				})

	}


	customOptions: OwlOptions = {
		loop: true,
		mouseDrag: false,
		touchDrag: false,
		pullDrag: false,
		dots: false,
		navSpeed: 600,
		autoplay:true,
		autoplayTimeout:3000,
		navText: ['&#8249', '&#8250;'],
		responsive: {
		  0: {
			items: 1 
		  },
		  400: {
			items: 2
		  },
		  760: {
			items: 3
		  },
		  1000: {
			items: 4
		  }
		},
		nav: false
	  }

}
