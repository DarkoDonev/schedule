import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@angular/material/button";
import * as i3 from "@angular/material/form-field";
import * as i4 from "@angular/material/icon";
import * as i5 from "@angular/material/input";
export class LoginComponent {
    constructor() {
        this.fb = inject(FormBuilder);
        this.auth = inject(AuthService);
        this.router = inject(Router);
        this.snackBar = inject(MatSnackBar);
        this.form = this.fb.nonNullable.group({
            email: ['manager@example.com', [Validators.required, Validators.email]],
            password: ['ChangeMe123!', [Validators.required, Validators.minLength(8)]],
        });
        this.loading = false;
    }
    submit() {
        if (this.form.invalid)
            return;
        this.loading = true;
        this.auth.login(this.form.controls.email.value, this.form.controls.password.value).subscribe({
            next: () => void this.router.navigateByUrl('/schedules'),
            error: () => {
                this.loading = false;
                this.snackBar.open('Invalid email or password.', 'Close', { duration: 3500 });
            },
        });
    }
    static { this.ɵfac = function LoginComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || LoginComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: LoginComponent, selectors: [["app-login"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 22, vars: 2, consts: [[1, "login-screen"], [1, "login-panel"], [1, "mark"], [1, "muted"], [3, "ngSubmit", "formGroup"], ["appearance", "outline"], ["matInput", "", "type", "email", "formControlName", "email", "autocomplete", "email"], ["matInput", "", "type", "password", "formControlName", "password", "autocomplete", "current-password"], ["mat-flat-button", "", "color", "primary", "type", "submit", 3, "disabled"]], template: function LoginComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "main", 0)(1, "section", 1)(2, "div", 2)(3, "mat-icon");
            i0.ɵɵtext(4, "calendar_month");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(5, "h1");
            i0.ɵɵtext(6, "Shift Schedule");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "p", 3);
            i0.ɵɵtext(8, "Manager access");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(9, "form", 4);
            i0.ɵɵlistener("ngSubmit", function LoginComponent_Template_form_ngSubmit_9_listener() { return ctx.submit(); });
            i0.ɵɵelementStart(10, "mat-form-field", 5)(11, "mat-label");
            i0.ɵɵtext(12, "Email");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(13, "input", 6);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(14, "mat-form-field", 5)(15, "mat-label");
            i0.ɵɵtext(16, "Password");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(17, "input", 7);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(18, "button", 8)(19, "mat-icon");
            i0.ɵɵtext(20, "login");
            i0.ɵɵelementEnd();
            i0.ɵɵtext(21, " Login ");
            i0.ɵɵelementEnd()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(9);
            i0.ɵɵproperty("formGroup", ctx.form);
            i0.ɵɵadvance(9);
            i0.ɵɵproperty("disabled", ctx.form.invalid || ctx.loading);
        } }, dependencies: [ReactiveFormsModule, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.FormControlName, MatButtonModule, i2.MatButton, MatFormFieldModule, i3.MatFormField, i3.MatLabel, MatIconModule, i4.MatIcon, MatInputModule, i5.MatInput, MatSnackBarModule], styles: [".login-screen[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  display: grid;\n  place-items: center;\n  padding: 24px;\n  background: radial-gradient(circle at top, #ffffff 0, #f6f7fb 52%, #eef2f7 100%);\n}\n\n.login-panel[_ngcontent-%COMP%] {\n  width: min(420px, 100%);\n  background: rgba(255, 255, 255, 0.9);\n  border: 1px solid rgba(15, 23, 42, 0.06);\n  border-radius: 22px;\n  box-shadow: 0 24px 70px rgba(15, 23, 42, 0.10);\n  padding: 34px;\n}\n\n.mark[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  display: grid;\n  place-items: center;\n  border-radius: 14px;\n  background: #eef4ff;\n  color: var(--accent);\n}\n\nh1[_ngcontent-%COMP%] {\n  margin: 20px 0 4px;\n  font-size: 32px;\n  letter-spacing: 0;\n}\n\nform[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 14px;\n  margin-top: 28px;\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LoginComponent, [{
        type: Component,
        args: [{ selector: 'app-login', standalone: true, imports: [ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSnackBarModule], template: "<main class=\"login-screen\">\n  <section class=\"login-panel\">\n    <div class=\"mark\">\n      <mat-icon>calendar_month</mat-icon>\n    </div>\n    <h1>Shift Schedule</h1>\n    <p class=\"muted\">Manager access</p>\n\n    <form [formGroup]=\"form\" (ngSubmit)=\"submit()\">\n      <mat-form-field appearance=\"outline\">\n        <mat-label>Email</mat-label>\n        <input matInput type=\"email\" formControlName=\"email\" autocomplete=\"email\">\n      </mat-form-field>\n\n      <mat-form-field appearance=\"outline\">\n        <mat-label>Password</mat-label>\n        <input matInput type=\"password\" formControlName=\"password\" autocomplete=\"current-password\">\n      </mat-form-field>\n\n      <button mat-flat-button color=\"primary\" type=\"submit\" [disabled]=\"form.invalid || loading\">\n        <mat-icon>login</mat-icon>\n        Login\n      </button>\n    </form>\n  </section>\n</main>\n", styles: [".login-screen {\n  min-height: 100vh;\n  display: grid;\n  place-items: center;\n  padding: 24px;\n  background: radial-gradient(circle at top, #ffffff 0, #f6f7fb 52%, #eef2f7 100%);\n}\n\n.login-panel {\n  width: min(420px, 100%);\n  background: rgba(255, 255, 255, 0.9);\n  border: 1px solid rgba(15, 23, 42, 0.06);\n  border-radius: 22px;\n  box-shadow: 0 24px 70px rgba(15, 23, 42, 0.10);\n  padding: 34px;\n}\n\n.mark {\n  width: 48px;\n  height: 48px;\n  display: grid;\n  place-items: center;\n  border-radius: 14px;\n  background: #eef4ff;\n  color: var(--accent);\n}\n\nh1 {\n  margin: 20px 0 4px;\n  font-size: 32px;\n  letter-spacing: 0;\n}\n\nform {\n  display: grid;\n  gap: 14px;\n  margin-top: 28px;\n}\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(LoginComponent, { className: "LoginComponent" }); })();
//# sourceMappingURL=login.component.js.map