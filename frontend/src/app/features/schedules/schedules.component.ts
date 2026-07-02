import { Component, OnInit, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../core/api.service';
import { Schedule } from '../../core/models';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog.component';

@Component({
  selector: 'app-schedules',
  standalone: true,
  imports: [DatePipe, MatButtonModule, MatDialogModule, MatIconModule, MatSnackBarModule, MatTableModule, RouterLink],
  templateUrl: './schedules.component.html',
})
export class SchedulesComponent implements OnInit {
  private readonly api = inject(ApiService);
  private readonly dialog = inject(MatDialog);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);

  readonly displayedColumns = ['title', 'range', 'createdAt', 'actions'];
  schedules: Schedule[] = [];

  ngOnInit() {
    this.reload();
  }

  open(schedule: Schedule) {
    void this.router.navigate(['/schedules', schedule.id]);
  }

  remove(schedule: Schedule) {
    this.dialog
      .open(ConfirmDialogComponent, {
        data: { title: 'Избриши распоред', message: `Да се избрише ${schedule.title}?` },
      })
      .afterClosed()
      .subscribe((confirmed) => {
        if (!confirmed) return;
        this.api.deleteSchedule(schedule.id).subscribe({
          next: () => this.reload(),
          error: () => this.snackBar.open('Не може да се избрише распоредот.', 'Затвори', { duration: 3000 }),
        });
      });
  }

  private reload() {
    this.api.schedules().subscribe({
      next: (schedules) => (this.schedules = schedules),
      error: () => this.snackBar.open('Не може да се вчитаат распоредите.', 'Затвори', { duration: 3000 }),
    });
  }
}
