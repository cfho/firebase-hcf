import { Component, OnInit } from '@angular/core'
import { FirebaseService } from '../firebase.service';
import { AuthService } from '../auth/auth.service';

import { NgForm, NgModel } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
// tslint:disable-next-line: quotemark
import { Enroll } from "../enroll";
import { Observable } from 'rxjs';
import { NgModuleResolver } from '@angular/compiler';
import { auth } from 'firebase';
import { UserData } from '../userdata.model';



@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})


export class NewUserComponent implements OnInit {
  title: '新增基本資料';
  item: UserData = {
    name: '',
    class: '',
    group: '',
    email: '',
    mobile: '',
    user_ID: '',
    address: '',
    id: ''
  };

  constructor(
    private afService: FirebaseService,
    private afAuth: AuthService,
    private route: ActivatedRoute,
    private router: Router
    ) {

   }

  ngOnInit() {}

  onSubmit( f: NgForm ) {
    f.value.email = this.afAuth.authemail;
    this.afService.createUser(f.value, this.afAuth.authemail)
    .then(
      res => {
        this.router.navigate(['activity-items']);
      })
    .catch(function(error) {
      console.error('Error adding document: ', error);
    });
  }
}

