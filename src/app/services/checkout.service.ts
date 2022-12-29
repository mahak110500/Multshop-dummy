import { Injectable } from "@angular/core";
import { Apollo, gql } from 'apollo-angular';
import { CartService } from "./cart.service";


@Injectable({
	providedIn: 'root'
})

export class CheckoutService{
    checkoutform: any;
	public products: any = [];
	checkoutLineInput: any[];
	finalData = {};
    checkoutAddressInputs = {};

    

    constructor(private apollo: Apollo, private cart:CartService){}

    ngOnInit(){
        this.cart.getProducts().subscribe(res => {
			
			this.products = res;

			let data = JSON.parse(localStorage.getItem('productsData'));  //object of products getting added to shopping cart and stored in localstorage
			
			if (this.products == '') {
				this.products = data;
				console.log(data);
			}

			let linesInput = this.products.map(item => {
				const itemQty = item.quantity;
				const itemVariantId = item.productVariantId;
				const itemPrice = item.price;
	
				return { itemQty, itemVariantId, itemPrice };
			})

			this.checkoutLineInput = linesInput;
			console.log(this.checkoutLineInput);
			
		});
    }

    onCheckout(checkoutData){
        this.checkoutform = checkoutData;
        // console.log(this.checkoutform);

		const addressInput = Object.assign(this.finalData, this.checkoutform);
        

        // let iterableInputs = Object.keys(addressInput).forEach(function (key){
		// 	// console.log(addressInput[key]);
		// 	const result = [
		// 		{
		// 			'firstName':addressInput[key].firstName,
		// 			'lastName':addressInput[key].lastName,
		// 			'streetAddress1':addressInput[key].address1,				
		// 			'streetAddress2':addressInput[key].address2,
		// 			'city':addressInput[key].city,
		// 			'postalCode':addressInput[key].zipCode,
		// 			'country':addressInput[key].country,
		// 			'phone':addressInput[key].mobileNo,
                    
		// 		}
            
		// 	]
		// 	console.log(result);
           
		// });

        // let checkoutAddressInputs = iterableInputs;
        // console.log(checkoutAddressInputs);

        return this.apollo.mutate({
			mutation:  gql`
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
				"input": {
                    channel: "default-channel",
                    email: "customer@example.com",
                    lines: [{ quantity: 1, variantId: "UHJvZHVjdFZhcmlhbnQ6Mjk3" }],
                    shippingAddress: { country: 'US' },
                    billingAddress: { postalCode: "XX-YYY", country: 'US' },
                    validationRules: {
                        shippingAddress: { checkRequiredFields: false },
                        billingAddress: { checkRequiredFields: false, checkFieldsFormat: false },
                    }
				}
			}

		});

    }

    // saveData(checkoutData){
    //     this.checkoutform = checkoutData;
    //     console.log(this.checkoutform);

	// 	const addressInput = Object.assign(this.finalData, this.checkoutform.value);

    //     let iterableInputs = Object.keys(addressInput).forEach(function (key){
	// 		// console.log(addressInput[key]);
	// 		const result = [
	// 			{
	// 				'firstName':addressInput[key].firstName,
	// 				'lastName':addressInput[key].lastName,
	// 				'streetAddress1':addressInput[key].address1,				
	// 				'streetAddress2':addressInput[key].address2,
	// 				'city':addressInput[key].city,
	// 				'postalCode':addressInput[key].zipCode,
	// 				'country':addressInput[key].country,
	// 				'phone':addressInput[key].mobileNo,
                    
	// 			}
            
	// 		]
	// 		console.log(result);
           
	// 	});

    //     let checkoutAddressInputs = iterableInputs;
    //     console.log(checkoutAddressInputs);
        


    // }

}