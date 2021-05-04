import { AuthService } from './../../auth/auth.service';
import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

// if we want to emit an event (result) , then we can either use EventEmitter (angular core) or subject (from rxjs).
// If we want to subscribe the emitted event in any other component. then we can use subscription(from rxjs).
// if we want to unsubscribe the result after subscription. then we need to call unsubscription onDestroy.  


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Output() sidenavToggle = new EventEmitter();

  isAuth = false;
  authSubscription: Subscription;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authSubscription = this.authService.authChange.subscribe((authStatus) => {
      console.log("authstatus", authStatus);
      this.isAuth = authStatus;
    });
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  };

  onLogout() {
    this.authService.logout();
  };


  // Since, authSubscription is a not inbuild angular funtion.hence, need to be manually unsubscribe.
  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

}
