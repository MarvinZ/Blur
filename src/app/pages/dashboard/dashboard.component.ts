import {Component} from '@angular/core';
import { ConfigService } from './../../config.service' 

@Component({
  selector: 'dashboard',
  styleUrls: ['./dashboard.scss'],
  templateUrl: './dashboard.html'
})
export class Dashboard {

  constructor(private config: ConfigService) {
  }


}
