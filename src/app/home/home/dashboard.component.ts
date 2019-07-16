import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  public currentIndex: string;
  public currentPage: string;


  constructor(private router: Router, private activatedRoute: ActivatedRoute) {

    this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    });
  }

  ngOnInit() {

  }

  initialiseInvites() {
    this.currentIndex = this.router.url.split('/')[1];
    this.currentPage = this.router.url.split('/')[2];
  }


}
