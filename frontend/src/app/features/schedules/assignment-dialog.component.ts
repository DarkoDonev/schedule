import { Component, Inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Employee, ShiftAssignment, ShiftType } from '../../core/models';
import { formatTime } from '../../shared/format-time';

@Component({
  selector: 'app-assignment-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatSelectModule],
  template: `
    <h2 mat-dialog-title>Уреди задача</h2>
    <mat-dialog-content>
      <form class="form-grid" [formGroup]="form">
        <mat-form-field appearance="outline">
          <mat-label>Вработен</mat-label>
          <mat-select formControlName="employeeId">
            @for (employee of data.employees; track employee.id) {
              <mat-option [value]="employee.id">{{ employee.fullName }}</mat-option>
            }
          </mat-select>
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Смена</mat-label>
          <mat-select formControlName="shiftTypeId">
            @for (shiftType of data.shiftTypes; track shiftType.id) {
              <mat-option [value]="shiftType.id">{{ shiftType.name }} · {{ formatTime(shiftType.startTime) }}-{{ formatTime(shiftType.endTime) }}</mat-option>
            }
          </mat-select>
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Откажи</button>
      <button mat-flat-button color="primary" [disabled]="form.invalid" (click)="save()">Зачувај</button>
    </mat-dialog-actions>
  `,
})
export class AssignmentDialogComponent {
  readonly formatTime = formatTime;

  readonly form = this.fb.nonNullable.group({
    employeeId: [this.data.assignment.employeeId, [Validators.required]],
    shiftTypeId: [this.data.assignment.shiftTypeId, [Validators.required]],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly dialogRef: MatDialogRef<AssignmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public readonly data: { assignment: ShiftAssignment; employees: Employee[]; shiftTypes: ShiftType[] },
  ) {}

  save() {
    this.dialogRef.close(this.form.getRawValue());
  }
}
