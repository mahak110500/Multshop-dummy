import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AutheService } from 'src/app/services/au-th.service';
import { AuthResponseData, AuthService } from 'src/app/services/auth.service';
import { Apollo, gql } from 'apollo-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';


@Component({
	selector: 'app-auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

	isSellerLoggedIn = new BehaviorSubject<boolean>(false);

	formName;
	method;
	isLoginMode = true;

	allUsers:any;
	allLoginUsers:any ;

	authForm: any = {}
	loginForm: any = {}

	constructor(private authService: AuthService, private apollo: Apollo,private router:Router,private activatedRoute:ActivatedRoute) { }


	ngOnInit(): void {

		this.formName = this.activatedRoute.paramMap.subscribe((params) => {
			this.method = params.get('name');
			// console.log(this.method);

			if(this.method == 'login'){
				this.isLoginMode = true;
			}
			else {
				this.isLoginMode = false;
			} 

		  })

		this.authService.reloadSeller();
		
	}

	onSubmit(authForm:NgForm) {
		this.authForm = authForm.value; 
		
		this.authService.signUp(this.authForm).subscribe(data => {
			console.log(data);
			this.allUsers = data;

			window.alert("You've signed-up successfully.Proceed for login!");
		})
	
	}


	onSubmitLogin(loginForm: NgForm){
		this.loginForm = loginForm.value;

		this.authService.login(this.loginForm);
		
		// this.authService.login(this.loginForm).subscribe(data => {
		// 	this.authService.isSellerLoggedIn.next(true);  //for authGuard

		// 	this.allLoginUsers = data;

		// 	localStorage.setItem('userData',JSON.stringify (this.allLoginUsers));
		// 	var currentUser = JSON.parse(localStorage.getItem('userData'));
			
		// 	this.router.navigate(['/home']);
			
		// }) 
		
		// var token = userData.token;
			
	}

	// reloadSeller(){
	// 	if(localStorage.getItem('userData')){
	// 		this.authService.isSellerLoggedIn.next(true);  //for authGuard
	// 		this.router.navigate(['/home']);
	// 	}
	// }

	openLogin(){
		this.isLoginMode = true;
	}

	openSignup(){
		this.isLoginMode = false;
	}



}
