
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../firebase.service';
import { MatTableDataSource } from '@angular/material';
import {takeUntil} from 'rxjs/operators';
import {componentDestroyed} from '@w11k/ngx-componentdestroyed';
import { AuthService } from '../auth/auth.service';
import { UserData } from '../userdata.model';
import { of, observable } from 'rxjs';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['name', 'class', 'group'];
  dataSource = new MatTableDataSource<UserData>();

  authemail: string;
  activityid = '';

  constructor(
    private afService: FirebaseService,
    private afAuth: AuthService,
    private router: Router,
    private route: ActivatedRoute,

  ) {
    this.activityid = this.route.snapshot.paramMap.get('id');
    console.log(this.activityid);
    this.authemail = this.afAuth.authemail;
  }


  ngOnInit() {
    this.getdata();
  }
  
  getdata() {
    this.dataSource.data = this.afService.getEnrollUsers(this.activityid);
    console.log(this.activityid);
    console.log(this.dataSource.data);
  }

  ngOnDestroy() {
    this.activityid = "";
  }

  edituser(authemail) {
    this.router.navigate(['edit-user/' + authemail]);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
