import { Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ApiService } from '../../core/api.service';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog.component';
import { AssignmentDialogComponent } from './assignment-dialog.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/button";
import * as i2 from "@angular/material/icon";
const _forTrack0 = ($index, $item) => $item.id;
function ScheduleDetailsComponent_For_28_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 11);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "date");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const date_r1 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(2, 1, date_r1, "MMM d"));
} }
function ScheduleDetailsComponent_For_30_For_3_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵdeclareLet(0);
    i0.ɵɵelementStart(1, "button", 14);
    i0.ɵɵlistener("click", function ScheduleDetailsComponent_For_30_For_3_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r2); const assignment_r3 = i0.ɵɵreadContextLet(0); const ctx_r3 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r3.edit(assignment_r3)); });
    i0.ɵɵelement(2, "span", 15);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const date_r5 = ctx.$implicit;
    const employee_r6 = i0.ɵɵnextContext().$implicit;
    const assignment_r7 = i0.ɵɵstoreLet(i0.ɵɵnextContext().assignmentFor(employee_r6.id, date_r5));
    i0.ɵɵadvance();
    i0.ɵɵstyleProp("border-color", (assignment_r7 == null ? null : assignment_r7.shiftType == null ? null : assignment_r7.shiftType.color) || "#e5e7eb");
    i0.ɵɵadvance();
    i0.ɵɵstyleProp("background", (assignment_r7 == null ? null : assignment_r7.shiftType == null ? null : assignment_r7.shiftType.color) || "#cbd5e1");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", (assignment_r7 == null ? null : assignment_r7.shiftType == null ? null : assignment_r7.shiftType.name) || "-", " ");
} }
function ScheduleDetailsComponent_For_30_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 12);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(2, ScheduleDetailsComponent_For_30_For_3_Template, 4, 6, "button", 13, i0.ɵɵrepeaterTrackByIdentity);
} if (rf & 2) {
    const employee_r6 = ctx.$implicit;
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(employee_r6.fullName);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r3.dates);
} }
export class ScheduleDetailsComponent {
    constructor() {
        this.route = inject(ActivatedRoute);
        this.router = inject(Router);
        this.api = inject(ApiService);
        this.dialog = inject(MatDialog);
        this.snackBar = inject(MatSnackBar);
        this.dates = [];
        this.employees = [];
        this.shiftTypes = [];
    }
    ngOnInit() {
        this.load();
    }
    assignmentFor(employeeId, date) {
        return this.schedule?.assignments?.find((assignment) => assignment.employeeId === employeeId && assignment.date === date);
    }
    edit(assignment) {
        if (!assignment || !this.schedule)
            return;
        this.dialog
            .open(AssignmentDialogComponent, {
            width: '560px',
            data: { assignment, employees: this.employees, shiftTypes: this.shiftTypes },
        })
            .afterClosed()
            .subscribe((payload) => {
            if (!payload || !this.schedule)
                return;
            this.api.updateAssignment(this.schedule.id, assignment.id, payload).subscribe({
                next: () => this.load(),
                error: () => this.snackBar.open('Could not update assignment. Check for duplicate employee/date assignments.', 'Close', { duration: 4500 }),
            });
        });
    }
    regenerate() {
        if (!this.schedule)
            return;
        this.api.regenerateSchedule(this.schedule.id).subscribe({
            next: () => this.load(),
            error: () => this.snackBar.open('Could not regenerate schedule.', 'Close', { duration: 3000 }),
        });
    }
    export() {
        if (!this.schedule)
            return;
        this.api.exportSchedule(this.schedule.id).subscribe({
            next: (blob) => {
                const url = URL.createObjectURL(blob);
                const anchor = document.createElement('a');
                anchor.href = url;
                anchor.download = `${this.schedule?.title ?? 'schedule'}.xlsx`;
                anchor.click();
                URL.revokeObjectURL(url);
            },
            error: () => this.snackBar.open('Could not export schedule.', 'Close', { duration: 3000 }),
        });
    }
    remove() {
        if (!this.schedule)
            return;
        this.dialog
            .open(ConfirmDialogComponent, {
            data: { title: 'Delete schedule', message: `Delete ${this.schedule.title}?` },
        })
            .afterClosed()
            .subscribe((confirmed) => {
            if (!confirmed || !this.schedule)
                return;
            this.api.deleteSchedule(this.schedule.id).subscribe({
                next: () => void this.router.navigateByUrl('/schedules'),
                error: () => this.snackBar.open('Could not delete schedule.', 'Close', { duration: 3000 }),
            });
        });
    }
    load() {
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
            error: () => this.snackBar.open('Could not load schedule.', 'Close', { duration: 3000 }),
        });
    }
    uniqueEmployees(schedule, allEmployees) {
        const ids = new Set(schedule.assignments?.map((assignment) => assignment.employeeId) ?? []);
        return allEmployees.filter((employee) => ids.has(employee.id));
    }
    expandDates(startDate, endDate) {
        const dates = [];
        const cursor = new Date(`${startDate}T00:00:00.000Z`);
        const end = new Date(`${endDate}T00:00:00.000Z`);
        while (cursor <= end) {
            dates.push(cursor.toISOString().slice(0, 10));
            cursor.setUTCDate(cursor.getUTCDate() + 1);
        }
        return dates;
    }
    static { this.ɵfac = function ScheduleDetailsComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ScheduleDetailsComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ScheduleDetailsComponent, selectors: [["app-schedule-details"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 31, vars: 5, consts: [[1, "page"], [1, "page-title"], [1, "muted"], [1, "actions"], ["mat-stroked-button", "", "type", "button", "routerLink", "/schedules"], ["mat-stroked-button", "", "type", "button", 3, "click"], ["mat-flat-button", "", "color", "primary", "type", "button", 3, "click"], ["mat-icon-button", "", "type", "button", "aria-label", "Delete schedule", 3, "click"], [1, "panel", "schedule-grid-wrap"], [1, "schedule-grid"], [1, "grid-head", "sticky"], [1, "grid-head"], [1, "employee-name"], ["type", "button", 1, "shift-cell", 3, "borderColor"], ["type", "button", 1, "shift-cell", 3, "click"], [1, "dot"]], template: function ScheduleDetailsComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h1");
            i0.ɵɵtext(4);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "p", 2);
            i0.ɵɵtext(6);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(7, "div", 3)(8, "button", 4)(9, "mat-icon");
            i0.ɵɵtext(10, "arrow_back");
            i0.ɵɵelementEnd();
            i0.ɵɵtext(11, " Back ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(12, "button", 5);
            i0.ɵɵlistener("click", function ScheduleDetailsComponent_Template_button_click_12_listener() { return ctx.regenerate(); });
            i0.ɵɵelementStart(13, "mat-icon");
            i0.ɵɵtext(14, "refresh");
            i0.ɵɵelementEnd();
            i0.ɵɵtext(15, " Regenerate ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(16, "button", 6);
            i0.ɵɵlistener("click", function ScheduleDetailsComponent_Template_button_click_16_listener() { return ctx.export(); });
            i0.ɵɵelementStart(17, "mat-icon");
            i0.ɵɵtext(18, "download");
            i0.ɵɵelementEnd();
            i0.ɵɵtext(19, " Export ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(20, "button", 7);
            i0.ɵɵlistener("click", function ScheduleDetailsComponent_Template_button_click_20_listener() { return ctx.remove(); });
            i0.ɵɵelementStart(21, "mat-icon");
            i0.ɵɵtext(22, "delete");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(23, "section", 8)(24, "div", 9)(25, "div", 10);
            i0.ɵɵtext(26, "Employee");
            i0.ɵɵelementEnd();
            i0.ɵɵrepeaterCreate(27, ScheduleDetailsComponent_For_28_Template, 3, 4, "div", 11, i0.ɵɵrepeaterTrackByIdentity);
            i0.ɵɵrepeaterCreate(29, ScheduleDetailsComponent_For_30_Template, 4, 1, null, null, _forTrack0);
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(ctx.schedule == null ? null : ctx.schedule.title);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate2("", ctx.schedule == null ? null : ctx.schedule.startDate, " - ", ctx.schedule == null ? null : ctx.schedule.endDate, "");
            i0.ɵɵadvance(18);
            i0.ɵɵstyleProp("grid-template-columns", "220px repeat(" + ctx.dates.length + ", minmax(140px, 1fr))");
            i0.ɵɵadvance(3);
            i0.ɵɵrepeater(ctx.dates);
            i0.ɵɵadvance(2);
            i0.ɵɵrepeater(ctx.employees);
        } }, dependencies: [DatePipe, RouterLink, MatButtonModule, i1.MatButton, i1.MatIconButton, MatDialogModule, MatIconModule, i2.MatIcon, MatSnackBarModule], styles: [".schedule-grid-wrap[_ngcontent-%COMP%] {\n  overflow-x: auto;\n}\n\n.schedule-grid[_ngcontent-%COMP%] {\n  min-width: 760px;\n  display: grid;\n  gap: 8px;\n  align-items: stretch;\n}\n\n.grid-head[_ngcontent-%COMP%], \n.employee-name[_ngcontent-%COMP%], \n.shift-cell[_ngcontent-%COMP%] {\n  min-height: 48px;\n  display: flex;\n  align-items: center;\n  border-radius: 12px;\n  padding: 10px 12px;\n}\n\n.grid-head[_ngcontent-%COMP%] {\n  background: #f8fafc;\n  color: #475569;\n  font-weight: 700;\n}\n\n.employee-name[_ngcontent-%COMP%] {\n  background: #ffffff;\n  border: 1px solid var(--line);\n  font-weight: 600;\n}\n\n.shift-cell[_ngcontent-%COMP%] {\n  width: 100%;\n  background: #ffffff;\n  border: 1px solid;\n  gap: 8px;\n  font: inherit;\n  text-align: left;\n  cursor: pointer;\n  transition: transform 160ms ease, box-shadow 160ms ease;\n}\n\n.shift-cell[_ngcontent-%COMP%]:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 10px 20px rgba(15, 23, 42, 0.08);\n}\n\n.dot[_ngcontent-%COMP%] {\n  width: 10px;\n  height: 10px;\n  flex: 0 0 auto;\n  border-radius: 999px;\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ScheduleDetailsComponent, [{
        type: Component,
        args: [{ selector: 'app-schedule-details', standalone: true, imports: [DatePipe, RouterLink, MatButtonModule, MatDialogModule, MatIconModule, MatSnackBarModule], template: "<div class=\"page\">\n  <div class=\"page-title\">\n    <div>\n      <h1>{{ schedule?.title }}</h1>\n      <p class=\"muted\">{{ schedule?.startDate }} - {{ schedule?.endDate }}</p>\n    </div>\n    <div class=\"actions\">\n      <button mat-stroked-button type=\"button\" routerLink=\"/schedules\">\n        <mat-icon>arrow_back</mat-icon>\n        Back\n      </button>\n      <button mat-stroked-button type=\"button\" (click)=\"regenerate()\">\n        <mat-icon>refresh</mat-icon>\n        Regenerate\n      </button>\n      <button mat-flat-button color=\"primary\" type=\"button\" (click)=\"export()\">\n        <mat-icon>download</mat-icon>\n        Export\n      </button>\n      <button mat-icon-button type=\"button\" aria-label=\"Delete schedule\" (click)=\"remove()\">\n        <mat-icon>delete</mat-icon>\n      </button>\n    </div>\n  </div>\n\n  <section class=\"panel schedule-grid-wrap\">\n    <div class=\"schedule-grid\" [style.gridTemplateColumns]=\"'220px repeat(' + dates.length + ', minmax(140px, 1fr))'\">\n      <div class=\"grid-head sticky\">Employee</div>\n      @for (date of dates; track date) {\n        <div class=\"grid-head\">{{ date | date: 'MMM d' }}</div>\n      }\n\n      @for (employee of employees; track employee.id) {\n        <div class=\"employee-name\">{{ employee.fullName }}</div>\n        @for (date of dates; track date) {\n          @let assignment = assignmentFor(employee.id, date);\n          <button class=\"shift-cell\" type=\"button\" (click)=\"edit(assignment)\" [style.borderColor]=\"assignment?.shiftType?.color || '#e5e7eb'\">\n            <span class=\"dot\" [style.background]=\"assignment?.shiftType?.color || '#cbd5e1'\"></span>\n            {{ assignment?.shiftType?.name || '-' }}\n          </button>\n        }\n      }\n    </div>\n  </section>\n</div>\n", styles: [".schedule-grid-wrap {\n  overflow-x: auto;\n}\n\n.schedule-grid {\n  min-width: 760px;\n  display: grid;\n  gap: 8px;\n  align-items: stretch;\n}\n\n.grid-head,\n.employee-name,\n.shift-cell {\n  min-height: 48px;\n  display: flex;\n  align-items: center;\n  border-radius: 12px;\n  padding: 10px 12px;\n}\n\n.grid-head {\n  background: #f8fafc;\n  color: #475569;\n  font-weight: 700;\n}\n\n.employee-name {\n  background: #ffffff;\n  border: 1px solid var(--line);\n  font-weight: 600;\n}\n\n.shift-cell {\n  width: 100%;\n  background: #ffffff;\n  border: 1px solid;\n  gap: 8px;\n  font: inherit;\n  text-align: left;\n  cursor: pointer;\n  transition: transform 160ms ease, box-shadow 160ms ease;\n}\n\n.shift-cell:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 10px 20px rgba(15, 23, 42, 0.08);\n}\n\n.dot {\n  width: 10px;\n  height: 10px;\n  flex: 0 0 auto;\n  border-radius: 999px;\n}\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ScheduleDetailsComponent, { className: "ScheduleDetailsComponent" }); })();
//# sourceMappingURL=schedule-details.component.js.map