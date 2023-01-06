import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
	menuType:string = "default";
	constructor(private route: Router) { }

	ngOnInit(): void {
		// this.route.events.subscribe((val: any) => {
		// 	console.log(val.url);
		// 	if (val.url) {
		// 		console.log(val.url);
		// 		if(localStorage.getItem('userData') && val.url.includes('userData')){
		// 			console.log('in seller area');
		// 			this.menuType = "userData";
		// 		}else{
		// 			console.warn('outside seller area');
		// 			this.menuType = "default";
		// 		}

		// 	}
		// })
	}


}
