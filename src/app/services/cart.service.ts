import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { Apollo, gql } from 'apollo-angular'
import { BehaviorSubject, Subject } from "rxjs";

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

    public cartItemList: any = []
    public productList = new BehaviorSubject<any>([]);

	checkoutLineInputs: any[];

    items: any = [];
    productCount: any = 0;
    emitQty = new Subject<any>();


    constructor(private http: HttpClient, private apollo: Apollo) { }

    ngOnInit(): void {

    }

    getAddToCart() {
        return this.apollo.mutate({
            mutation: gql`
                mutation CheckoutCreate($input: CheckoutCreateInput!) {
                    checkoutCreate(input: $input) {
                        checkout {
                            token
                        }
                        errors {
                            field
                            code
                        }
                    }
                    }
		  `,
            variables: {
                token: 'd0ec1cd4-1f3b-4d28-bebf-3f0abbfff02c',
            }

        })
    }

    getAddProductsToCart(product:any){
        // this.getAddToCart().subscribe(data => {
        //     console.log(data);
            
        // })

        // return this.apollo.mutate({
        //     mutation: gql`
        //     mutation AddProduct($token: UUID, $lines: [CheckoutLineInput!]!) {
        //         checkoutLinesAdd(token: $token, lines: $lines) {
        //           checkout {
        //             id
        //             lines {
        //               id
        //             }
        //           }
        //         }
        //     }
		//   `,
        //   variables: {
        //     token: 'd0ec1cd4-1f3b-4d28-bebf-3f0abbfff02c',
        //     lines: [
        //       { quantity: 1, variantId: product['node']['variants'][0]['id']}
        //     ],
        //   },
        // })

        
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

        for(let i in this.cartItemList){
            if(this.cartItemList[i].productId ===  product.prodId){
                this.cartItemList[i].quantity++
                productExists = true
                break;
            }
        }
		
		if(!productExists){
			this.cartItemList.push({
                productId: product.prodId,
                productImg:product.prodImg,
                productName: product.prodName,
                quantity:1,
                productTotal:product.total,
                price: product.prodAmount,
                productVariantId: product.variantId

            })
		}

        // console.log(this.cartItemList);


        this.productList.next(this.cartItemList);
        this.getTotalPrice();

        let linesInput = this.cartItemList.map(item => {
			const itemQty =  item.quantity;
            const itemVariantId = item.variantId;
            const itemPrice = item.prodAmount;

            return {itemQty,itemVariantId,itemPrice};
			
		})

        this.checkoutLineInputs = linesInput;
        // console.log(this.checkoutLineInputs);
        

		// localStorage.setItem('productsData',JSON.stringify (this.cartItemList));
		// var productData = JSON.parse(localStorage.getItem('productsData'));
        
        // console.log(this.cartItemList);

    }

    // totalItemsCount(items:any){
    //     console.log(items);
        
    //     this.productCount = 0;
        
    //     const totalCount = this.cartItemList.filter((item:any) => {
    //         // console.log(item);
    //         this.productCount = +this.productCount + +item.quantity
    //     })
    //     // console.log(this.productCount);

    //     this.emitQty.next(this.productCount)
        
    // }

    totalItemsCount(items:any){
        console.log(items);
         
        this.productCount = 0;
        const totalCount = this.items.filter((item:any) => {
            this.productCount = +this.productCount + +item.quantity
        })
        console.log(this.productCount);
        
        this.emitQty.next(this.productCount)

    } 


    getTotalPrice(): number {
        let grandTotal = 0;
        this.cartItemList.map((a: any) => {
            grandTotal += a.total;
        })
        return grandTotal;
    }

    removeCartItem(product: any) {
        this.cartItemList.map((a: any, index: any) => {
            if (product.prodId === a.prodId) {
                this.cartItemList.splice(index, 1);
            }
            // console.log(product.prodId);
            
        })
        this.productList.next(this.cartItemList);
    }



}