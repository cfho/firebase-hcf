import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, Params } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import {takeUntil} from 'rxjs/operators';
import {componentDestroyed} from '@w11k/ngx-componentdestroyed';



@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit, OnDestroy {

  // photoUrl: string;
  // authemail: string;

  isAuth = false;
  constructor(
    private afAuth: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    // this.authemail = this.afAuth.authemail;
    // console.log(this.authemail);
    // this.photoUrl = this.afAuth.authphoto;
    // console.log(this.photoUrl);
    this.afAuth.authChange
    .pipe(
      takeUntil(componentDestroyed(this))
      )
      .subscribe(authStatus => {
        this.isAuth = authStatus;
    });
  }

  activity_items() {
    this.router.navigate(['activity-items']);
  }
  onLogin() {
    this.afAuth.login();
  }
  onLogout() {
    this.router.navigate(['']);
    this.afAuth.logout();
  }
  edituser() {
    this.router.navigate(['edit-user/' + this.afAuth.authemail]);
  }

  ngOnDestroy() {}
}
