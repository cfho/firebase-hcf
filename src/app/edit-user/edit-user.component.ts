import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FirebaseService } from '../firebase.service';
import { NgForm, NgModel } from '@angular/forms';
import {componentDestroyed} from '@w11k/ngx-componentdestroyed';
import {takeUntil} from 'rxjs/operators';
import { UserData } from '../userdata.model';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit, OnDestroy {
  title = '編輯基本資料';
  item: UserData;
  authemail = '';

  classes = [
    '佛一甲', '佛一乙', '佛二甲', '佛二乙', '佛三甲', '佛三乙'
  ];

  constructor(
    private afService: FirebaseService,
    private afAuth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    this.route.data
    .pipe(
      takeUntil(componentDestroyed(this))
    )
    .subscribe(routeData => {
      const data = routeData['data'];
      if (data) {
        this.item = data.payload.data();
        this.item.id = data.payload.id;
      }
    });
  }

  onSubmit(f: NgForm) {
    this.afService.updateUser(this.item.id, f.value)
    .then(res => {
      this.location.back();
    });
  }


  delete() {
    this.afService.deleteUser(this.item.id)
    .then(
      res => {
        this.router.navigate(['users']);
      },
      err => {
        console.log(err);
      }
    );
  }

  cancel() {
    this.router.navigate(['users']);
  }

  // goBack(): void {
  //   this.location.back();
  // }

  ngOnDestroy() {}
}
