import { Component, OnInit, OnDestroy } from '@angular/core';
import { FirebaseService } from "../firebase.service";
// import { AngularFireAuth } from "@angular/fire/auth";
import { AuthService } from "../auth/auth.service";


import { NgForm, NgModel } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import {takeUntil} from "rxjs/operators";
import {componentDestroyed} from "@w11k/ngx-componentdestroyed";
// import { Enroll } from "../enroll";
// import { Observable } from "rxjs";
// import { NgModuleResolver } from '@angular/compiler';

// interface newuser {
//   name: string,
//   activity: string,
//   group: string,
//   position: string,
//   useremail: string
// }

@Component({
  selector: 'app-new-user',
  templateUrl: './new-activity.component.html',
  styleUrls: ['./new-activity.component.css']
})


export class NewActivityComponent implements OnInit {
  
  authemail: string;
  
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
    // console.log(f.value);
    this.afService.createActivity(f.value, this.afAuth.authemail)
    .then(
      res => {
        this.router.navigate(['activity-items']);
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
    });
  }
}

