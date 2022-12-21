import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { Apollo, gql } from 'apollo-angular'
import { BehaviorSubject } from "rxjs";

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

    getAddProductsToCart(){
        return this.apollo.mutate({
            mutation: gql`
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
		  `,
          variables: {
            token: 'd0ec1cd4-1f3b-4d28-bebf-3f0abbfff02c',
            lines: [
            //   { quantity: 1, variantId: product['node']['variants'][0]['id']},
            ],
          },
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
        this.cartItemList.push(product);
        this.productList.next(this.cartItemList);
        this.getTotalPrice();
        console.log(this.cartItemList);

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
            if (product.id === a.id) {
                this.cartItemList.splice(index, 1);
            }
        })
        this.productList.next(this.cartItemList);
    }



}