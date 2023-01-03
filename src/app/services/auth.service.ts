import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Apollo, gql } from 'apollo-angular';


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

    // user: any = new BehaviorSubject<User | null>(null);


	constructor(private http: HttpClient, private apollo: Apollo) { }

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


		return this.apollo.mutate({
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

		})

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


	// verifyUser(token: string) {

	// 	return this.apollo.mutate({
	// 		mutation: gql`
    //             mutation tokenVerify($token: String!){
    //                 tokenVerify(token: $token) {
    //                   token: String!
    //                 }
    //               }
	// 	  `,
	// 		variables: {
	// 			token: token
	// 		}

	// 	})

	// }


	// private handleErrors(errorRes:HttpErrorResponse){
	//     let errorMessage = 'An unknown error occured';

	//     if(!errorRes.error || !errorRes.error.error){
	//         return throwError(errorMessage);
	//     }
	//     switch(errorRes.error.error.message){
	//         case 'EMAIL_EXISTS':
	//         errorMessage = 'This email already exists';
	//         break;

	//         case 'EMAIL_NOT_FOUND':
	//         errorMessage = 'This email does not exists';
	//         break;

	//         case 'INVALID_PASSWORD':
	//         errorMessage = 'This email already exists';
	//         break;

	//     }
	//     return throwError(errorMessage);
	// }

}