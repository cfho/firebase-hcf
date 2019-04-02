import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewUserComponent } from './new-user/new-user.component';
import { UsersComponent } from './users/users.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EditUserService } from './edit-user/edit-user.service';
import { WelcomeComponent } from './welcome/welcome.component';
import { HeaderComponent } from './navigation/header/header.component';
import { EnrollComponent } from './enroll/enroll.component';
import { NewActivityComponent } from './new-activity/new-activity.component';
import { AllActivitiesComponent } from './all-activities/all-activities.component';
import { EditActivityComponent } from './edit-activity/edit-activity.component';
import { EditActivityService } from './edit-activity/edit-activity.service';
import { EnrollListComponent } from './enroll-list/enroll-list.component';
import { EnrollListService } from './enroll-list/enroll-list.service';


const routes: Routes = [
  // { path: '', redirectTo: '/welcome', pathMatch: 'full'},
  { path: '', component: WelcomeComponent},
  { path: 'users/:id', component: UsersComponent},
  { path: 'new-user', component: NewUserComponent},
  { path: 'header', component: HeaderComponent},
  { path: 'new-activity', component: NewActivityComponent},
  { path: 'activity-items', component: AllActivitiesComponent},
  { path: 'edit-user/:id', component: EditUserComponent, resolve: {data: EditUserService}},
  { path: 'enroll/:id', component: EnrollComponent},
  // { path: 'enroll/:id', component: EnrollComponent, resolve:{data: EditEnrollService}},
  { path: 'edit-activity/:id', component: EditActivityComponent, resolve: {data: EditActivityService}},
  { path: 'enroll-list/:id', component: EnrollListComponent, resolve: {data: EnrollListService}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
