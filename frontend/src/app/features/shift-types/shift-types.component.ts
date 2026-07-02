import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { ApiService } from '../../core/api.service';
import { ShiftType } from '../../core/models';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog.component';
import { formatTime } from '../../shared/format-time';
import { ShiftTypeDialogComponent } from './shift-type-dialog.component';

@Component({
  selector: 'app-shift-types',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, MatIconModule, MatSnackBarModule, MatTableModule],
  templateUrl: './shift-types.component.html',
  styleUrl: './shift-types.component.scss',
})
export class ShiftTypesComponent implements OnInit {
  private readonly api = inject(ApiService);
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);

  readonly displayedColumns = ['color', 'name', 'time', 'actions'];
  shiftTypes: ShiftType[] = [];
  readonly formatTime = formatTime;

  ngOnInit() {
    this.reload();
  }

  open(shiftType?: ShiftType) {
    const dialogRef = this.dialog.open(ShiftTypeDialogComponent, { width: '680px', data: { shiftType } });
    dialogRef.afterClosed().subscribe((payload) => {
      if (!payload) return;
      const request = shiftType ? this.api.updateShiftType(shiftType.id, payload) : this.api.createShiftType(payload);
      request.subscribe({
        next: () => this.reload(),
        error: () => this.snackBar.open('Не може да се зачува типот на смена.', 'Затвори', { duration: 3000 }),
      });
    });
  }

  remove(shiftType: ShiftType) {
    this.dialog
      .open(ConfirmDialogComponent, {
        data: { title: 'Избриши тип на смена', message: `Да се избрише ${shiftType.name}?` },
      })
      .afterClosed()
      .subscribe((confirmed) => {
        if (!confirmed) return;
        this.api.deleteShiftType(shiftType.id).subscribe({
          next: () => this.reload(),
          error: () => this.snackBar.open('Не може да се избрише типот на смена. Можеби се користи во распореди.', 'Затвори', { duration: 4000 }),
        });
      });
  }

  private reload() {
    this.api.shiftTypes().subscribe({
      next: (shiftTypes) => (this.shiftTypes = shiftTypes),
      error: () => this.snackBar.open('Не може да се вчитаат типовите смени.', 'Затвори', { duration: 3000 }),
    });
  }
}
