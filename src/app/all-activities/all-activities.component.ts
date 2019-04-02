import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../firebase.service';
import { AuthService } from '../auth/auth.service';

import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import {takeUntil} from 'rxjs/operators';
import {componentDestroyed} from '@w11k/ngx-componentdestroyed';

@Component({
  selector: 'app-all-activities',
  templateUrl: './all-activities.component.html',
  styleUrls: ['./all-activities.component.css']
})
export class AllActivitiesComponent implements OnInit, OnDestroy {

  title = '出坡項目';
  authemail: string;
  authphoto: string;
  activities = [];
  animal: string;
  name: string;
  activityId: string;
  userdata: any;
  enrollList = [];
  panelOpenState = false;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private afService: FirebaseService,
    private afAuth: AuthService,
    private router: Router,

  ) {
    this.authemail = this.afAuth.authemail;
  }
  ngOnInit() {
    this.authemail = this.afAuth.authemail;
    this.getData();
  }

  onLogout() {
    this.router.navigate(['']);
    this.afAuth.logout();
  }
    getData() {
    this.afService.getActivities()
    .pipe(
      takeUntil(componentDestroyed(this))
    )
    .subscribe(result => {
      this.activities = result;
    });
  }

  enrolllist(activityId) {
    this.router.navigate(['enroll-list/' + activityId]);

  }
  enroll(activityId) {
    this.router.navigate(['enroll/' + activityId]);
  }

  cancel(activityId) {
    this.afService.deleteEnroll(this.authemail, activityId);
    this.router.navigate(['activity-items']);
  }

  update(activityId) {
    this.router.navigate(['edit-activity/' + activityId]);
  }

  ngOnDestroy() {
  }
}
