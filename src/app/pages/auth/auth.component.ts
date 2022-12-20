import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AutheService } from 'src/app/services/au-th.service';
import { AuthResponseData, AuthService } from 'src/app/services/auth.service';
import { Apollo, gql } from 'apollo-angular';


@Component({
	selector: 'app-auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

	isLoginMode = true;

	allUsers: User[] = [];
	allLoginUsers:any = [];

	authForm: any = {}
	loginForm: any = {}

	constructor(private authService: AuthService, private apollo: Apollo) { }

	ngOnInit(): void {
	}

	onSwitchMode() {
		this.isLoginMode = !this.isLoginMode;
	}

	onSubmit() {
		
		this.authService.signUp(this.authForm).subscribe(res => {
			console.log(res);
			
		})
		
		// this.authForm = authForm.value;
		// console.log(this.authForm.email + '  ' + this.authForm.password+ '  ' +this.authForm.firstname + '  ' +this.authForm.lastname);


		// this.apollo.mutate({
		// 	mutation: gql`
		// 	mutation accountRegister($input: AccountRegisterInput!) {
		// 		accountRegister(input: $input){
		// 		  user {
		// 			firstName
		// 			lastName
		// 			languageCode
		// 			email
		// 		  }
		// 		}
		// 	}
		//   `,
		// 	variables: {
		// 		"input": {
		// 			firstName: this.authForm.firstname,
		// 			lastName: this.authForm.lastname,
		// 			email: this.authForm.email,
		// 			password: this.authForm.password,
		// 			languageCode: "EN",
		// 			redirectUrl: "http://localhost:4200/product",
		// 			channel: "default-channel"

		// 		}
		// 	}

		// })
		// .subscribe(({ data }) => {
		// 	console.log(data);

		// 	let users = Object.assign([], this.allUsers);
		// 	users.unshift(data["accountRegister"]);
		// 	this.allUsers = users;

		// })
	
	}

	onSubmitLogin(loginForm: NgForm, email:string, password:string){
		this.loginForm = loginForm.value;
		// console.log(this.loginForm);
		console.log(this.loginForm.email + '  ' + this.loginForm.password);



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
				"input": {
					email: this.loginForm.email,
					password: this.loginForm.password,
				}
			}

		})
		.subscribe(({ data }) => {
			console.log(data);

		})

			
	}





}
