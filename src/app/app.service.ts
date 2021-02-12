import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfigUrl } from './app.config';
declare var $: any;
import { Observable, Observer, fromEvent, merge } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http:HttpClient, private appUrl:AppConfigUrl) { }

  YOURAPIKEY = 'uk6wg_omz9_duzHxsxKW';
  therichpost$() {
    return merge<boolean>(
      fromEvent(window, 'offline').pipe(map(() => false)),
      fromEvent(window, 'online').pipe(map(() => true)),
      new Observable((sub: Observer<boolean>) => {
        sub.next(navigator.onLine);
        sub.complete();
      }));
}
  getCompanyNames() {
    return this.http.get(this.appUrl.BaseUrl + 
      'api/v3/datatables/ETFG/FUND.json?qopts.columns=ticker&api_key='
      +this.YOURAPIKEY)
  }
  filterStockers(company:string) {
    return this.http.get(this.appUrl.BaseUrl + 
      'api/v3/datatables/ETFG/FUND.json?ticker='+company+'&api_key='
      +this.YOURAPIKEY)
  }
  filterByDateRange(datefrom:string, dateto:string) {
    let url_load =this.appUrl.BaseUrl + 
    'api/v3/datasets/WIKI/FB.json?column_index=4&start_date='+datefrom+'&end_date='+dateto+'&api_key='
    +this.YOURAPIKEY
    console.log(url_load)
    return this.http.get(url_load)
  }
  // getStickers(): Observable<any>{
  //   return this.http.get<any>(this.appUrl.BaseUrl + 
  //     'api/v3/datatables/ETFG/FUND.json?qopts.columns=ticker&api_key='
  //     +this.YOURAPIKEY)
  //     .pipe(
  //       catchError( err => this.errorHandler(err))
  //     )
  // }
  // filterReport(stickers:string): Observable<any>{
  //   return this.http.get<any>(this.appUrl.BaseUrl + 
  //     'api/v3/datatables/ETFG/FUND.json?ticker='+stickers+'&api_key='
  //     +this.YOURAPIKEY)
  //     .pipe(
  //       catchError( err => this.errorHandler(err))
  //     )
  // }
  errorHandler(error:HttpErrorResponse){
    return Observable.throw(error.message || "Server Error") 
  } 

}
