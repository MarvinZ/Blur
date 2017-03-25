import { Injectable } from '@angular/core'
import { Router } from '@angular/router'

// Imports

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {  IUser } from './../../models/api';
import { Observable } from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';



@Injectable()
export class AuthService {
    constructor(private router: Router, private http: Http) { }
    currentUser: IUser
    siteName: string = 'Affiliates'
    // profileUser(userName: string, password: string) { }




    isAffiliateSite() {
        return true;
    }
    hasAffiliateAccess() {
        return this.currentUser.userType === 'AFFILIATE';

    }


    hasAgentAccess() {
        return this.currentUser.userType === 'AGENT' || this.currentUser.userType === 'PPH';

    }

    isAuthenticated() {
        return !!this.currentUser;
    }

    updateCurrentUser(firstName: string, lastName: string) {
        this.currentUser.firstName = firstName
        this.currentUser.lastName = lastName
    }

    logout() {
        this.currentUser = null;
        this.router.navigate(['home']);
    }

    singup(name: string, email: string, phone: string): any {
        console.log(name, phone, email);
        return {
            'result': 'success',
            'msg': 'succesful registration'
        }
    }
}