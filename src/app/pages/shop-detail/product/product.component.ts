import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular'
import { Query } from 'src/app/models/product-list.model';


@Component({
	selector: 'app-product',
	templateUrl: './product.component.html',
	styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
	allProducts: any;
	productAddedList: any[];


	constructor(private apollo: Apollo) { }

	ngOnInit(): void {

		this.apollo.watchQuery<Query>({
			query: gql`
			query  {
				products(
				  first: 4
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
				// console.log(this.productAddedList);

				//for adding quantity and amount to the productsArray
				this.productAddedList.forEach((a: any) => {
					Object.assign(a, { quantity: 1, total: a.prodAmount })
				});

			})

	}

}
