import { Component, Inject } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@angular/material/dialog";
import * as i3 from "@angular/material/button";
import * as i4 from "@angular/material/form-field";
import * as i5 from "@angular/material/select";
import * as i6 from "@angular/material/core";
const _forTrack0 = ($index, $item) => $item.id;
function AssignmentDialogComponent_For_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-option", 4);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const employee_r1 = ctx.$implicit;
    i0.ɵɵproperty("value", employee_r1.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(employee_r1.fullName);
} }
function AssignmentDialogComponent_For_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-option", 4);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const shiftType_r2 = ctx.$implicit;
    i0.ɵɵproperty("value", shiftType_r2.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(shiftType_r2.name);
} }
export class AssignmentDialogComponent {
    constructor(fb, dialogRef, data) {
        this.fb = fb;
        this.dialogRef = dialogRef;
        this.data = data;
        this.form = this.fb.nonNullable.group({
            employeeId: [this.data.assignment.employeeId, [Validators.required]],
            shiftTypeId: [this.data.assignment.shiftTypeId, [Validators.required]],
        });
    }
    save() {
        this.dialogRef.close(this.form.getRawValue());
    }
    static { this.ɵfac = function AssignmentDialogComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AssignmentDialogComponent)(i0.ɵɵdirectiveInject(i1.FormBuilder), i0.ɵɵdirectiveInject(i2.MatDialogRef), i0.ɵɵdirectiveInject(MAT_DIALOG_DATA)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AssignmentDialogComponent, selectors: [["app-assignment-dialog"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 21, vars: 2, consts: [["mat-dialog-title", ""], [1, "form-grid", 3, "formGroup"], ["appearance", "outline"], ["formControlName", "employeeId"], [3, "value"], ["formControlName", "shiftTypeId"], ["align", "end"], ["mat-button", "", "mat-dialog-close", ""], ["mat-flat-button", "", "color", "primary", 3, "click", "disabled"]], template: function AssignmentDialogComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "h2", 0);
            i0.ɵɵtext(1, "Edit assignment");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(2, "mat-dialog-content")(3, "form", 1)(4, "mat-form-field", 2)(5, "mat-label");
            i0.ɵɵtext(6, "Employee");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "mat-select", 3);
            i0.ɵɵrepeaterCreate(8, AssignmentDialogComponent_For_9_Template, 2, 2, "mat-option", 4, _forTrack0);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(10, "mat-form-field", 2)(11, "mat-label");
            i0.ɵɵtext(12, "Shift");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(13, "mat-select", 5);
            i0.ɵɵrepeaterCreate(14, AssignmentDialogComponent_For_15_Template, 2, 2, "mat-option", 4, _forTrack0);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(16, "mat-dialog-actions", 6)(17, "button", 7);
            i0.ɵɵtext(18, "Cancel");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(19, "button", 8);
            i0.ɵɵlistener("click", function AssignmentDialogComponent_Template_button_click_19_listener() { return ctx.save(); });
            i0.ɵɵtext(20, "Save");
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("formGroup", ctx.form);
            i0.ɵɵadvance(5);
            i0.ɵɵrepeater(ctx.data.employees);
            i0.ɵɵadvance(6);
            i0.ɵɵrepeater(ctx.data.shiftTypes);
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("disabled", ctx.form.invalid);
        } }, dependencies: [ReactiveFormsModule, i1.ɵNgNoValidate, i1.NgControlStatus, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.FormControlName, MatButtonModule, i3.MatButton, MatDialogModule, i2.MatDialogClose, i2.MatDialogTitle, i2.MatDialogActions, i2.MatDialogContent, MatFormFieldModule, i4.MatFormField, i4.MatLabel, MatSelectModule, i5.MatSelect, i6.MatOption], encapsulation: 2 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AssignmentDialogComponent, [{
        type: Component,
        args: [{
                selector: 'app-assignment-dialog',
                standalone: true,
                imports: [ReactiveFormsModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatSelectModule],
                template: `
    <h2 mat-dialog-title>Edit assignment</h2>
    <mat-dialog-content>
      <form class="form-grid" [formGroup]="form">
        <mat-form-field appearance="outline">
          <mat-label>Employee</mat-label>
          <mat-select formControlName="employeeId">
            @for (employee of data.employees; track employee.id) {
              <mat-option [value]="employee.id">{{ employee.fullName }}</mat-option>
            }
          </mat-select>
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Shift</mat-label>
          <mat-select formControlName="shiftTypeId">
            @for (shiftType of data.shiftTypes; track shiftType.id) {
              <mat-option [value]="shiftType.id">{{ shiftType.name }}</mat-option>
            }
          </mat-select>
        </mat-form-field>
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
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AssignmentDialogComponent, { className: "AssignmentDialogComponent" }); })();
//# sourceMappingURL=assignment-dialog.component.js.map