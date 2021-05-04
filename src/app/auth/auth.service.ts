import { AuthData } from './auth-data.model';
import { User } from './user.model';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// Subject is like a eventemitter that can be subscribe from other component.
// Ulike, EventEmitter has emit() method. Subject has next() method. See below.

// In order to inject one services to another services, we need to use @Injectable decorator.
// Inject services (A, e.g Router) into the services(B, e.g AuthService) constructor.

@Injectable()
export class AuthService {
    private user: User;
    authChange = new Subject<boolean>();

    constructor(
        private router: Router
    ) { }


    registerUser(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 10000).toString()
        };
        console.log("registered user", this.user);
        this.authSuccessfully();

    };


    login(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 10000).toString()
        };
        console.log("logged in user", this.user);
        this.authSuccessfully();
    };


    logout() {
        this.user = null;
        this.authChange.next(false);
        this.router.navigate(['/login']);
    };


    getUser() {
        return { ...this.user };
    };


    isAuth() {
        return this.user != null;
    };

    private authSuccessfully() {
        this.authChange.next(true);
        this.router.navigate(['/training']);
    };
}