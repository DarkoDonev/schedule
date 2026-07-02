import { Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../core/api.service';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/button";
import * as i2 from "@angular/material/icon";
import * as i3 from "@angular/material/table";
function SchedulesComponent_th_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th", 16);
    i0.ɵɵtext(1, "Title");
    i0.ɵɵelementEnd();
} }
function SchedulesComponent_td_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 17);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const schedule_r1 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(schedule_r1.title);
} }
function SchedulesComponent_th_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th", 16);
    i0.ɵɵtext(1, "Date range");
    i0.ɵɵelementEnd();
} }
function SchedulesComponent_td_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 17);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const schedule_r2 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2("", schedule_r2.startDate, " - ", schedule_r2.endDate, "");
} }
function SchedulesComponent_th_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th", 16);
    i0.ɵɵtext(1, "Status");
    i0.ɵɵelementEnd();
} }
function SchedulesComponent_td_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 17);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const schedule_r3 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(schedule_r3.status);
} }
function SchedulesComponent_th_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th", 16);
    i0.ɵɵtext(1, "Created");
    i0.ɵɵelementEnd();
} }
function SchedulesComponent_td_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 17);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "date");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const schedule_r4 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(2, 1, schedule_r4.createdAt, "mediumDate"));
} }
function SchedulesComponent_th_26_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "th", 16);
} }
function SchedulesComponent_td_27_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "td", 18)(1, "button", 19);
    i0.ɵɵlistener("click", function SchedulesComponent_td_27_Template_button_click_1_listener() { const schedule_r6 = i0.ɵɵrestoreView(_r5).$implicit; const ctx_r6 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r6.open(schedule_r6)); });
    i0.ɵɵelementStart(2, "mat-icon");
    i0.ɵɵtext(3, "open_in_new");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "button", 20);
    i0.ɵɵlistener("click", function SchedulesComponent_td_27_Template_button_click_4_listener() { const schedule_r6 = i0.ɵɵrestoreView(_r5).$implicit; const ctx_r6 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r6.remove(schedule_r6)); });
    i0.ɵɵelementStart(5, "mat-icon");
    i0.ɵɵtext(6, "delete");
    i0.ɵɵelementEnd()()();
} }
function SchedulesComponent_tr_28_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "tr", 21);
} }
function SchedulesComponent_tr_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "tr", 22);
} }
export class SchedulesComponent {
    constructor() {
        this.api = inject(ApiService);
        this.dialog = inject(MatDialog);
        this.router = inject(Router);
        this.snackBar = inject(MatSnackBar);
        this.displayedColumns = ['title', 'range', 'status', 'createdAt', 'actions'];
        this.schedules = [];
    }
    ngOnInit() {
        this.reload();
    }
    open(schedule) {
        void this.router.navigate(['/schedules', schedule.id]);
    }
    remove(schedule) {
        this.dialog
            .open(ConfirmDialogComponent, {
            data: { title: 'Delete schedule', message: `Delete ${schedule.title}?` },
        })
            .afterClosed()
            .subscribe((confirmed) => {
            if (!confirmed)
                return;
            this.api.deleteSchedule(schedule.id).subscribe({
                next: () => this.reload(),
                error: () => this.snackBar.open('Could not delete schedule.', 'Close', { duration: 3000 }),
            });
        });
    }
    reload() {
        this.api.schedules().subscribe({
            next: (schedules) => (this.schedules = schedules),
            error: () => this.snackBar.open('Could not load schedules.', 'Close', { duration: 3000 }),
        });
    }
    static { this.ɵfac = function SchedulesComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || SchedulesComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: SchedulesComponent, selectors: [["app-schedules"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 30, vars: 3, consts: [[1, "page"], [1, "page-title"], [1, "muted"], ["mat-flat-button", "", "color", "primary", "type", "button", "routerLink", "/schedules/new"], [1, "panel", "table-wrap"], ["mat-table", "", 3, "dataSource"], ["matColumnDef", "title"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "range"], ["matColumnDef", "status"], ["matColumnDef", "createdAt"], ["matColumnDef", "actions"], ["mat-cell", "", "class", "actions", 4, "matCellDef"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["mat-header-cell", ""], ["mat-cell", ""], ["mat-cell", "", 1, "actions"], ["mat-icon-button", "", "type", "button", "aria-label", "Open schedule", 3, "click"], ["mat-icon-button", "", "type", "button", "aria-label", "Delete schedule", 3, "click"], ["mat-header-row", ""], ["mat-row", ""]], template: function SchedulesComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h1");
            i0.ɵɵtext(4, "Schedules");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "p", 2);
            i0.ɵɵtext(6, "Generate and review shift schedules.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(7, "button", 3)(8, "mat-icon");
            i0.ɵɵtext(9, "auto_awesome");
            i0.ɵɵelementEnd();
            i0.ɵɵtext(10, " Generate schedule ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(11, "section", 4)(12, "table", 5);
            i0.ɵɵelementContainerStart(13, 6);
            i0.ɵɵtemplate(14, SchedulesComponent_th_14_Template, 2, 0, "th", 7)(15, SchedulesComponent_td_15_Template, 2, 1, "td", 8);
            i0.ɵɵelementContainerEnd();
            i0.ɵɵelementContainerStart(16, 9);
            i0.ɵɵtemplate(17, SchedulesComponent_th_17_Template, 2, 0, "th", 7)(18, SchedulesComponent_td_18_Template, 2, 2, "td", 8);
            i0.ɵɵelementContainerEnd();
            i0.ɵɵelementContainerStart(19, 10);
            i0.ɵɵtemplate(20, SchedulesComponent_th_20_Template, 2, 0, "th", 7)(21, SchedulesComponent_td_21_Template, 2, 1, "td", 8);
            i0.ɵɵelementContainerEnd();
            i0.ɵɵelementContainerStart(22, 11);
            i0.ɵɵtemplate(23, SchedulesComponent_th_23_Template, 2, 0, "th", 7)(24, SchedulesComponent_td_24_Template, 3, 4, "td", 8);
            i0.ɵɵelementContainerEnd();
            i0.ɵɵelementContainerStart(25, 12);
            i0.ɵɵtemplate(26, SchedulesComponent_th_26_Template, 1, 0, "th", 7)(27, SchedulesComponent_td_27_Template, 7, 0, "td", 13);
            i0.ɵɵelementContainerEnd();
            i0.ɵɵtemplate(28, SchedulesComponent_tr_28_Template, 1, 0, "tr", 14)(29, SchedulesComponent_tr_29_Template, 1, 0, "tr", 15);
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance(12);
            i0.ɵɵproperty("dataSource", ctx.schedules);
            i0.ɵɵadvance(16);
            i0.ɵɵproperty("matHeaderRowDef", ctx.displayedColumns);
            i0.ɵɵadvance();
            i0.ɵɵproperty("matRowDefColumns", ctx.displayedColumns);
        } }, dependencies: [DatePipe, MatButtonModule, i1.MatButton, i1.MatIconButton, MatDialogModule, MatIconModule, i2.MatIcon, MatSnackBarModule, MatTableModule, i3.MatTable, i3.MatHeaderCellDef, i3.MatHeaderRowDef, i3.MatColumnDef, i3.MatCellDef, i3.MatRowDef, i3.MatHeaderCell, i3.MatCell, i3.MatHeaderRow, i3.MatRow, RouterLink], encapsulation: 2 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SchedulesComponent, [{
        type: Component,
        args: [{ selector: 'app-schedules', standalone: true, imports: [DatePipe, MatButtonModule, MatDialogModule, MatIconModule, MatSnackBarModule, MatTableModule, RouterLink], template: "<div class=\"page\">\n  <div class=\"page-title\">\n    <div>\n      <h1>Schedules</h1>\n      <p class=\"muted\">Generate and review shift schedules.</p>\n    </div>\n    <button mat-flat-button color=\"primary\" type=\"button\" routerLink=\"/schedules/new\">\n      <mat-icon>auto_awesome</mat-icon>\n      Generate schedule\n    </button>\n  </div>\n\n  <section class=\"panel table-wrap\">\n    <table mat-table [dataSource]=\"schedules\">\n      <ng-container matColumnDef=\"title\">\n        <th mat-header-cell *matHeaderCellDef>Title</th>\n        <td mat-cell *matCellDef=\"let schedule\">{{ schedule.title }}</td>\n      </ng-container>\n      <ng-container matColumnDef=\"range\">\n        <th mat-header-cell *matHeaderCellDef>Date range</th>\n        <td mat-cell *matCellDef=\"let schedule\">{{ schedule.startDate }} - {{ schedule.endDate }}</td>\n      </ng-container>\n      <ng-container matColumnDef=\"status\">\n        <th mat-header-cell *matHeaderCellDef>Status</th>\n        <td mat-cell *matCellDef=\"let schedule\">{{ schedule.status }}</td>\n      </ng-container>\n      <ng-container matColumnDef=\"createdAt\">\n        <th mat-header-cell *matHeaderCellDef>Created</th>\n        <td mat-cell *matCellDef=\"let schedule\">{{ schedule.createdAt | date: 'mediumDate' }}</td>\n      </ng-container>\n      <ng-container matColumnDef=\"actions\">\n        <th mat-header-cell *matHeaderCellDef></th>\n        <td mat-cell *matCellDef=\"let schedule\" class=\"actions\">\n          <button mat-icon-button type=\"button\" aria-label=\"Open schedule\" (click)=\"open(schedule)\">\n            <mat-icon>open_in_new</mat-icon>\n          </button>\n          <button mat-icon-button type=\"button\" aria-label=\"Delete schedule\" (click)=\"remove(schedule)\">\n            <mat-icon>delete</mat-icon>\n          </button>\n        </td>\n      </ng-container>\n      <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\n      <tr mat-row *matRowDef=\"let row; columns: displayedColumns\"></tr>\n    </table>\n  </section>\n</div>\n" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(SchedulesComponent, { className: "SchedulesComponent" }); })();
//# sourceMappingURL=schedules.component.js.map