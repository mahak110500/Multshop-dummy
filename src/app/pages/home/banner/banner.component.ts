import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  customOptions: OwlOptions = {
		loop: true,
		mouseDrag: false,
		touchDrag: false,
		pullDrag: false,
		dots: false,
		navSpeed: 600,
		autoplay:true,
		autoplayTimeout:3000,
		navText: ['&#8249', '&#8250;'],
		responsive: {
		  0: {
			items: 1 
		  },
		  400: {
			items: 1
		  },
		  760: {
			items: 1
		  },
		  1000: {
			items: 1
		  }
		},
		nav: false
	  }


}
