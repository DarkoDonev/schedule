import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ApiService } from '../../core/api.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@angular/material/button";
import * as i3 from "@angular/material/form-field";
import * as i4 from "@angular/material/icon";
import * as i5 from "@angular/material/input";
import * as i6 from "@angular/material/select";
import * as i7 from "@angular/material/core";
const _forTrack0 = ($index, $item) => $item.id;
function ScheduleGenerateComponent_For_30_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-option", 11);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const employee_r1 = ctx.$implicit;
    i0.ɵɵproperty("value", employee_r1.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(employee_r1.fullName);
} }
function ScheduleGenerateComponent_For_36_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-option", 11);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const shiftType_r2 = ctx.$implicit;
    i0.ɵɵproperty("value", shiftType_r2.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(shiftType_r2.name);
} }
export class ScheduleGenerateComponent {
    constructor() {
        this.fb = inject(FormBuilder);
        this.api = inject(ApiService);
        this.router = inject(Router);
        this.snackBar = inject(MatSnackBar);
        this.form = this.fb.nonNullable.group({
            title: ['', [Validators.required, Validators.minLength(2)]],
            startDate: ['', [Validators.required]],
            endDate: ['', [Validators.required]],
            employeeIds: [[], [Validators.required]],
            shiftTypeIds: [[], [Validators.required]],
        });
        this.employees = [];
        this.shiftTypes = [];
        this.loading = false;
    }
    ngOnInit() {
        forkJoin({ employees: this.api.employees(), shiftTypes: this.api.shiftTypes() }).subscribe({
            next: ({ employees, shiftTypes }) => {
                this.employees = employees.filter((employee) => employee.isActive);
                this.shiftTypes = shiftTypes;
                this.form.patchValue({
                    employeeIds: this.employees.map((employee) => employee.id),
                    shiftTypeIds: this.shiftTypes.map((shiftType) => shiftType.id),
                });
            },
            error: () => this.snackBar.open('Could not load generation options.', 'Close', { duration: 3000 }),
        });
    }
    submit() {
        if (this.form.invalid)
            return;
        const payload = this.form.getRawValue();
        if (payload.startDate > payload.endDate) {
            this.snackBar.open('Start date must be before or equal to end date.', 'Close', { duration: 3000 });
            return;
        }
        this.loading = true;
        this.api.generateSchedule(payload).subscribe({
            next: (schedule) => void this.router.navigate(['/schedules', schedule.id]),
            error: () => {
                this.loading = false;
                this.snackBar.open('Could not generate schedule.', 'Close', { duration: 3500 });
            },
        });
    }
    static { this.ɵfac = function ScheduleGenerateComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ScheduleGenerateComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ScheduleGenerateComponent, selectors: [["app-schedule-generate"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 42, vars: 2, consts: [[1, "page"], [1, "page-title"], [1, "muted"], ["mat-stroked-button", "", "type", "button", "routerLink", "/schedules"], [1, "panel"], [1, "form-grid", 3, "ngSubmit", "formGroup"], ["appearance", "outline"], ["matInput", "", "formControlName", "title", "placeholder", "July roster"], ["matInput", "", "type", "date", "formControlName", "startDate"], ["matInput", "", "type", "date", "formControlName", "endDate"], ["formControlName", "employeeIds", "multiple", ""], [3, "value"], ["formControlName", "shiftTypeIds", "multiple", ""], [1, "actions"], ["mat-flat-button", "", "color", "primary", "type", "submit", 3, "disabled"]], template: function ScheduleGenerateComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h1");
            i0.ɵɵtext(4, "Generate schedule");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "p", 2);
            i0.ɵɵtext(6, "Choose dates, employees, and shifts. The backend will rotate assignments evenly.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(7, "button", 3)(8, "mat-icon");
            i0.ɵɵtext(9, "arrow_back");
            i0.ɵɵelementEnd();
            i0.ɵɵtext(10, " Back ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(11, "section", 4)(12, "form", 5);
            i0.ɵɵlistener("ngSubmit", function ScheduleGenerateComponent_Template_form_ngSubmit_12_listener() { return ctx.submit(); });
            i0.ɵɵelementStart(13, "mat-form-field", 6)(14, "mat-label");
            i0.ɵɵtext(15, "Title");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(16, "input", 7);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(17, "mat-form-field", 6)(18, "mat-label");
            i0.ɵɵtext(19, "Start date");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(20, "input", 8);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(21, "mat-form-field", 6)(22, "mat-label");
            i0.ɵɵtext(23, "End date");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(24, "input", 9);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(25, "mat-form-field", 6)(26, "mat-label");
            i0.ɵɵtext(27, "Employees");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(28, "mat-select", 10);
            i0.ɵɵrepeaterCreate(29, ScheduleGenerateComponent_For_30_Template, 2, 2, "mat-option", 11, _forTrack0);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(31, "mat-form-field", 6)(32, "mat-label");
            i0.ɵɵtext(33, "Shift types");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(34, "mat-select", 12);
            i0.ɵɵrepeaterCreate(35, ScheduleGenerateComponent_For_36_Template, 2, 2, "mat-option", 11, _forTrack0);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(37, "div", 13)(38, "button", 14)(39, "mat-icon");
            i0.ɵɵtext(40, "auto_awesome");
            i0.ɵɵelementEnd();
            i0.ɵɵtext(41, " Generate Schedule ");
            i0.ɵɵelementEnd()()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(12);
            i0.ɵɵproperty("formGroup", ctx.form);
            i0.ɵɵadvance(17);
            i0.ɵɵrepeater(ctx.employees);
            i0.ɵɵadvance(6);
            i0.ɵɵrepeater(ctx.shiftTypes);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("disabled", ctx.form.invalid || ctx.loading);
        } }, dependencies: [ReactiveFormsModule, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.FormControlName, RouterLink,
            MatButtonModule, i2.MatButton, MatCheckboxModule,
            MatFormFieldModule, i3.MatFormField, i3.MatLabel, MatIconModule, i4.MatIcon, MatInputModule, i5.MatInput, MatSelectModule, i6.MatSelect, i7.MatOption, MatSnackBarModule], encapsulation: 2 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ScheduleGenerateComponent, [{
        type: Component,
        args: [{ selector: 'app-schedule-generate', standalone: true, imports: [
                    ReactiveFormsModule,
                    RouterLink,
                    MatButtonModule,
                    MatCheckboxModule,
                    MatFormFieldModule,
                    MatIconModule,
                    MatInputModule,
                    MatSelectModule,
                    MatSnackBarModule,
                ], template: "<div class=\"page\">\n  <div class=\"page-title\">\n    <div>\n      <h1>Generate schedule</h1>\n      <p class=\"muted\">Choose dates, employees, and shifts. The backend will rotate assignments evenly.</p>\n    </div>\n    <button mat-stroked-button type=\"button\" routerLink=\"/schedules\">\n      <mat-icon>arrow_back</mat-icon>\n      Back\n    </button>\n  </div>\n\n  <section class=\"panel\">\n    <form class=\"form-grid\" [formGroup]=\"form\" (ngSubmit)=\"submit()\">\n      <mat-form-field appearance=\"outline\">\n        <mat-label>Title</mat-label>\n        <input matInput formControlName=\"title\" placeholder=\"July roster\">\n      </mat-form-field>\n\n      <mat-form-field appearance=\"outline\">\n        <mat-label>Start date</mat-label>\n        <input matInput type=\"date\" formControlName=\"startDate\">\n      </mat-form-field>\n\n      <mat-form-field appearance=\"outline\">\n        <mat-label>End date</mat-label>\n        <input matInput type=\"date\" formControlName=\"endDate\">\n      </mat-form-field>\n\n      <mat-form-field appearance=\"outline\">\n        <mat-label>Employees</mat-label>\n        <mat-select formControlName=\"employeeIds\" multiple>\n          @for (employee of employees; track employee.id) {\n            <mat-option [value]=\"employee.id\">{{ employee.fullName }}</mat-option>\n          }\n        </mat-select>\n      </mat-form-field>\n\n      <mat-form-field appearance=\"outline\">\n        <mat-label>Shift types</mat-label>\n        <mat-select formControlName=\"shiftTypeIds\" multiple>\n          @for (shiftType of shiftTypes; track shiftType.id) {\n            <mat-option [value]=\"shiftType.id\">{{ shiftType.name }}</mat-option>\n          }\n        </mat-select>\n      </mat-form-field>\n\n      <div class=\"actions\">\n        <button mat-flat-button color=\"primary\" type=\"submit\" [disabled]=\"form.invalid || loading\">\n          <mat-icon>auto_awesome</mat-icon>\n          Generate Schedule\n        </button>\n      </div>\n    </form>\n  </section>\n</div>\n" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ScheduleGenerateComponent, { className: "ScheduleGenerateComponent" }); })();
//# sourceMappingURL=schedule-generate.component.js.map