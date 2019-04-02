import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../firebase.service';


@Injectable({
  providedIn: 'root'
})
export class EditUserService implements Resolve<any> {

  constructor(private afService: FirebaseService) { }

  resolve(route: ActivatedRouteSnapshot, ) {
    return new Promise((resolve, reject) => {
      const userId = route.paramMap.get('id');
      this.afService.getUser(userId)
      .subscribe(
        data => {
          resolve(data);
        }
      );
    });
  }
}
