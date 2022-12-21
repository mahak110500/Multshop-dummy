import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header-first',
  templateUrl: './header-first.component.html',
  styleUrls: ['./header-first.component.css']
})
export class HeaderFirstComponent implements OnInit {

	isLoginMode = true;

  formName;
  method;
  


  constructor(private activatedRoute: ActivatedRoute, private route:Router) { }

  ngOnInit(): void {
    // this.formName = this.activatedRoute.snapshot.paramMap.get('name');

    // this.formName = this.activatedRoute.paramMap.subscribe((params) => {
    //   console.log(params);
    //   this.method = params.get('name');
      
    // })

  }

}
