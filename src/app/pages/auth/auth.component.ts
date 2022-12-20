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

	authForm: any = {}

	constructor(private authService: AuthService, private apollo: Apollo) { }

	ngOnInit(): void {
	}

	onSwitchMode() {
		this.isLoginMode = !this.isLoginMode;
	}

	onSubmit(authForm: NgForm) {
		this.authForm = authForm.value;
		console.log(this.authForm.email + '  ' + this.authForm.password+ '  ' +this.authForm.firstname + '  ' +this.authForm.lastname);


		this.apollo.mutate({
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
		.subscribe(({ data }) => {
			console.log(data);
		})
	
	}

	



}
