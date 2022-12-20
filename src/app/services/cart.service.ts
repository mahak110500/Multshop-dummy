import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { Apollo, gql } from 'apollo-angular'

const ADD_PRODUCTS = gql `
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
    allProducts: any[] = [];
    error: any;


    constructor(private http: HttpClient, private apollo: Apollo){}

    ngOnInit(): void {

    }

    // addProducts(){
    //     this.apollo.mutate({
    //         mutation: ADD_PRODUCTS,
            
    //       }).subscribe(({data}: any) => {
    //         this.cartProducts = data.AddProduct;
    //         console.log(this.cartProducts);
            
    //       }
    //       , (error) => {
    //         this.error = error;
    //       }
    //       );
    // }

    getAddToCart(){
        this.apollo.mutate({
            mutation: ADD_PRODUCTS,

        }) .subscribe (
            ({data}:any) => {
                this.allProducts = data.AddProduct;
                console.log(this.allProducts);
                
            },
            (error) => {
                this.error = error;
            }
        )
    }




}