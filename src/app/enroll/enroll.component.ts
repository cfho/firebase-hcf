import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../firebase.service';
import { AuthService } from '../auth/auth.service';
// import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
// import {takeUntil} from 'rxjs/operators';
// import {componentDestroyed} from "@w11k/ngx-componentdestroyed";
import { NgForm, NgModel } from '@angular/forms';
import { group } from '@angular/animations';
import { UserData } from '../userdata.model';



@Component({
  selector: 'app-enroll',
  templateUrl: './enroll.component.html',
  styleUrls: ['./enroll.component.css']
})

export class EnrollComponent implements OnInit, OnDestroy {
  item: UserData = {
    name: '',
    class: '',
    group: '',
    email: ''
  };
  authemail = '';
  activityid = '';
  disabled = false;
  isvisible = false;
  isenroll = true;

  constructor(
    private afService: FirebaseService,
    private route: ActivatedRoute,
    private afAuth: AuthService,
    private router: Router
  ) {
    this.authemail = this.afAuth.authemail;
    this.activityid = this.route.snapshot.paramMap.get('id');
   }
  ngOnInit() {
    this.getauthuserdata();
  }
  getauthuserdata() {
    this.afService.getUserData(this.authemail)
    .subscribe(data =>  {
      this.item = data;
    });
    this.afService.isEnroll(this.activityid, this.authemail)
    .subscribe(value => {
      if (value.exists) {
        this.isenroll = true;
        console.log(this.isenroll);
      } else {
        this.isenroll = false;
        console.log(this.isenroll);
      }
    });
  }

  enroll() {
    this.afService.createEnroll(this.item, this.authemail, this.activityid);
        console.log('enroll successful');
        this.router.navigate(['activity-items']);
  }

  edituser(item) {
    this.router.navigate(['edituser/' + item]);
    // this.router.navigate(['/edit-user/']);
  }
  ngOnDestroy() {
  }
}
