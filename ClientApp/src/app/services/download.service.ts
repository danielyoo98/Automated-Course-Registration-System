import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Waitlist } from '../models/waitlist';
const endpoint = environment.apiEndpoint + 'download/';
@Injectable({
    providedIn: 'root'
})
export class DownloadService {
    private jwtHelper: JwtHelperService;


    /**
     * Constructor for Grade Service
     * @param http 
     * @param authService 
     * @param router 
     */
    constructor(
        private http: HttpClient,
        private authService: AuthenticationService,
        private router: Router

    ) {

    }


    public downloadWaitlist() {
        window.location.href = endpoint + 'waitlist';
    }

    public downloadWaitlistEligible() {

        window.open(endpoint + 'waitlist/eligible', "_blanks");
    }

    public downloadWaitlistIneligible() {
        window.open(endpoint + 'waitlist/ineligible', "_blanks");
    }



    // HTTP headers
    private getHttpHeaders(): {} {
        return {
            headers: new HttpHeaders({
                'Authorization': 'Bearer ' + 123,
                'Content-Type': 'application/json'
            })
        };
    }
}
