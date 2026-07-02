import { Component, Inject } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@angular/material/dialog";
import * as i3 from "@angular/material/button";
import * as i4 from "@angular/material/form-field";
import * as i5 from "@angular/material/input";
export class ShiftTypeDialogComponent {
    constructor(fb, dialogRef, data) {
        this.fb = fb;
        this.dialogRef = dialogRef;
        this.data = data;
        this.form = this.fb.nonNullable.group({
            name: [this.data.shiftType?.name ?? '', [Validators.required, Validators.minLength(2)]],
            startTime: [this.trimTime(this.data.shiftType?.startTime) ?? '08:00', [Validators.required]],
            endTime: [this.trimTime(this.data.shiftType?.endTime) ?? '16:00', [Validators.required]],
            color: [this.data.shiftType?.color ?? '#2563eb', [Validators.required]],
        });
    }
    save() {
        this.dialogRef.close(this.form.getRawValue());
    }
    trimTime(value) {
        return value?.slice(0, 5);
    }
    static { this.ɵfac = function ShiftTypeDialogComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ShiftTypeDialogComponent)(i0.ɵɵdirectiveInject(i1.FormBuilder), i0.ɵɵdirectiveInject(i2.MatDialogRef), i0.ɵɵdirectiveInject(MAT_DIALOG_DATA)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ShiftTypeDialogComponent, selectors: [["app-shift-type-dialog"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 25, vars: 3, consts: [["mat-dialog-title", ""], [1, "form-grid", 3, "formGroup"], ["appearance", "outline"], ["matInput", "", "formControlName", "name"], ["matInput", "", "type", "time", "formControlName", "startTime"], ["matInput", "", "type", "time", "formControlName", "endTime"], ["matInput", "", "type", "color", "formControlName", "color"], ["align", "end"], ["mat-button", "", "mat-dialog-close", ""], ["mat-flat-button", "", "color", "primary", 3, "click", "disabled"]], template: function ShiftTypeDialogComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "h2", 0);
            i0.ɵɵtext(1);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(2, "mat-dialog-content")(3, "form", 1)(4, "mat-form-field", 2)(5, "mat-label");
            i0.ɵɵtext(6, "Name");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(7, "input", 3);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "mat-form-field", 2)(9, "mat-label");
            i0.ɵɵtext(10, "Start time");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(11, "input", 4);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(12, "mat-form-field", 2)(13, "mat-label");
            i0.ɵɵtext(14, "End time");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(15, "input", 5);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(16, "mat-form-field", 2)(17, "mat-label");
            i0.ɵɵtext(18, "Color");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(19, "input", 6);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(20, "mat-dialog-actions", 7)(21, "button", 8);
            i0.ɵɵtext(22, "Cancel");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(23, "button", 9);
            i0.ɵɵlistener("click", function ShiftTypeDialogComponent_Template_button_click_23_listener() { return ctx.save(); });
            i0.ɵɵtext(24, "Save");
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate(ctx.data.shiftType ? "Edit shift type" : "Add shift type");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("formGroup", ctx.form);
            i0.ɵɵadvance(20);
            i0.ɵɵproperty("disabled", ctx.form.invalid);
        } }, dependencies: [ReactiveFormsModule, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.FormControlName, MatButtonModule, i3.MatButton, MatDialogModule, i2.MatDialogClose, i2.MatDialogTitle, i2.MatDialogActions, i2.MatDialogContent, MatFormFieldModule, i4.MatFormField, i4.MatLabel, MatInputModule, i5.MatInput], encapsulation: 2 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ShiftTypeDialogComponent, [{
        type: Component,
        args: [{
                selector: 'app-shift-type-dialog',
                standalone: true,
                imports: [ReactiveFormsModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule],
                template: `
    <h2 mat-dialog-title>{{ data.shiftType ? 'Edit shift type' : 'Add shift type' }}</h2>
    <mat-dialog-content>
      <form class="form-grid" [formGroup]="form">
        <mat-form-field appearance="outline">
          <mat-label>Name</mat-label>
          <input matInput formControlName="name">
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Start time</mat-label>
          <input matInput type="time" formControlName="startTime">
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>End time</mat-label>
          <input matInput type="time" formControlName="endTime">
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Color</mat-label>
          <input matInput type="color" formControlName="color">
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
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ShiftTypeDialogComponent, { className: "ShiftTypeDialogComponent" }); })();
//# sourceMappingURL=shift-type-dialog.component.js.map