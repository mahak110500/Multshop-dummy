import { Injectable } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
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
    checkoutAddressInputs: any[];
	result:any = [];

	// objInputs: AddressInput = new AddressInput()

    

    constructor(private apollo: Apollo, private cart:CartService,private fb: FormBuilder){}

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
			console.log(linesInput);
			
		});

    }

    onCheckout(checkoutFormData){
		this.checkoutform = checkoutFormData.value.checkoutInfo;
		// console.log(this.checkoutform);


		let addressInputGroup = new FormGroup(
		{
			firstName: new FormControl(this.checkoutform.firstName, Validators.required),
			lastName: new FormControl(this.checkoutform.lastName, Validators.required),
			streetAddress1: new FormControl(this.checkoutform.address1, Validators.required),
			streetAddress2: new FormControl(this.checkoutform.address2, Validators.required),
			city: new FormControl(this.checkoutform.city, Validators.required),
			postalCode: new FormControl(this.checkoutform.zipCode, Validators.required),
			country: new FormControl('IN', Validators.required),
			phone: new FormControl(this.checkoutform.mobileNo, Validators.required),
			companyName: new FormControl('xyz', Validators.required),
			cityArea: new FormControl('London', Validators.required),
			countryArea: new FormControl('England', Validators.required),

		});
		// console.log(addressInputGroup); 

		let objAddress = addressInputGroup.value;
		// console.log(objAddress);
		


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
                    email: this.checkoutform.email,
                    lines: [{ quantity: 1, variantId: "UHJvZHVjdFZhcmlhbnQ6Mjk3" }],
                    shippingAddress: objAddress,
     				billingAddress: objAddress,
					languageCode: "EN",
                    validationRules: {
                        shippingAddress: { checkRequiredFields: true },
                        billingAddress: { checkRequiredFields: true, checkFieldsFormat: true },
                    }
				}
			}

		});
    }

	onSubscribing(data:any){
		// console.log(data);
		// this.onCheckout(data).subscribe(res =>{
		// 	console.log(res);
		// })
	}

    // saveData(checkoutData){
    //     this.checkoutform = checkoutData;
    //     console.log(this.checkoutform);

	// 	const addressInput = Object.assign(this.finalData, this.checkoutform);
	// 	console.log(addressInput);
		

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
	// 		return result;
           
	// 	});

    //     let checkoutAddressInputs = iterableInputs;
    //     console.log(checkoutAddressInputs);
        


    // }

}