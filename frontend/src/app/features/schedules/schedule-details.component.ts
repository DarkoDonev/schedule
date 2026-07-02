import { Component, OnInit, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ApiService } from '../../core/api.service';
import { Employee, Schedule, ShiftAssignment, ShiftType } from '../../core/models';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog.component';
import { formatTime } from '../../shared/format-time';
import { AssignmentDialogComponent } from './assignment-dialog.component';

@Component({
  selector: 'app-schedule-details',
  standalone: true,
  imports: [DatePipe, RouterLink, MatButtonModule, MatDialogModule, MatIconModule, MatSnackBarModule],
  templateUrl: './schedule-details.component.html',
  styleUrl: './schedule-details.component.scss',
})
export class ScheduleDetailsComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly api = inject(ApiService);
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);

  schedule?: Schedule;
  dates: string[] = [];
  employees: Employee[] = [];
  shiftTypes: ShiftType[] = [];
  readonly formatTime = formatTime;

  ngOnInit() {
    this.load();
  }

  assignmentFor(employeeId: number, date: string) {
    return this.schedule?.assignments?.find((assignment) => assignment.employeeId === employeeId && assignment.date === date);
  }

  edit(assignment?: ShiftAssignment) {
    if (!assignment || !this.schedule) return;
    this.dialog
      .open(AssignmentDialogComponent, {
        width: '560px',
        data: { assignment, employees: this.employees, shiftTypes: this.shiftTypes },
      })
      .afterClosed()
      .subscribe((payload) => {
        if (!payload || !this.schedule) return;
        this.api.updateAssignment(this.schedule.id, assignment.id, payload).subscribe({
          next: () => this.load(),
          error: () => this.snackBar.open('Не може да се ажурира задачата. Проверете дали вработениот веќе има задача на тој датум.', 'Затвори', { duration: 4500 }),
        });
      });
  }

  regenerate() {
    if (!this.schedule) return;
    this.api.regenerateSchedule(this.schedule.id).subscribe({
      next: () => this.load(),
      error: () => this.snackBar.open('Не може да се регенерира распоредот.', 'Затвори', { duration: 3000 }),
    });
  }

  export() {
    if (!this.schedule) return;
    this.api.exportSchedule(this.schedule.id).subscribe({
      next: (blob) => {
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = `${this.schedule?.title ?? 'raspored'}.xlsx`;
        anchor.click();
        URL.revokeObjectURL(url);
      },
      error: () => this.snackBar.open('Не може да се извезе распоредот.', 'Затвори', { duration: 3000 }),
    });
  }

  remove() {
    if (!this.schedule) return;
    this.dialog
      .open(ConfirmDialogComponent, {
        data: { title: 'Избриши распоред', message: `Да се избрише ${this.schedule.title}?` },
      })
      .afterClosed()
      .subscribe((confirmed) => {
        if (!confirmed || !this.schedule) return;
        this.api.deleteSchedule(this.schedule.id).subscribe({
          next: () => void this.router.navigateByUrl('/schedules'),
          error: () => this.snackBar.open('Не може да се избрише распоредот.', 'Затвори', { duration: 3000 }),
        });
      });
  }

  private load() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    forkJoin({
      schedule: this.api.schedule(id),
      employees: this.api.employees(),
      shiftTypes: this.api.shiftTypes(),
    }).subscribe({
      next: ({ schedule, employees, shiftTypes }) => {
        this.schedule = schedule;
        this.employees = this.uniqueEmployees(schedule, employees);
        this.shiftTypes = shiftTypes;
        this.dates = this.expandDates(schedule.startDate, schedule.endDate);
      },
      error: () => this.snackBar.open('Не може да се вчита распоредот.', 'Затвори', { duration: 3000 }),
    });
  }

  private uniqueEmployees(schedule: Schedule, allEmployees: Employee[]) {
    const ids = new Set(schedule.assignments?.map((assignment) => assignment.employeeId) ?? []);
    return allEmployees.filter((employee) => ids.has(employee.id));
  }

  private expandDates(startDate: string, endDate: string) {
    const dates: string[] = [];
    const cursor = new Date(`${startDate}T00:00:00.000Z`);
    const end = new Date(`${endDate}T00:00:00.000Z`);
    while (cursor <= end) {
      dates.push(cursor.toISOString().slice(0, 10));
      cursor.setUTCDate(cursor.getUTCDate() + 1);
    }
    return dates;
  }
}
