import { Component, Inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ShiftType } from '../../core/models';

@Component({
  selector: 'app-shift-type-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  template: `
    <h2 mat-dialog-title>{{ data.shiftType ? 'Уреди тип на смена' : 'Додај тип на смена' }}</h2>
    <mat-dialog-content>
      <form class="form-grid" [formGroup]="form">
        <mat-form-field appearance="outline">
          <mat-label>Име</mat-label>
          <input matInput formControlName="name">
          @if (form.controls.name.hasError('required')) {
            <mat-error>Името е задолжително.</mat-error>
          }
          @if (form.controls.name.hasError('minlength')) {
            <mat-error>Внесете најмалку 2 знаци.</mat-error>
          }
        </mat-form-field>
        <div class="time-picker">
          <span class="time-label">Почеток</span>
          <mat-form-field appearance="outline">
            <mat-label>Час</mat-label>
            <mat-select formControlName="startHour">
              @for (hour of hours; track hour) {
                <mat-option [value]="hour">{{ hour }}</mat-option>
              }
            </mat-select>
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Минута</mat-label>
            <mat-select formControlName="startMinute">
              @for (minute of minutes; track minute) {
                <mat-option [value]="minute">{{ minute }}</mat-option>
              }
            </mat-select>
          </mat-form-field>
        </div>
        <div class="time-picker">
          <span class="time-label">Крај</span>
          <mat-form-field appearance="outline">
            <mat-label>Час</mat-label>
            <mat-select formControlName="endHour">
              @for (hour of hours; track hour) {
                <mat-option [value]="hour">{{ hour }}</mat-option>
              }
            </mat-select>
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Минута</mat-label>
            <mat-select formControlName="endMinute">
              @for (minute of minutes; track minute) {
                <mat-option [value]="minute">{{ minute }}</mat-option>
              }
            </mat-select>
            @if (form.hasError('sameTime') && form.touched) {
              <mat-error>Почетокот и крајот мора да бидат различни.</mat-error>
            }
          </mat-form-field>
        </div>
        <mat-form-field appearance="outline">
          <mat-label>Боја</mat-label>
          <input matInput type="color" formControlName="color">
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Откажи</button>
      <button mat-flat-button color="primary" [disabled]="form.invalid" (click)="save()">Зачувај</button>
    </mat-dialog-actions>
  `,
  styles: `
    .time-picker {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      min-width: 0;
    }

    .time-label {
      grid-column: 1 / -1;
      color: #475569;
      font-size: 13px;
      font-weight: 750;
    }

    mat-form-field {
      min-width: 0;
    }
  `,
})
export class ShiftTypeDialogComponent {
  readonly hours = Array.from({ length: 24 }, (_, index) => String(index).padStart(2, '0'));
  readonly minutes = Array.from({ length: 60 }, (_, index) => String(index).padStart(2, '0'));
  private readonly startTime = this.splitTime(this.data.shiftType?.startTime ?? '08:00');
  private readonly endTime = this.splitTime(this.data.shiftType?.endTime ?? '16:00');

  readonly form = this.fb.nonNullable.group({
    name: [this.data.shiftType?.name ?? '', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
    startHour: [this.startTime.hour, [Validators.required]],
    startMinute: [this.startTime.minute, [Validators.required]],
    endHour: [this.endTime.hour, [Validators.required]],
    endMinute: [this.endTime.minute, [Validators.required]],
    color: [this.data.shiftType?.color ?? '#2563eb', [Validators.required]],
  }, { validators: [(control) => {
    const start = `${control.get('startHour')?.value}:${control.get('startMinute')?.value}`;
    const end = `${control.get('endHour')?.value}:${control.get('endMinute')?.value}`;
    return start && end && start === end ? { sameTime: true } : null;
  }] });

  constructor(
    private readonly fb: FormBuilder,
    private readonly dialogRef: MatDialogRef<ShiftTypeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public readonly data: { shiftType?: ShiftType },
  ) {}

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const value = this.form.getRawValue();
    this.dialogRef.close({
      name: value.name,
      startTime: `${value.startHour}:${value.startMinute}`,
      endTime: `${value.endHour}:${value.endMinute}`,
      color: value.color,
    });
  }

  private splitTime(value: string) {
    const [hour = '00', minute = '00'] = value.slice(0, 5).split(':');
    return { hour, minute };
  }
}
