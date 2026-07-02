import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Employee, LoginResponse, Manager, Schedule, ShiftAssignment, ShiftType } from './models';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/auth/login`, { email, password });
  }

  me(): Observable<Manager> {
    return this.http.get<Manager>(`${this.baseUrl}/auth/me`);
  }

  employees(search = ''): Observable<Employee[]> {
    const params = search ? new HttpParams().set('search', search) : undefined;
    return this.http.get<Employee[]>(`${this.baseUrl}/employees`, { params });
  }

  createEmployee(payload: Partial<Employee>): Observable<Employee> {
    return this.http.post<Employee>(`${this.baseUrl}/employees`, payload);
  }

  updateEmployee(id: number, payload: Partial<Employee>): Observable<Employee> {
    return this.http.patch<Employee>(`${this.baseUrl}/employees/${id}`, payload);
  }

  deleteEmployee(id: number): Observable<{ deleted: boolean }> {
    return this.http.delete<{ deleted: boolean }>(`${this.baseUrl}/employees/${id}`);
  }

  shiftTypes(): Observable<ShiftType[]> {
    return this.http.get<ShiftType[]>(`${this.baseUrl}/shift-types`);
  }

  createShiftType(payload: Partial<ShiftType>): Observable<ShiftType> {
    return this.http.post<ShiftType>(`${this.baseUrl}/shift-types`, payload);
  }

  updateShiftType(id: number, payload: Partial<ShiftType>): Observable<ShiftType> {
    return this.http.patch<ShiftType>(`${this.baseUrl}/shift-types/${id}`, payload);
  }

  deleteShiftType(id: number): Observable<{ deleted: boolean }> {
    return this.http.delete<{ deleted: boolean }>(`${this.baseUrl}/shift-types/${id}`);
  }

  schedules(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(`${this.baseUrl}/schedules`);
  }

  schedule(id: number): Observable<Schedule> {
    return this.http.get<Schedule>(`${this.baseUrl}/schedules/${id}`);
  }

  generateSchedule(payload: {
    title: string;
    startDate: string;
    endDate: string;
    employeeIds: number[];
    shiftTypeIds: number[];
  }): Observable<Schedule> {
    return this.http.post<Schedule>(`${this.baseUrl}/schedules/generate`, payload);
  }

  regenerateSchedule(id: number): Observable<Schedule> {
    return this.http.post<Schedule>(`${this.baseUrl}/schedules/${id}/regenerate`, {});
  }

  updateAssignment(scheduleId: number, assignmentId: number, payload: Partial<ShiftAssignment>): Observable<ShiftAssignment> {
    return this.http.patch<ShiftAssignment>(`${this.baseUrl}/schedules/${scheduleId}/assignments/${assignmentId}`, payload);
  }

  deleteSchedule(id: number): Observable<{ deleted: boolean }> {
    return this.http.delete<{ deleted: boolean }>(`${this.baseUrl}/schedules/${id}`);
  }

  exportSchedule(id: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/schedules/${id}/export`, { responseType: 'blob' });
  }
}
