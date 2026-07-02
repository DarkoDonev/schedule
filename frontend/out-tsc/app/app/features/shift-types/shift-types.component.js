import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { ApiService } from '../../core/api.service';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog.component';
import { ShiftTypeDialogComponent } from './shift-type-dialog.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/button";
import * as i2 from "@angular/material/icon";
import * as i3 from "@angular/material/table";
function ShiftTypesComponent_th_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "th", 15);
} }
function ShiftTypesComponent_td_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 16);
    i0.ɵɵelement(1, "span", 17);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const shiftType_r1 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵstyleProp("background", shiftType_r1.color || "#e5e7eb");
} }
function ShiftTypesComponent_th_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th", 15);
    i0.ɵɵtext(1, "Name");
    i0.ɵɵelementEnd();
} }
function ShiftTypesComponent_td_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 16);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const shiftType_r2 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(shiftType_r2.name);
} }
function ShiftTypesComponent_th_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th", 15);
    i0.ɵɵtext(1, "Time");
    i0.ɵɵelementEnd();
} }
function ShiftTypesComponent_td_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 16);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const shiftType_r3 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2("", shiftType_r3.startTime, " - ", shiftType_r3.endTime, "");
} }
function ShiftTypesComponent_th_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "th", 15);
} }
function ShiftTypesComponent_td_24_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "td", 18)(1, "button", 19);
    i0.ɵɵlistener("click", function ShiftTypesComponent_td_24_Template_button_click_1_listener() { const shiftType_r5 = i0.ɵɵrestoreView(_r4).$implicit; const ctx_r5 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r5.open(shiftType_r5)); });
    i0.ɵɵelementStart(2, "mat-icon");
    i0.ɵɵtext(3, "edit");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "button", 20);
    i0.ɵɵlistener("click", function ShiftTypesComponent_td_24_Template_button_click_4_listener() { const shiftType_r5 = i0.ɵɵrestoreView(_r4).$implicit; const ctx_r5 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r5.remove(shiftType_r5)); });
    i0.ɵɵelementStart(5, "mat-icon");
    i0.ɵɵtext(6, "delete");
    i0.ɵɵelementEnd()()();
} }
function ShiftTypesComponent_tr_25_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "tr", 21);
} }
function ShiftTypesComponent_tr_26_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "tr", 22);
} }
export class ShiftTypesComponent {
    constructor() {
        this.api = inject(ApiService);
        this.dialog = inject(MatDialog);
        this.snackBar = inject(MatSnackBar);
        this.displayedColumns = ['color', 'name', 'time', 'actions'];
        this.shiftTypes = [];
    }
    ngOnInit() {
        this.reload();
    }
    open(shiftType) {
        const dialogRef = this.dialog.open(ShiftTypeDialogComponent, { width: '680px', data: { shiftType } });
        dialogRef.afterClosed().subscribe((payload) => {
            if (!payload)
                return;
            const request = shiftType ? this.api.updateShiftType(shiftType.id, payload) : this.api.createShiftType(payload);
            request.subscribe({
                next: () => this.reload(),
                error: () => this.snackBar.open('Could not save shift type.', 'Close', { duration: 3000 }),
            });
        });
    }
    remove(shiftType) {
        this.dialog
            .open(ConfirmDialogComponent, {
            data: { title: 'Delete shift type', message: `Delete ${shiftType.name}?` },
        })
            .afterClosed()
            .subscribe((confirmed) => {
            if (!confirmed)
                return;
            this.api.deleteShiftType(shiftType.id).subscribe({
                next: () => this.reload(),
                error: () => this.snackBar.open('Could not delete shift type. It may be used by schedules.', 'Close', { duration: 4000 }),
            });
        });
    }
    reload() {
        this.api.shiftTypes().subscribe({
            next: (shiftTypes) => (this.shiftTypes = shiftTypes),
            error: () => this.snackBar.open('Could not load shift types.', 'Close', { duration: 3000 }),
        });
    }
    static { this.ɵfac = function ShiftTypesComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ShiftTypesComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ShiftTypesComponent, selectors: [["app-shift-types"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 27, vars: 3, consts: [[1, "page"], [1, "page-title"], [1, "muted"], ["mat-flat-button", "", "color", "primary", "type", "button", 3, "click"], [1, "panel", "table-wrap"], ["mat-table", "", 3, "dataSource"], ["matColumnDef", "color"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "name"], ["matColumnDef", "time"], ["matColumnDef", "actions"], ["mat-cell", "", "class", "actions", 4, "matCellDef"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["mat-header-cell", ""], ["mat-cell", ""], [1, "swatch"], ["mat-cell", "", 1, "actions"], ["mat-icon-button", "", "type", "button", "aria-label", "Edit shift type", 3, "click"], ["mat-icon-button", "", "type", "button", "aria-label", "Delete shift type", 3, "click"], ["mat-header-row", ""], ["mat-row", ""]], template: function ShiftTypesComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h1");
            i0.ɵɵtext(4, "Shift types");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "p", 2);
            i0.ɵɵtext(6, "Define the shifts used by generated schedules.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(7, "button", 3);
            i0.ɵɵlistener("click", function ShiftTypesComponent_Template_button_click_7_listener() { return ctx.open(); });
            i0.ɵɵelementStart(8, "mat-icon");
            i0.ɵɵtext(9, "add");
            i0.ɵɵelementEnd();
            i0.ɵɵtext(10, " Add shift ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(11, "section", 4)(12, "table", 5);
            i0.ɵɵelementContainerStart(13, 6);
            i0.ɵɵtemplate(14, ShiftTypesComponent_th_14_Template, 1, 0, "th", 7)(15, ShiftTypesComponent_td_15_Template, 2, 2, "td", 8);
            i0.ɵɵelementContainerEnd();
            i0.ɵɵelementContainerStart(16, 9);
            i0.ɵɵtemplate(17, ShiftTypesComponent_th_17_Template, 2, 0, "th", 7)(18, ShiftTypesComponent_td_18_Template, 2, 1, "td", 8);
            i0.ɵɵelementContainerEnd();
            i0.ɵɵelementContainerStart(19, 10);
            i0.ɵɵtemplate(20, ShiftTypesComponent_th_20_Template, 2, 0, "th", 7)(21, ShiftTypesComponent_td_21_Template, 2, 2, "td", 8);
            i0.ɵɵelementContainerEnd();
            i0.ɵɵelementContainerStart(22, 11);
            i0.ɵɵtemplate(23, ShiftTypesComponent_th_23_Template, 1, 0, "th", 7)(24, ShiftTypesComponent_td_24_Template, 7, 0, "td", 12);
            i0.ɵɵelementContainerEnd();
            i0.ɵɵtemplate(25, ShiftTypesComponent_tr_25_Template, 1, 0, "tr", 13)(26, ShiftTypesComponent_tr_26_Template, 1, 0, "tr", 14);
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance(12);
            i0.ɵɵproperty("dataSource", ctx.shiftTypes);
            i0.ɵɵadvance(13);
            i0.ɵɵproperty("matHeaderRowDef", ctx.displayedColumns);
            i0.ɵɵadvance();
            i0.ɵɵproperty("matRowDefColumns", ctx.displayedColumns);
        } }, dependencies: [MatButtonModule, i1.MatButton, i1.MatIconButton, MatDialogModule, MatIconModule, i2.MatIcon, MatSnackBarModule, MatTableModule, i3.MatTable, i3.MatHeaderCellDef, i3.MatHeaderRowDef, i3.MatColumnDef, i3.MatCellDef, i3.MatRowDef, i3.MatHeaderCell, i3.MatCell, i3.MatHeaderRow, i3.MatRow], styles: [".swatch[_ngcontent-%COMP%] {\n  width: 18px;\n  height: 18px;\n  display: inline-block;\n  border-radius: 50%;\n  box-shadow: inset 0 0 0 1px rgba(15, 23, 42, 0.12);\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ShiftTypesComponent, [{
        type: Component,
        args: [{ selector: 'app-shift-types', standalone: true, imports: [MatButtonModule, MatDialogModule, MatIconModule, MatSnackBarModule, MatTableModule], template: "<div class=\"page\">\n  <div class=\"page-title\">\n    <div>\n      <h1>Shift types</h1>\n      <p class=\"muted\">Define the shifts used by generated schedules.</p>\n    </div>\n    <button mat-flat-button color=\"primary\" type=\"button\" (click)=\"open()\">\n      <mat-icon>add</mat-icon>\n      Add shift\n    </button>\n  </div>\n\n  <section class=\"panel table-wrap\">\n    <table mat-table [dataSource]=\"shiftTypes\">\n      <ng-container matColumnDef=\"color\">\n        <th mat-header-cell *matHeaderCellDef></th>\n        <td mat-cell *matCellDef=\"let shiftType\">\n          <span class=\"swatch\" [style.background]=\"shiftType.color || '#e5e7eb'\"></span>\n        </td>\n      </ng-container>\n      <ng-container matColumnDef=\"name\">\n        <th mat-header-cell *matHeaderCellDef>Name</th>\n        <td mat-cell *matCellDef=\"let shiftType\">{{ shiftType.name }}</td>\n      </ng-container>\n      <ng-container matColumnDef=\"time\">\n        <th mat-header-cell *matHeaderCellDef>Time</th>\n        <td mat-cell *matCellDef=\"let shiftType\">{{ shiftType.startTime }} - {{ shiftType.endTime }}</td>\n      </ng-container>\n      <ng-container matColumnDef=\"actions\">\n        <th mat-header-cell *matHeaderCellDef></th>\n        <td mat-cell *matCellDef=\"let shiftType\" class=\"actions\">\n          <button mat-icon-button type=\"button\" aria-label=\"Edit shift type\" (click)=\"open(shiftType)\">\n            <mat-icon>edit</mat-icon>\n          </button>\n          <button mat-icon-button type=\"button\" aria-label=\"Delete shift type\" (click)=\"remove(shiftType)\">\n            <mat-icon>delete</mat-icon>\n          </button>\n        </td>\n      </ng-container>\n      <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\n      <tr mat-row *matRowDef=\"let row; columns: displayedColumns\"></tr>\n    </table>\n  </section>\n</div>\n", styles: [".swatch {\n  width: 18px;\n  height: 18px;\n  display: inline-block;\n  border-radius: 50%;\n  box-shadow: inset 0 0 0 1px rgba(15, 23, 42, 0.12);\n}\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ShiftTypesComponent, { className: "ShiftTypesComponent" }); })();
//# sourceMappingURL=shift-types.component.js.map