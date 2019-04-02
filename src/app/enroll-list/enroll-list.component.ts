import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../firebase.service';
import { NgForm, NgModel } from '@angular/forms';
import {componentDestroyed} from '@w11k/ngx-componentdestroyed';
import {takeUntil} from 'rxjs/operators';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';


@Component({
  selector: 'app-enroll-list',
  templateUrl: './enroll-list.component.html',
  styleUrls: ['./enroll-list.component.css']
})
export class EnrollListComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['name', 'group', 'activity', 'position', 'edit'];
  dataSource = new MatTableDataSource<any>();
  item: any;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

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
      const data = routeData['data'];
      if (data) {
        this.dataSource.data = data;
        // this.item = data.payload.data();
        // this.item.id = data.payload.id;
      }
    });
  }

  onSubmit(f: NgForm) {
    this.afService.updateUser(this.item.id, f.value)
    .then(
      res => {
        this.router.navigate(['users']);
      }
    );
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

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy() {}
}
