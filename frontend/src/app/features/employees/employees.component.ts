import { Component, OnInit, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { debounceTime, startWith, switchMap } from 'rxjs';
import { ApiService } from '../../core/api.service';
import { Employee } from '../../core/models';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog.component';
import { EmployeeDialogComponent } from './employee-dialog.component';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatTableModule,
  ],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss',
})
export class EmployeesComponent implements OnInit {
  private readonly api = inject(ApiService);
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);

  readonly search = new FormControl('', { nonNullable: true });
  readonly displayedColumns = ['fullName', 'email', 'phone', 'position', 'isActive', 'actions'];
  employees: Employee[] = [];

  ngOnInit() {
    this.search.valueChanges.pipe(startWith(''), debounceTime(200), switchMap((value) => this.api.employees(value))).subscribe({
      next: (employees) => (this.employees = employees),
      error: () => this.snackBar.open('Не може да се вчитаат вработените.', 'Затвори', { duration: 3000 }),
    });
  }

  open(employee?: Employee) {
    const dialogRef = this.dialog.open(EmployeeDialogComponent, { width: '720px', data: { employee } });
    dialogRef.afterClosed().subscribe((payload) => {
      if (!payload) return;
      const request = employee ? this.api.updateEmployee(employee.id, payload) : this.api.createEmployee(payload);
      request.subscribe({
        next: () => this.reload(),
        error: () => this.snackBar.open('Не може да се зачува вработениот.', 'Затвори', { duration: 3000 }),
      });
    });
  }

  remove(employee: Employee) {
    this.dialog
      .open(ConfirmDialogComponent, {
        data: { title: 'Избриши вработен', message: `Да се избрише ${employee.fullName}?` },
      })
      .afterClosed()
      .subscribe((confirmed) => {
        if (!confirmed) return;
        this.api.deleteEmployee(employee.id).subscribe({
          next: () => this.reload(),
          error: () => this.snackBar.open('Не може да се избрише вработениот. Можеби се користи во распореди.', 'Затвори', { duration: 4000 }),
        });
      });
  }

  private reload() {
    this.api.employees(this.search.value).subscribe((employees) => (this.employees = employees));
  }
}
