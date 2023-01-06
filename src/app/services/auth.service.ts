import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject } from "rxjs";


export interface AuthResponseData {
	kind: string;
	idToken: string;
	email: string;
	refreshToken: string;
	expiresIn: string;
	localId: string;
	registered?: boolean;
}

@Injectable({
	providedIn: 'root'
})

export class AuthService {
 
	authForm: any;
	loginForm: any;
	isSellerLoggedIn = new BehaviorSubject<boolean>(false);

    // user: any = new BehaviorSubject<User | null>(null);


	constructor(private http: HttpClient, private apollo: Apollo, private router:Router) { }

	signUp(formData) {
		this.authForm = formData; 
		console.log(this.authForm);

		return this.apollo.mutate({
			mutation: gql`
			mutation accountRegister($input: AccountRegisterInput!) {
				accountRegister(input: $input){
				  user {
					firstName
					lastName
					languageCode
					email
				  }
				}
			}
		  `,
			variables: {
				"input": {
					firstName: this.authForm.firstname,
					lastName: this.authForm.lastname,
					email: this.authForm.email,
					password: this.authForm.password,
					languageCode: "EN",
					redirectUrl: "http://localhost:4200/product",
					channel: "default-channel"
				}
			}

		})
	}


	login(loginData) {
		this.loginForm = loginData;
		console.log(this.loginForm);

		this.apollo.mutate({
			mutation: gql`
			mutation tokenCreate($email: String!, $password: String!){
				tokenCreate(email: $email, password: $password) {
				  token
				  refreshToken
				  csrfToken
				  user {
					email
				  }
				  errors {
					field
					message
				  }
				}
			  }
		  	`,
			variables: {
				email: this.loginForm.email,
				password: this.loginForm.password
			}

		}).subscribe((result) => {
			this.isSellerLoggedIn.next(true);
			localStorage.setItem('userData',JSON.stringify (result));

			this.router.navigate(['/home']);

		})
	}


	reloadSeller(){
		if(localStorage.getItem('userData')){
			this.isSellerLoggedIn.next(true);
			this.router.navigate(['/home']);
		}
	}


	private handleAuthentication(email: string, userId: string, token: string) {
        // const user = new User(
        //     email,
        //     userId,
        //     token
        // );

        // this.user.next(user);
        // localStorage.setItem('userData', JSON.stringify(user));

    }


}