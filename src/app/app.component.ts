import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import { Router, NavigationStart, Event as NavigationEvent  } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'unico';
  event$;
  dash = false;

  currentRoute;
  constructor(private router: Router) {

  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit(): void {
    AOS.init();
    this.event$
      = this.router.events
          .subscribe(
            (event: NavigationEvent) => {
              if (event instanceof NavigationStart) {
                this.currentRoute = event.url;
                // tslint:disable-next-line:max-line-length
                if (this.currentRoute === '/dashboard' || this.currentRoute === '/dashboardhome' || this.currentRoute === '/manual' || this.currentRoute === '/announcement' || this.currentRoute === '/forms' || this.currentRoute === '/requlations' || this.currentRoute === '/events' || this.currentRoute === '/addannounce' || this.currentRoute === '/hrReport' || this.currentRoute === '/managerReport' || this.currentRoute === '/organizationChart' || this.currentRoute === '/changepass' || this.currentRoute === '/unicoprofile'){
                  this.dash = true;
                  console.log(this.currentRoute);
                }
                else{
                  this.dash = false;
                }
    // console.log(event.url);
              }
            });

  }
}
