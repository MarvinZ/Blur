import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ReportResponse } from './../models/api';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import {BaThemeConfigProvider, colorHelper} from '../../../theme';

@Injectable()
export class PieChartService {
    _url: string = "http://panmora.com/twapi/api/temp/"


  constructor(private _baConfig:BaThemeConfigProvider, private _http: Http) {
  }



      // GET api/temp/GetAffStatistics?idAgent={idAgent}&reportdate={reportdate}
  GetAffStatistics(idAgent: number, reportDate: string): Observable<any> {
    return this._http.get(this._url + "GetAffStatistics?idAgent=" + idAgent + "&reportdate=" + reportDate)
      .map((response: Response) => <any>response.json())
      .do(data => console.log('All: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }
  private handleError(error: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }


    // let pieColor = this._baConfig.get().colors.custom.dashboardPieChart;
    // return [
    //   {
    //     color: pieColor,
    //     description: 'New Visits',
    //     stats: '57,820',
    //     icon: 'person',
    //   }, {
    //     color: pieColor,
    //     description: 'Purchases',
    //     stats: '$ 89,745',
    //     icon: 'money',
    //   }, {
    //     color: pieColor,
    //     description: 'Active Users',
    //     stats: '178,391',
    //     icon: 'face',
    //   }, {
    //     color: pieColor,
    //     description: 'Returned',
    //     stats: '32,592',
    //     icon: 'refresh',
    //   }
    // ];
  //
}
