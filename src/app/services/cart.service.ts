import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { Apollo, gql } from 'apollo-angular'
import { BehaviorSubject, Subject } from "rxjs";
import { Query } from 'src/app/models/product-list.model';


const ADD_PRODUCTS = gql`
    mutation AddProduct($token: UUID, $lines: [CheckoutLineInput!]!) {
        checkoutLinesAdd(token: $token, lines: $lines) {
        checkout {
            id
            lines {
            id
            }
        }
        }
    }
`

@Injectable({
	providedIn: 'root'
})
export class CartService implements OnInit {
	allProducts: any;
	productAddedList: any[];

	public cartItemList: any = []
	public productList = new BehaviorSubject<any>([]);

	checkoutLineInputs: any[];

	items: any = [];
	productCount: any = 0;
	emitQty = new Subject<any>();

	cartSubject = new Subject<any>();


	constructor(private http: HttpClient, private apollo: Apollo) { }

	ngOnInit(): void {
		this.getCartProductData();
	}

	displayProductList() {
		return this.apollo.watchQuery<Query>({
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

	}





	getProducts() {
		return this.productList.asObservable();
	}

	setProducts(product: any) {
		this.cartItemList.push(...product);
		this.productList.next(product);
	}


	addCart(product: any) {

		// this.cartItemList.push(product);

		let productExists = false;

		for (let i in this.cartItemList) {
			if (this.cartItemList[i].productId === product.prodId) {
				this.cartItemList[i].quantity++
				productExists = true
				break;
			}
		}

		if (!productExists) {
			this.cartItemList.push({
				productId: product.prodId,
				productImg: product.prodImg,
				productName: product.prodName,
				quantity: 1,
				productTotal: product.total,
				price: product.prodAmount,
				productVariantId: product.variantId

			})
		}

		// console.log(this.cartItemList);


		this.productList.next(this.cartItemList);
		this.getTotalPrice();

		let linesInput = this.cartItemList.map(item => {
			const itemQty = item.quantity;
			const itemVariantId = item.variantId;
			const itemPrice = item.prodAmount;

			return { itemQty, itemVariantId, itemPrice };

		})

		this.checkoutLineInputs = linesInput;
		// console.log(this.checkoutLineInputs);

		localStorage.setItem('productsData', JSON.stringify(this.cartItemList));
		var productData = JSON.parse(localStorage.getItem('productsData'));

		// var productQty = JSON.parse(localStorage.getItem('productsData.quantity'));

	}


	getCartProductData() {
		let data = localStorage.getItem('productsData');
		data = JSON.parse(data);  //object of products getting added to shopping cart and stored in localstorage
		console.log(data);

		if (this.items == '') {
			this.items = data
		}
		console.log(this.items);
		
	}



	getTotalPrice(): number {
		let grandTotal = 0;
		this.cartItemList.map((a: any) => {
			grandTotal += a.total;
		})
		return grandTotal;
	}

	

	removeCartItem(product:any,data){
		
		data.map((a: any, index: any) => {
            if (product.productId == a.productId) {
                data.splice(index, 1);
            }
        })
        localStorage.removeItem('productsData');
        localStorage.setItem('productsData', JSON.stringify(data));

        return data;
	}



}