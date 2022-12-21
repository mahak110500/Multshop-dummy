import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AutheService } from 'src/app/services/au-th.service';
import { AuthResponseData, AuthService } from 'src/app/services/auth.service';
import { Apollo, gql } from 'apollo-angular';
import { Router } from '@angular/router';


@Component({
	selector: 'app-auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

	isLoginMode = true;

	allUsers:any;
	allLoginUsers:any ;

	authForm: any = {}
	loginForm: any = {}

	constructor(private authService: AuthService, private apollo: Apollo,private router:Router) { }

	ngOnInit(): void {
	}

	onSwitchMode() {
		this.isLoginMode = !this.isLoginMode;
	}

	onSubmit(authForm:NgForm) {
		this.authForm = authForm.value;
		
		this.authService.signUp(this.authForm).subscribe(data => {
			console.log(data);
			this.allUsers = data;
			// this.router.navigate(['/home']);
			
			
		})
	
	}


	onSubmitLogin(loginForm: NgForm, email:string, password:string, token:string){
		this.loginForm = loginForm.value;
		
		this.authService.login(this.loginForm).subscribe(data => {
			console.log(data);
			this.allLoginUsers = data;
			console.log(this.allLoginUsers);
			
			this.router.navigate(['/home']);
			
		})

		localStorage.setItem('userData',JSON.stringify (this.allLoginUsers));
			
	}



}
