import { Component, OnInit, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ApiService } from '../../core/api.service';
import { Employee, ShiftType } from '../../core/models';
import { formatTime } from '../../shared/format-time';

@Component({
  selector: 'app-schedule-generate',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
  ],
  templateUrl: './schedule-generate.component.html',
  styleUrl: './schedule-generate.component.scss',
})
export class ScheduleGenerateComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly api = inject(ApiService);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);

  readonly form = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(120)]],
    startDate: ['', [Validators.required]],
    endDate: ['', [Validators.required]],
    employeeIds: [[] as number[], [minSelected(1)]],
    shiftTypeIds: [[] as number[], [minSelected(1)]],
  }, { validators: [dateRangeValidator()] });

  employees: Employee[] = [];
  shiftTypes: ShiftType[] = [];
  loading = false;
  readonly formatTime = formatTime;

  ngOnInit() {
    forkJoin({ employees: this.api.employees(), shiftTypes: this.api.shiftTypes() }).subscribe({
      next: ({ employees, shiftTypes }) => {
        this.employees = employees.filter((employee) => employee.isActive);
        this.shiftTypes = shiftTypes;
        this.form.patchValue({
          employeeIds: this.employees.map((employee) => employee.id),
          shiftTypeIds: this.shiftTypes.map((shiftType) => shiftType.id),
        });
      },
      error: () => this.snackBar.open('Не може да се вчитаат опциите за генерирање.', 'Затвори', { duration: 3000 }),
    });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const payload = this.form.getRawValue();

    this.loading = true;
    this.api.generateSchedule(payload).subscribe({
      next: (schedule) => void this.router.navigate(['/schedules', schedule.id]),
      error: () => {
        this.loading = false;
        this.snackBar.open('Не може да се генерира распоредот.', 'Затвори', { duration: 3500 });
      },
    });
  }
}

function minSelected(min: number): ValidatorFn {
  return (control: AbstractControl<number[]>): ValidationErrors | null => {
    return (control.value?.length ?? 0) >= min ? null : { minSelected: true };
  };
}

function dateRangeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const start = control.get('startDate')?.value;
    const end = control.get('endDate')?.value;
    if (!start || !end) return null;
    return start <= end ? null : { dateRange: true };
  };
}
