import { Component, Inject } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@angular/material/dialog";
import * as i3 from "@angular/material/button";
import * as i4 from "@angular/material/checkbox";
import * as i5 from "@angular/material/form-field";
import * as i6 from "@angular/material/input";
export class EmployeeDialogComponent {
    constructor(fb, dialogRef, data) {
        this.fb = fb;
        this.dialogRef = dialogRef;
        this.data = data;
        this.form = this.fb.nonNullable.group({
            fullName: [this.data.employee?.fullName ?? '', [Validators.required, Validators.minLength(2)]],
            email: [this.data.employee?.email ?? '', [Validators.email]],
            phone: [this.data.employee?.phone ?? ''],
            position: [this.data.employee?.position ?? ''],
            isActive: [this.data.employee?.isActive ?? true],
        });
    }
    save() {
        this.dialogRef.close(this.form.getRawValue());
    }
    static { this.ɵfac = function EmployeeDialogComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || EmployeeDialogComponent)(i0.ɵɵdirectiveInject(i1.FormBuilder), i0.ɵɵdirectiveInject(i2.MatDialogRef), i0.ɵɵdirectiveInject(MAT_DIALOG_DATA)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: EmployeeDialogComponent, selectors: [["app-employee-dialog"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 27, vars: 3, consts: [["mat-dialog-title", ""], [1, "form-grid", 3, "formGroup"], ["appearance", "outline"], ["matInput", "", "formControlName", "fullName"], ["matInput", "", "type", "email", "formControlName", "email"], ["matInput", "", "formControlName", "phone"], ["matInput", "", "formControlName", "position"], ["formControlName", "isActive"], ["align", "end"], ["mat-button", "", "mat-dialog-close", ""], ["mat-flat-button", "", "color", "primary", 3, "click", "disabled"]], template: function EmployeeDialogComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "h2", 0);
            i0.ɵɵtext(1);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(2, "mat-dialog-content")(3, "form", 1)(4, "mat-form-field", 2)(5, "mat-label");
            i0.ɵɵtext(6, "Full name");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(7, "input", 3);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "mat-form-field", 2)(9, "mat-label");
            i0.ɵɵtext(10, "Email");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(11, "input", 4);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(12, "mat-form-field", 2)(13, "mat-label");
            i0.ɵɵtext(14, "Phone");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(15, "input", 5);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(16, "mat-form-field", 2)(17, "mat-label");
            i0.ɵɵtext(18, "Position");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(19, "input", 6);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(20, "mat-checkbox", 7);
            i0.ɵɵtext(21, "Active");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(22, "mat-dialog-actions", 8)(23, "button", 9);
            i0.ɵɵtext(24, "Cancel");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(25, "button", 10);
            i0.ɵɵlistener("click", function EmployeeDialogComponent_Template_button_click_25_listener() { return ctx.save(); });
            i0.ɵɵtext(26, "Save");
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate(ctx.data.employee ? "Edit employee" : "Add employee");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("formGroup", ctx.form);
            i0.ɵɵadvance(22);
            i0.ɵɵproperty("disabled", ctx.form.invalid);
        } }, dependencies: [ReactiveFormsModule, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.FormControlName, MatButtonModule, i3.MatButton, MatCheckboxModule, i4.MatCheckbox, MatDialogModule, i2.MatDialogClose, i2.MatDialogTitle, i2.MatDialogActions, i2.MatDialogContent, MatFormFieldModule, i5.MatFormField, i5.MatLabel, MatInputModule, i6.MatInput], encapsulation: 2 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(EmployeeDialogComponent, [{
        type: Component,
        args: [{
                selector: 'app-employee-dialog',
                standalone: true,
                imports: [ReactiveFormsModule, MatButtonModule, MatCheckboxModule, MatDialogModule, MatFormFieldModule, MatInputModule],
                template: `
    <h2 mat-dialog-title>{{ data.employee ? 'Edit employee' : 'Add employee' }}</h2>
    <mat-dialog-content>
      <form class="form-grid" [formGroup]="form">
        <mat-form-field appearance="outline">
          <mat-label>Full name</mat-label>
          <input matInput formControlName="fullName">
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Email</mat-label>
          <input matInput type="email" formControlName="email">
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Phone</mat-label>
          <input matInput formControlName="phone">
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Position</mat-label>
          <input matInput formControlName="position">
        </mat-form-field>
        <mat-checkbox formControlName="isActive">Active</mat-checkbox>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-flat-button color="primary" [disabled]="form.invalid" (click)="save()">Save</button>
    </mat-dialog-actions>
  `,
            }]
    }], () => [{ type: i1.FormBuilder }, { type: i2.MatDialogRef }, { type: undefined, decorators: [{
                type: Inject,
                args: [MAT_DIALOG_DATA]
            }] }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(EmployeeDialogComponent, { className: "EmployeeDialogComponent" }); })();
//# sourceMappingURL=employee-dialog.component.js.map