import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-first',
  templateUrl: './header-first.component.html',
  styleUrls: ['./header-first.component.css']
})
export class HeaderFirstComponent implements OnInit {

	isLoginMode = true;


  constructor() { }

  ngOnInit(): void {
  }


  // onSwitchMode() {
	// 	this.isLoginMode = !this.isLoginMode;
	// }

}
