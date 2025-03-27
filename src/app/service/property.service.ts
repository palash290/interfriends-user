import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment'

import { Property } from '../model/property.model';


const API_URL = environment.apiUrl;
@Injectable({ providedIn: 'root'})

export class PropertyService {

  private lists: Property[] = [];
  private listsUpdated = new Subject<{ lists: Property[]; listCount: number;}>();

  constructor(private http: HttpClient, private router: Router) {}


  getLists(listsPerPage: number, currentPage: number) {

    const listData = new FormData();


    if (currentPage) {
      const totalPage = listsPerPage * currentPage;
      listData.append('start', totalPage.toString());
    }


    this.http
      .post<{ success: string; message: string; lists: any;  listCount: number;}>(
        API_URL + '/property_list' , listData
      ).subscribe(responseData => {
        this.lists = responseData.lists;


        this.listsUpdated.next({
          lists: [...this.lists],
          listCount: responseData.listCount,
        });
      });
  }

  getListUpdateListener() {
    return this.listsUpdated.asObservable();
  }
}
