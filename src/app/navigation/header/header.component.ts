import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { FirebaseService } from '../../firebase.service';
import { Router, Params } from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {componentDestroyed} from '@w11k/ngx-componentdestroyed';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth = false;

  constructor(
    private afAuth: AuthService,
    private router: Router,
    private afService: FirebaseService,
    ) { }

  ngOnInit() {
    this.afAuth.authChange
    .pipe(
      takeUntil(componentDestroyed(this))
    )
    .subscribe(authStatus => {
      this.isAuth = authStatus;
    });
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  newUser() {
    this.afService.isUserExist(this.afAuth.authemail).subscribe(
      value => {
        if (!value.exists) {
          this.router.navigate(['new-user']);
        } else {
          this.router.navigate(['edit-user/' + this.afAuth.authemail]);
        }
      });
  }

  newActivity() {
    this.router.navigate(['new-activity']);
  }

  allactivities() {
    this.router.navigate(['allactivities']);
  }

  ngOnDestroy() {
  }

}
