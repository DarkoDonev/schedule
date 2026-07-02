import { authGuard } from './core/auth.guard';
import { LayoutComponent } from './core/layout/layout.component';
import { LoginComponent } from './features/auth/login.component';
import { EmployeesComponent } from './features/employees/employees.component';
import { ScheduleDetailsComponent } from './features/schedules/schedule-details.component';
import { ScheduleGenerateComponent } from './features/schedules/schedule-generate.component';
import { SchedulesComponent } from './features/schedules/schedules.component';
import { ShiftTypesComponent } from './features/shift-types/shift-types.component';
export const routes = [
    { path: 'login', component: LoginComponent },
    {
        path: '',
        component: LayoutComponent,
        canActivate: [authGuard],
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'schedules' },
            { path: 'employees', component: EmployeesComponent },
            { path: 'shift-types', component: ShiftTypesComponent },
            { path: 'schedules', component: SchedulesComponent },
            { path: 'schedules/new', component: ScheduleGenerateComponent },
            { path: 'schedules/:id', component: ScheduleDetailsComponent },
        ],
    },
    { path: '**', redirectTo: 'schedules' },
];
//# sourceMappingURL=app.routes.js.map