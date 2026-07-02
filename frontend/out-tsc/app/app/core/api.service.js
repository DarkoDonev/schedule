import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class ApiService {
    constructor(http) {
        this.http = http;
        this.baseUrl = environment.apiUrl;
    }
    login(email, password) {
        return this.http.post(`${this.baseUrl}/auth/login`, { email, password });
    }
    me() {
        return this.http.get(`${this.baseUrl}/auth/me`);
    }
    employees(search = '') {
        const params = search ? new HttpParams().set('search', search) : undefined;
        return this.http.get(`${this.baseUrl}/employees`, { params });
    }
    createEmployee(payload) {
        return this.http.post(`${this.baseUrl}/employees`, payload);
    }
    updateEmployee(id, payload) {
        return this.http.patch(`${this.baseUrl}/employees/${id}`, payload);
    }
    deleteEmployee(id) {
        return this.http.delete(`${this.baseUrl}/employees/${id}`);
    }
    shiftTypes() {
        return this.http.get(`${this.baseUrl}/shift-types`);
    }
    createShiftType(payload) {
        return this.http.post(`${this.baseUrl}/shift-types`, payload);
    }
    updateShiftType(id, payload) {
        return this.http.patch(`${this.baseUrl}/shift-types/${id}`, payload);
    }
    deleteShiftType(id) {
        return this.http.delete(`${this.baseUrl}/shift-types/${id}`);
    }
    schedules() {
        return this.http.get(`${this.baseUrl}/schedules`);
    }
    schedule(id) {
        return this.http.get(`${this.baseUrl}/schedules/${id}`);
    }
    generateSchedule(payload) {
        return this.http.post(`${this.baseUrl}/schedules/generate`, payload);
    }
    regenerateSchedule(id) {
        return this.http.post(`${this.baseUrl}/schedules/${id}/regenerate`, {});
    }
    updateAssignment(scheduleId, assignmentId, payload) {
        return this.http.patch(`${this.baseUrl}/schedules/${scheduleId}/assignments/${assignmentId}`, payload);
    }
    deleteSchedule(id) {
        return this.http.delete(`${this.baseUrl}/schedules/${id}`);
    }
    exportSchedule(id) {
        return this.http.get(`${this.baseUrl}/schedules/${id}/export`, { responseType: 'blob' });
    }
    static { this.ɵfac = function ApiService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ApiService)(i0.ɵɵinject(i1.HttpClient)); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ApiService, factory: ApiService.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ApiService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], () => [{ type: i1.HttpClient }], null); })();
//# sourceMappingURL=api.service.js.map