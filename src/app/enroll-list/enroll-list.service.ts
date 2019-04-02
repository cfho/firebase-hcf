import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, ActivatedRoute } from "@angular/router";
import { FirebaseService } from '../firebase.service';
import { AuthService } from "../auth/auth.service";



@Injectable({
  providedIn: 'root'
})
export class EnrollListService implements Resolve<any> {

  authemail: string;

  constructor(
    private afService: FirebaseService,
    private afAuth: AuthService,
    
    ) {this.authemail = this.afAuth.authemail }

  resolve(route: ActivatedRouteSnapshot,) {
    return new Promise((resolve, reject) => {
      let activityId = route.paramMap.get('id');
      this.afService.getEnrollList(activityId)
      .subscribe(
        data => {
          resolve(data);
        }
      )
    })
  }
}
