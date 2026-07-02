import { Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "./api.service";
import * as i2 from "@angular/router";
const tokenKey = 'shift_schedule_token';
const managerKey = 'shift_schedule_manager';
export class AuthService {
    constructor(api, router) {
        this.api = api;
        this.router = router;
        this.manager = signal(this.readManager());
    }
    get token() {
        return localStorage.getItem(tokenKey);
    }
    get isAuthenticated() {
        return Boolean(this.token);
    }
    login(email, password) {
        return this.api.login(email, password).pipe(tap((response) => {
            localStorage.setItem(tokenKey, response.accessToken);
            localStorage.setItem(managerKey, JSON.stringify(response.manager));
            this.manager.set(response.manager);
        }));
    }
    logout() {
        localStorage.removeItem(tokenKey);
        localStorage.removeItem(managerKey);
        this.manager.set(null);
        void this.router.navigateByUrl('/login');
    }
    readManager() {
        const raw = localStorage.getItem(managerKey);
        if (!raw)
            return null;
        try {
            return JSON.parse(raw);
        }
        catch {
            return null;
        }
    }
    static { this.ɵfac = function AuthService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AuthService)(i0.ɵɵinject(i1.ApiService), i0.ɵɵinject(i2.Router)); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: AuthService, factory: AuthService.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AuthService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], () => [{ type: i1.ApiService }, { type: i2.Router }], null); })();
//# sourceMappingURL=auth.service.js.map