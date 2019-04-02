import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MaterialModule } from './material.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth/auth.service';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EditUserService } from './edit-user/edit-user.service';

// for firebase
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { NewUserComponent } from './new-user/new-user.component';
import { UsersComponent } from './users/users.component';
import { FirebaseService } from './firebase.service';
import { WelcomeComponent } from './welcome/welcome.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { EnrollComponent } from './enroll/enroll.component';
import { NewActivityComponent } from './new-activity/new-activity.component';
import { AllActivitiesComponent } from './all-activities/all-activities.component';
import { EditActivityComponent } from './edit-activity/edit-activity.component';
import { EnrollListComponent } from './enroll-list/enroll-list.component';
import { MainMenuComponent } from './main-menu/main-menu.component';




@NgModule({
  declarations: [
    AppComponent,
    NewUserComponent,
    UsersComponent,
    EditUserComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent,
    EnrollComponent,
    NewActivityComponent,
    AllActivitiesComponent,
    EditActivityComponent,
    EnrollListComponent,
    MainMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
		AngularFirestoreModule, // imports firebase/firestore, only needed for database features,
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
  ],
  entryComponents: [ ],
  providers: [ AuthService, EditUserService, FirebaseService ],
  bootstrap: [AppComponent]
})
export class AppModule { }

