import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AutheService } from 'src/app/services/au-th.service';
import { AuthResponseData, AuthService } from 'src/app/services/auth.service';
import { Apollo, gql } from 'apollo-angular';
import { ActivatedRoute, Router } from '@angular/router';


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

	constructor(private authService: AuthService, private apollo: Apollo,private router:Router,private activatedRoute:ActivatedRoute) { }


	formName;
	method;
	ngOnInit(): void {

		this.formName = this.activatedRoute.paramMap.subscribe((params) => {
			console.log(params);
			this.method = params.get('name');
			console.log(this.method);

		  })
	}

	

	onSubmit(authForm:NgForm) {
		this.authForm = authForm.value;
		
		this.authService.signUp(this.authForm).subscribe(data => {
			console.log(data);
			this.allUsers = data;
			// this.router.navigate(['/home']);
			
			
		})
	
	}


	onSubmitLogin(loginForm: NgForm){
		this.loginForm = loginForm.value;
		
		this.authService.login(this.loginForm).subscribe(data => {
			console.log(data);
			this.allLoginUsers = data;
			console.log(this.allLoginUsers);
			
			this.router.navigate(['/home']);
			
		})

		localStorage.setItem('userData',JSON.stringify (this.allLoginUsers));
		var currentUser = JSON.parse(localStorage.getItem('userData'));

		console.log(currentUser);
		
		// var token = userData.token;
			
	}



}
