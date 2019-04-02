 import { Injectable, ApplicationInitStatus } from '@angular/core';
import {AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

// import * as firebase from 'firebase';
import * as firebase from 'firebase/app';


// import { Enroll } from "./enroll";
// import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  // enrollsChanged = new Subject<Enroll[]>();
  // private availableEnrolls: Enroll[] = [];

  enrollusersdata = [];
  constructor(
    public db: AngularFirestore,
    ) {}

  isUserExist(userKey) {
    return this.db.doc('users/' + userKey).get();
  }

  isEnroll(activityid, authemail) {
    return this.db
    .collection('activity_items')
    .doc(activityid)
    .collection('enroll_users')
    .doc(authemail)
    .get();
  }

  createUser(value, email) {
    return this.db
      .collection('users')
      .doc(email)
      .set({
        name: value.name,
        email: value.email,
        class: value.class,
        group: value.group,
        user_ID: value.user_ID,
        mobile: value.mobile,
        address: value.address
    })
    .then(function(docRef) {
      console.log('Document written with ID: ', email);
    })
    .catch(function(error) {
      console.error('Error adding document: ', error);
    });
  }

  createActivity(value, email) {
    return this.db
      .collection('activity_items')
      .add({
        activity_creator: email,
        activity_title: value.title,
        activity_des: value.des,
        activity_closetime: value.closetime,
        creating_date: firebase.firestore.Timestamp.now(),
        number_limit: value.nlimit,
        enroll_users: []
    });
  }

  createEnroll(userdata, authemail, activity_id) {
    const data_subcol = this.db
      .collection('activity_items')
      .doc(activity_id)
      .collection('enroll_users')
      .doc(authemail)
      .set(
        userdata
        // { userRef: authemail }
      );
    const data_key = this.db
        .collection('activity_items')
        .doc(activity_id)
        .update(
          {enroll_users: firebase.firestore.FieldValue.arrayUnion(authemail)}
        );
    return [data_subcol, data_key];
  }
  // createEnroll(data, authemail, activity_id) {
  //   console.log(this.db.doc('users/' + firebase.auth().currentUser.email));
  //   // const datas = { userRef: 'users/' + authemail };
  //   const data_subcol = this.db
  //     .collection('activity_items')
  //     .doc(activity_id)
  //     .collection('enroll_users')
  //     .doc(authemail)
  //     .set(
  //       { userRef: 'users/' + authemail }
  //       // {enrollRef: this.db.doc('users/' + authemail)}
  //       // userRef: db.doc('users/' + firebase.auth().currentUser.uid)
  //       );
  //   const data_userid = this.db
  //       .collection('users')
  //       .doc(authemail)
  //       .update(
  //         data
  //       );
  //   const data_key = this.db
  //       .collection('activity_items')
  //       .doc(activity_id)
  //       .update(
  //         // {enroll_users: firebase.firestore.FieldValue.arrayUnion(authemail)}
  //         {enroll_users: firebase.firestore.FieldValue.arrayUnion(authemail)}
  //       );
  //       // userRef: db.doc('users/' + firebase.auth().currentUser.email);
  //   return [data_subcol, data_key, data_userid];

  // }

  getUsers() {
    return this.db
     .collection('users')
     .snapshotChanges()
     .pipe(map(docArray => {
       return docArray.map(doc => {
         return{
           id: doc.payload.doc.id,
           ... doc.payload.doc.data()
         };
       });
     }));
 }

 getUser(userKey) {
   return this.db
   .collection('users')
   .doc(userKey)
   .snapshotChanges();
 }

 getUserData(userKey) {
   return this.db
   .collection('users')
   .doc(userKey)
   .valueChanges();
 }

getEnrollUsers(activityid) {
  this.getActivity(activityid)
  .subscribe((res: any) => {
    const data = [];
    res.enroll_users.forEach(doc => {
      this.getUserData(doc)
      .subscribe(res => {
        data.push(res);
      });
    });
    this.enrollusersdata = data;
  });
  console.log(this.enrollusersdata);
  return this.enrollusersdata;
}

 getRefUserData(ref) {
   return this.db
   .doc(ref)
   .valueChanges();
 }

 getActivity(itemKey) {
  return this.db
  .collection('activity_items')
  .doc(itemKey)
  .valueChanges();
}

getActivityEnrolls(itemKey) {
  return this.db
  .collection('activity_items')
  .doc(itemKey)
  .collection('enroll_users')
  .valueChanges();
  // .snapshotChanges();
}

// getActivityEnrolls(itemKey) {
//   return this.db
//   .collection('activity_items')
//   .doc(itemKey)
//   .collection('enroll_users')
//   .valueChanges();
// }

getActivities() {
  return this.db
   .collection('activity_items')
   .snapshotChanges()
   .pipe(map(docArray => {
     return docArray.map(doc => {
       return{
         id: doc.payload.doc.id,
         ... doc.payload.doc.data()
       };
     });
   }));
}

getEnrollList(activity_id) {
  return this.db
   .collection('activity_items')
   .doc(activity_id)
   .collection('enroll_users')
   .snapshotChanges()
   .pipe(map(docArray => {
     return docArray.map(doc => {
       return{
         id: doc.payload.doc.id,
         ... doc.payload.doc.data()
       };
     });
   }));
}

getEnroll(activityId) {
  return this.db
    .collection('activity_items')
    .doc(activityId)
    .snapshotChanges();
  }

  updateUser(userKey, value) {
    return this.db
      .collection('users')
      .doc(userKey)
      .update(value);
  }

  updateActivity(itemKey, value) {
    // itemKey.nameToSearch = itemKey.name.toLowerCase();
    return this.db
      .collection('activity_items')
      .doc(itemKey)
      .update(value);
  }

  deleteUser(userKey) {
    return this.db
      .collection('users')
      .doc(userKey)
      .delete();
  }


  deleteActivity(itemKey) {
    return this.db
      .collection('activity_items')
      .doc(itemKey)
      .delete();
  }

  deleteEnroll(authemail, activity_id) {
    const data_subcol = this.db
      .collection('activity_items')
      .doc(activity_id)
      .collection('enroll_users')
      .doc(authemail)
      .delete();
    const data_key = this.db
      .collection('activity_items')
      .doc(activity_id)
      .update(
        {enroll_users: firebase.firestore.FieldValue.arrayRemove(authemail)}
      );
    return [data_subcol, data_key];
  }

}
