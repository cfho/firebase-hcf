import { Component, OnInit, OnDestroy } from '@angular/core';
import { FirebaseService } from "../firebase.service";
import { AuthService } from "../auth/auth.service";
import { NgForm, NgModel } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import {takeUntil} from "rxjs/operators";
import {componentDestroyed} from "@w11k/ngx-componentdestroyed";

@Component({
  selector: 'app-edit-activity',
  templateUrl: './edit-activity.component.html',
  styleUrls: ['./edit-activity.component.css']
})
export class EditActivityComponent implements OnInit, OnDestroy{
  
  item: any;
  constructor(
    private afService: FirebaseService,
    private route: ActivatedRoute,
    private router: Router
    ) {}

  ngOnInit() {
    this.route.data
    .pipe(
      takeUntil(componentDestroyed(this))
    )
    .subscribe(routeData => {
      let data = routeData['data'];
      if(data) {
        this.item = data.payload.data();
        this.item.id = data.payload.id;
      }
    })
  }
  
  onSubmit(f: NgForm){
    this.afService.updateActivity(this.item.id, f.value)
    .then(
      res => {
        this.router.navigate(['activity-items']);
      }
    )
  }

  delete(){
    this.afService.deleteActivity(this.item.id)
    .then(
      res => {
        this.router.navigate(['activity_items']);
      },
      err => {
        console.log(err);
      }
    )
  }

  cancel(){
    this.router.navigate(['activity_items']);
  }

  ngOnDestroy() {}
}

