import { Component, inject } from '@angular/core';
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
import { ConfirmDialogComponent } from '../../shared/confirm-dialog.component';
import { EmployeeDialogComponent } from './employee-dialog.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@angular/material/button";
import * as i3 from "@angular/material/form-field";
import * as i4 from "@angular/material/icon";
import * as i5 from "@angular/material/input";
import * as i6 from "@angular/material/table";
function EmployeesComponent_th_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th", 20);
    i0.ɵɵtext(1, "Name");
    i0.ɵɵelementEnd();
} }
function EmployeesComponent_td_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 21);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const employee_r1 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(employee_r1.fullName);
} }
function EmployeesComponent_th_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th", 20);
    i0.ɵɵtext(1, "Email");
    i0.ɵɵelementEnd();
} }
function EmployeesComponent_td_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 21);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const employee_r2 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(employee_r2.email || "-");
} }
function EmployeesComponent_th_25_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th", 20);
    i0.ɵɵtext(1, "Phone");
    i0.ɵɵelementEnd();
} }
function EmployeesComponent_td_26_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 21);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const employee_r3 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(employee_r3.phone || "-");
} }
function EmployeesComponent_th_28_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th", 20);
    i0.ɵɵtext(1, "Position");
    i0.ɵɵelementEnd();
} }
function EmployeesComponent_td_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 21);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const employee_r4 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(employee_r4.position || "-");
} }
function EmployeesComponent_th_31_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th", 20);
    i0.ɵɵtext(1, "Status");
    i0.ɵɵelementEnd();
} }
function EmployeesComponent_td_32_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 21);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const employee_r5 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(employee_r5.isActive ? "Active" : "Inactive");
} }
function EmployeesComponent_th_34_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "th", 20);
} }
function EmployeesComponent_td_35_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "td", 22)(1, "button", 23);
    i0.ɵɵlistener("click", function EmployeesComponent_td_35_Template_button_click_1_listener() { const employee_r7 = i0.ɵɵrestoreView(_r6).$implicit; const ctx_r7 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r7.open(employee_r7)); });
    i0.ɵɵelementStart(2, "mat-icon");
    i0.ɵɵtext(3, "edit");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "button", 24);
    i0.ɵɵlistener("click", function EmployeesComponent_td_35_Template_button_click_4_listener() { const employee_r7 = i0.ɵɵrestoreView(_r6).$implicit; const ctx_r7 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r7.remove(employee_r7)); });
    i0.ɵɵelementStart(5, "mat-icon");
    i0.ɵɵtext(6, "delete");
    i0.ɵɵelementEnd()()();
} }
function EmployeesComponent_tr_36_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "tr", 25);
} }
function EmployeesComponent_tr_37_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "tr", 26);
} }
export class EmployeesComponent {
    constructor() {
        this.api = inject(ApiService);
        this.dialog = inject(MatDialog);
        this.snackBar = inject(MatSnackBar);
        this.search = new FormControl('', { nonNullable: true });
        this.displayedColumns = ['fullName', 'email', 'phone', 'position', 'isActive', 'actions'];
        this.employees = [];
    }
    ngOnInit() {
        this.search.valueChanges.pipe(startWith(''), debounceTime(200), switchMap((value) => this.api.employees(value))).subscribe({
            next: (employees) => (this.employees = employees),
            error: () => this.snackBar.open('Could not load employees.', 'Close', { duration: 3000 }),
        });
    }
    open(employee) {
        const dialogRef = this.dialog.open(EmployeeDialogComponent, { width: '720px', data: { employee } });
        dialogRef.afterClosed().subscribe((payload) => {
            if (!payload)
                return;
            const request = employee ? this.api.updateEmployee(employee.id, payload) : this.api.createEmployee(payload);
            request.subscribe({
                next: () => this.reload(),
                error: () => this.snackBar.open('Could not save employee.', 'Close', { duration: 3000 }),
            });
        });
    }
    remove(employee) {
        this.dialog
            .open(ConfirmDialogComponent, {
            data: { title: 'Delete employee', message: `Delete ${employee.fullName}?` },
        })
            .afterClosed()
            .subscribe((confirmed) => {
            if (!confirmed)
                return;
            this.api.deleteEmployee(employee.id).subscribe({
                next: () => this.reload(),
                error: () => this.snackBar.open('Could not delete employee. It may be used by schedules.', 'Close', { duration: 4000 }),
            });
        });
    }
    reload() {
        this.api.employees(this.search.value).subscribe((employees) => (this.employees = employees));
    }
    static { this.ɵfac = function EmployeesComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || EmployeesComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: EmployeesComponent, selectors: [["app-employees"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 38, vars: 4, consts: [[1, "page"], [1, "page-title"], [1, "muted"], ["mat-flat-button", "", "color", "primary", "type", "button", 3, "click"], [1, "panel"], ["appearance", "outline"], ["matInput", "", 3, "formControl"], [1, "table-wrap"], ["mat-table", "", 3, "dataSource"], ["matColumnDef", "fullName"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "email"], ["matColumnDef", "phone"], ["matColumnDef", "position"], ["matColumnDef", "isActive"], ["matColumnDef", "actions"], ["mat-cell", "", "class", "actions", 4, "matCellDef"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["mat-header-cell", ""], ["mat-cell", ""], ["mat-cell", "", 1, "actions"], ["mat-icon-button", "", "type", "button", "aria-label", "Edit employee", 3, "click"], ["mat-icon-button", "", "type", "button", "aria-label", "Delete employee", 3, "click"], ["mat-header-row", ""], ["mat-row", ""]], template: function EmployeesComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h1");
            i0.ɵɵtext(4, "Employees");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "p", 2);
            i0.ɵɵtext(6, "Manage active staff available for schedules.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(7, "button", 3);
            i0.ɵɵlistener("click", function EmployeesComponent_Template_button_click_7_listener() { return ctx.open(); });
            i0.ɵɵelementStart(8, "mat-icon");
            i0.ɵɵtext(9, "add");
            i0.ɵɵelementEnd();
            i0.ɵɵtext(10, " Add employee ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(11, "section", 4)(12, "mat-form-field", 5)(13, "mat-label");
            i0.ɵɵtext(14, "Search employees");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(15, "input", 6);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(16, "div", 7)(17, "table", 8);
            i0.ɵɵelementContainerStart(18, 9);
            i0.ɵɵtemplate(19, EmployeesComponent_th_19_Template, 2, 0, "th", 10)(20, EmployeesComponent_td_20_Template, 2, 1, "td", 11);
            i0.ɵɵelementContainerEnd();
            i0.ɵɵelementContainerStart(21, 12);
            i0.ɵɵtemplate(22, EmployeesComponent_th_22_Template, 2, 0, "th", 10)(23, EmployeesComponent_td_23_Template, 2, 1, "td", 11);
            i0.ɵɵelementContainerEnd();
            i0.ɵɵelementContainerStart(24, 13);
            i0.ɵɵtemplate(25, EmployeesComponent_th_25_Template, 2, 0, "th", 10)(26, EmployeesComponent_td_26_Template, 2, 1, "td", 11);
            i0.ɵɵelementContainerEnd();
            i0.ɵɵelementContainerStart(27, 14);
            i0.ɵɵtemplate(28, EmployeesComponent_th_28_Template, 2, 0, "th", 10)(29, EmployeesComponent_td_29_Template, 2, 1, "td", 11);
            i0.ɵɵelementContainerEnd();
            i0.ɵɵelementContainerStart(30, 15);
            i0.ɵɵtemplate(31, EmployeesComponent_th_31_Template, 2, 0, "th", 10)(32, EmployeesComponent_td_32_Template, 2, 1, "td", 11);
            i0.ɵɵelementContainerEnd();
            i0.ɵɵelementContainerStart(33, 16);
            i0.ɵɵtemplate(34, EmployeesComponent_th_34_Template, 1, 0, "th", 10)(35, EmployeesComponent_td_35_Template, 7, 0, "td", 17);
            i0.ɵɵelementContainerEnd();
            i0.ɵɵtemplate(36, EmployeesComponent_tr_36_Template, 1, 0, "tr", 18)(37, EmployeesComponent_tr_37_Template, 1, 0, "tr", 19);
            i0.ɵɵelementEnd()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(15);
            i0.ɵɵproperty("formControl", ctx.search);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("dataSource", ctx.employees);
            i0.ɵɵadvance(19);
            i0.ɵɵproperty("matHeaderRowDef", ctx.displayedColumns);
            i0.ɵɵadvance();
            i0.ɵɵproperty("matRowDefColumns", ctx.displayedColumns);
        } }, dependencies: [ReactiveFormsModule, i1.DefaultValueAccessor, i1.NgControlStatus, i1.FormControlDirective, MatButtonModule, i2.MatButton, i2.MatIconButton, MatDialogModule,
            MatFormFieldModule, i3.MatFormField, i3.MatLabel, MatIconModule, i4.MatIcon, MatInputModule, i5.MatInput, MatSlideToggleModule,
            MatSnackBarModule,
            MatTableModule, i6.MatTable, i6.MatHeaderCellDef, i6.MatHeaderRowDef, i6.MatColumnDef, i6.MatCellDef, i6.MatRowDef, i6.MatHeaderCell, i6.MatCell, i6.MatHeaderRow, i6.MatRow], encapsulation: 2 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(EmployeesComponent, [{
        type: Component,
        args: [{ selector: 'app-employees', standalone: true, imports: [
                    ReactiveFormsModule,
                    MatButtonModule,
                    MatDialogModule,
                    MatFormFieldModule,
                    MatIconModule,
                    MatInputModule,
                    MatSlideToggleModule,
                    MatSnackBarModule,
                    MatTableModule,
                ], template: "<div class=\"page\">\n  <div class=\"page-title\">\n    <div>\n      <h1>Employees</h1>\n      <p class=\"muted\">Manage active staff available for schedules.</p>\n    </div>\n    <button mat-flat-button color=\"primary\" type=\"button\" (click)=\"open()\">\n      <mat-icon>add</mat-icon>\n      Add employee\n    </button>\n  </div>\n\n  <section class=\"panel\">\n    <mat-form-field appearance=\"outline\">\n      <mat-label>Search employees</mat-label>\n      <input matInput [formControl]=\"search\">\n    </mat-form-field>\n\n    <div class=\"table-wrap\">\n      <table mat-table [dataSource]=\"employees\">\n        <ng-container matColumnDef=\"fullName\">\n          <th mat-header-cell *matHeaderCellDef>Name</th>\n          <td mat-cell *matCellDef=\"let employee\">{{ employee.fullName }}</td>\n        </ng-container>\n        <ng-container matColumnDef=\"email\">\n          <th mat-header-cell *matHeaderCellDef>Email</th>\n          <td mat-cell *matCellDef=\"let employee\">{{ employee.email || '-' }}</td>\n        </ng-container>\n        <ng-container matColumnDef=\"phone\">\n          <th mat-header-cell *matHeaderCellDef>Phone</th>\n          <td mat-cell *matCellDef=\"let employee\">{{ employee.phone || '-' }}</td>\n        </ng-container>\n        <ng-container matColumnDef=\"position\">\n          <th mat-header-cell *matHeaderCellDef>Position</th>\n          <td mat-cell *matCellDef=\"let employee\">{{ employee.position || '-' }}</td>\n        </ng-container>\n        <ng-container matColumnDef=\"isActive\">\n          <th mat-header-cell *matHeaderCellDef>Status</th>\n          <td mat-cell *matCellDef=\"let employee\">{{ employee.isActive ? 'Active' : 'Inactive' }}</td>\n        </ng-container>\n        <ng-container matColumnDef=\"actions\">\n          <th mat-header-cell *matHeaderCellDef></th>\n          <td mat-cell *matCellDef=\"let employee\" class=\"actions\">\n            <button mat-icon-button type=\"button\" aria-label=\"Edit employee\" (click)=\"open(employee)\">\n              <mat-icon>edit</mat-icon>\n            </button>\n            <button mat-icon-button type=\"button\" aria-label=\"Delete employee\" (click)=\"remove(employee)\">\n              <mat-icon>delete</mat-icon>\n            </button>\n          </td>\n        </ng-container>\n        <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\n        <tr mat-row *matRowDef=\"let row; columns: displayedColumns\"></tr>\n      </table>\n    </div>\n  </section>\n</div>\n" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(EmployeesComponent, { className: "EmployeesComponent" }); })();
//# sourceMappingURL=employees.component.js.map