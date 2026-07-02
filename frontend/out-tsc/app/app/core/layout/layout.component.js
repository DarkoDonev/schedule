import { Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/button";
import * as i2 from "@angular/material/icon";
export class LayoutComponent {
    constructor() {
        this.auth = inject(AuthService);
        this.managerName = computed(() => this.auth.manager()?.name ?? 'Manager');
    }
    logout() {
        this.auth.logout();
    }
    static { this.ɵfac = function LayoutComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || LayoutComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: LayoutComponent, selectors: [["app-layout"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 30, vars: 1, consts: [[1, "shell"], [1, "brand"], ["routerLink", "/schedules", "routerLinkActive", "active"], ["routerLink", "/employees", "routerLinkActive", "active"], ["routerLink", "/shift-types", "routerLinkActive", "active"], [1, "muted"], ["mat-stroked-button", "", "type", "button", 3, "click"], [1, "content"]], template: function LayoutComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "aside")(2, "div", 1)(3, "mat-icon");
            i0.ɵɵtext(4, "calendar_month");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "span");
            i0.ɵɵtext(6, "Shift Schedule");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(7, "nav")(8, "a", 2)(9, "mat-icon");
            i0.ɵɵtext(10, "view_timeline");
            i0.ɵɵelementEnd();
            i0.ɵɵtext(11, " Schedules ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(12, "a", 3)(13, "mat-icon");
            i0.ɵɵtext(14, "badge");
            i0.ɵɵelementEnd();
            i0.ɵɵtext(15, " Employees ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(16, "a", 4)(17, "mat-icon");
            i0.ɵɵtext(18, "schedule");
            i0.ɵɵelementEnd();
            i0.ɵɵtext(19, " Shift types ");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(20, "main")(21, "header")(22, "span", 5);
            i0.ɵɵtext(23);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(24, "button", 6);
            i0.ɵɵlistener("click", function LayoutComponent_Template_button_click_24_listener() { return ctx.logout(); });
            i0.ɵɵelementStart(25, "mat-icon");
            i0.ɵɵtext(26, "logout");
            i0.ɵɵelementEnd();
            i0.ɵɵtext(27, " Logout ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(28, "section", 7);
            i0.ɵɵelement(29, "router-outlet");
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance(23);
            i0.ɵɵtextInterpolate(ctx.managerName());
        } }, dependencies: [MatButtonModule, i1.MatButton, MatIconModule, i2.MatIcon, RouterLink, RouterLinkActive, RouterOutlet], styles: [".shell[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  display: grid;\n  grid-template-columns: 260px 1fr;\n}\n\naside[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.82);\n  border-right: 1px solid var(--line);\n  padding: 24px;\n  backdrop-filter: blur(18px);\n}\n\n.brand[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  font-weight: 700;\n  margin-bottom: 28px;\n}\n\nnav[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 8px;\n}\n\nnav[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  border-radius: 12px;\n  color: #475569;\n  padding: 11px 12px;\n  transition: background 160ms ease, color 160ms ease;\n}\n\nnav[_ngcontent-%COMP%]   a.active[_ngcontent-%COMP%], \nnav[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  background: #eef4ff;\n  color: var(--accent);\n}\n\nmain[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n\nheader[_ngcontent-%COMP%] {\n  height: 70px;\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n  gap: 12px;\n  padding: 0 28px;\n}\n\n.content[_ngcontent-%COMP%] {\n  padding: 0 28px 32px;\n}\n\n@media (max-width: 860px) {\n  .shell[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  aside[_ngcontent-%COMP%] {\n    position: sticky;\n    top: 0;\n    z-index: 2;\n    padding: 14px 18px;\n  }\n\n  nav[_ngcontent-%COMP%] {\n    grid-auto-flow: column;\n    overflow-x: auto;\n  }\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LayoutComponent, [{
        type: Component,
        args: [{ selector: 'app-layout', standalone: true, imports: [MatButtonModule, MatIconModule, RouterLink, RouterLinkActive, RouterOutlet], template: "<div class=\"shell\">\n  <aside>\n    <div class=\"brand\">\n      <mat-icon>calendar_month</mat-icon>\n      <span>Shift Schedule</span>\n    </div>\n    <nav>\n      <a routerLink=\"/schedules\" routerLinkActive=\"active\">\n        <mat-icon>view_timeline</mat-icon>\n        Schedules\n      </a>\n      <a routerLink=\"/employees\" routerLinkActive=\"active\">\n        <mat-icon>badge</mat-icon>\n        Employees\n      </a>\n      <a routerLink=\"/shift-types\" routerLinkActive=\"active\">\n        <mat-icon>schedule</mat-icon>\n        Shift types\n      </a>\n    </nav>\n  </aside>\n\n  <main>\n    <header>\n      <span class=\"muted\">{{ managerName() }}</span>\n      <button mat-stroked-button type=\"button\" (click)=\"logout()\">\n        <mat-icon>logout</mat-icon>\n        Logout\n      </button>\n    </header>\n    <section class=\"content\">\n      <router-outlet />\n    </section>\n  </main>\n</div>\n", styles: [".shell {\n  min-height: 100vh;\n  display: grid;\n  grid-template-columns: 260px 1fr;\n}\n\naside {\n  background: rgba(255, 255, 255, 0.82);\n  border-right: 1px solid var(--line);\n  padding: 24px;\n  backdrop-filter: blur(18px);\n}\n\n.brand {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  font-weight: 700;\n  margin-bottom: 28px;\n}\n\nnav {\n  display: grid;\n  gap: 8px;\n}\n\nnav a {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  border-radius: 12px;\n  color: #475569;\n  padding: 11px 12px;\n  transition: background 160ms ease, color 160ms ease;\n}\n\nnav a.active,\nnav a:hover {\n  background: #eef4ff;\n  color: var(--accent);\n}\n\nmain {\n  min-width: 0;\n}\n\nheader {\n  height: 70px;\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n  gap: 12px;\n  padding: 0 28px;\n}\n\n.content {\n  padding: 0 28px 32px;\n}\n\n@media (max-width: 860px) {\n  .shell {\n    grid-template-columns: 1fr;\n  }\n\n  aside {\n    position: sticky;\n    top: 0;\n    z-index: 2;\n    padding: 14px 18px;\n  }\n\n  nav {\n    grid-auto-flow: column;\n    overflow-x: auto;\n  }\n}\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(LayoutComponent, { className: "LayoutComponent" }); })();
//# sourceMappingURL=layout.component.js.map