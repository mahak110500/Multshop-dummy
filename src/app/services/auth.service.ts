import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, throwError } from "rxjs";
import { Apollo, gql } from 'apollo-angular';
import { NgForm } from "@angular/forms";


export interface AuthResponseData{
    kind:string;
    idToken:string;
    email:string;
    refreshToken:string;
    expiresIn:string;
    localId: string;
    registered?: boolean;
}

@Injectable({
    providedIn: 'root'
})

export class AuthService {

	authForm: any;

    constructor(private http: HttpClient, private apollo: Apollo){}

    signUp(authForm){
        // this.authForm = authForm.value;
        console.log(authForm);

        

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
        // .subscribe(({ data }) => {
		// 	console.log(data);

		// 	// let users = Object.assign([], this.allUsers);
		// 	// users.unshift(data["accountRegister"]);
		// 	// this.allUsers = users;

		// })


    }


    // signUp(email:string, password:string ){
    //    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDmKk9u8veuFAy8CaFlnYhZAJJUd3QybCg',
    //         {
    //             email: email,
    //             password: password,
    //             returnSecuredToken:true
    //         }
    //     )
    //     .pipe(
    //         catchError(this.handleErrors)
    //     );
    // }


    // login(email:string, password:string){
    //    return this.http.post<AuthResponseData>(
    //         'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDmKk9u8veuFAy8CaFlnYhZAJJUd3QybCg',
    //         {
    //             email: email,
    //             password: password,
    //             returnSecuredToken:true
    //         }
    //     )
    //     .pipe(
    //         catchError(this.handleErrors)
    //     );
    // }


    private handleErrors(errorRes:HttpErrorResponse){
        let errorMessage = 'An unknown error occured';

        if(!errorRes.error || !errorRes.error.error){
            return throwError(errorMessage);
        }
        switch(errorRes.error.error.message){
            case 'EMAIL_EXISTS':
            errorMessage = 'This email already exists';
            break;

            case 'EMAIL_NOT_FOUND':
            errorMessage = 'This email does not exists';
            break;

            case 'INVALID_PASSWORD':
            errorMessage = 'This email already exists';
            break;

        }
        return throwError(errorMessage);
    }

}