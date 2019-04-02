import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, ActivatedRoute } from "@angular/router";
import { FirebaseService } from '../firebase.service';


@Injectable({
  providedIn: 'root'
})
export class EditActivityService implements Resolve<any> {

  constructor(private afService: FirebaseService) { }

  resolve(route: ActivatedRouteSnapshot,) {
    return new Promise((resolve, reject) => {
      let activityId = route.paramMap.get('id');
      this.afService.getActivity(activityId)
      .subscribe(
        data => {
          resolve(data);
        }
      )
    })
  }
}
