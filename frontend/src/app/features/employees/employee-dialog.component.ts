import { Component, Inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Employee } from '../../core/models';

@Component({
  selector: 'app-employee-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, MatCheckboxModule, MatDialogModule, MatFormFieldModule, MatInputModule],
  template: `
    <h2 mat-dialog-title>{{ data.employee ? 'Уреди вработен' : 'Додај вработен' }}</h2>
    <mat-dialog-content>
      <form class="form-grid" [formGroup]="form">
        <mat-form-field appearance="outline">
          <mat-label>Име и презиме</mat-label>
          <input matInput formControlName="fullName">
          @if (form.controls.fullName.hasError('required')) {
            <mat-error>Името и презимето се задолжителни.</mat-error>
          }
          @if (form.controls.fullName.hasError('minlength')) {
            <mat-error>Внесете најмалку 2 знаци.</mat-error>
          }
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Е-пошта</mat-label>
          <input matInput type="email" formControlName="email">
          @if (form.controls.email.hasError('email')) {
            <mat-error>Внесете валидна е-пошта.</mat-error>
          }
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Телефон</mat-label>
          <input matInput formControlName="phone">
          <mat-hint>Пример: +38970111222</mat-hint>
          @if (form.controls.phone.hasError('pattern')) {
            <mat-error>Користете бројки, празни места, плус или цртички.</mat-error>
          }
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Позиција</mat-label>
          <input matInput formControlName="position">
        </mat-form-field>
        <mat-checkbox formControlName="isActive">Активен</mat-checkbox>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Откажи</button>
      <button mat-flat-button color="primary" [disabled]="form.invalid" (click)="save()">Зачувај</button>
    </mat-dialog-actions>
  `,
})
export class EmployeeDialogComponent {
  readonly form = this.fb.nonNullable.group({
    fullName: [this.data.employee?.fullName ?? '', [Validators.required, Validators.minLength(2), Validators.maxLength(120)]],
    email: [this.data.employee?.email ?? '', [Validators.email]],
    phone: [this.data.employee?.phone ?? '', [Validators.maxLength(40), Validators.pattern(/^[+\d\s-]*$/)]],
    position: [this.data.employee?.position ?? '', [Validators.maxLength(80)]],
    isActive: [this.data.employee?.isActive ?? true],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly dialogRef: MatDialogRef<EmployeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public readonly data: { employee?: Employee },
  ) {}

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.dialogRef.close(this.form.getRawValue());
  }
}
