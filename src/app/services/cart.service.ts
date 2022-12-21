import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { Apollo, gql } from 'apollo-angular'
import { BehaviorSubject } from "rxjs";

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
    
    public cartItemList : any = []
    public productList = new BehaviorSubject<any>([]);


    constructor(private http: HttpClient, private apollo: Apollo){}

    ngOnInit(): void {

    }

    getProducts(){
        return this.productList.asObservable();
    }

    setProducts(product:any){
        this.cartItemList.push(...product);
        this.productList.next(product);
    }


    addCart(product:any){
        this.cartItemList.push(product);
        this.productList.next(this.cartItemList);
        this.getTotalPrice();
        console.log(this.cartItemList);
        
    }

    getTotalPrice(): number{
        let grandTotal = 0;
        this.cartItemList.map((a:any)=> {
            grandTotal += a.total;
        })
        return grandTotal;
    }

    removeCartItem(product:any){
        this.cartItemList.map((a:any, index:any) => {
            if(product.id === a.id){
                this.cartItemList.splice(index,1);
            }
        })
        this.productList.next(this.cartItemList);
    }



}