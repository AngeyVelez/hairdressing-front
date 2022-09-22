import { Routes } from '@angular/router';
import { AuthGuard } from '@core/guards';
import { Path } from '@core/structs';


export const PRIVATE_ROUTES: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: Path.Dashboard,
        loadChildren: () =>
          import('@app/pages/private/dashboard/dashboard.module').then(
            (m) => m.DashboardModule,
          ),
      },
    ],
  },
  {
    path: Path.Users,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('@app/pages/private/user/user.module').then(
        (m) => m.UserModule,
      ),
  },
  {
    path: Path.Services,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('@app/pages/private/servicios/servicios.module').then(
        (m) => m.ServiceModule,
      ),
  },
  {
    path: Path.Employees,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('@app/pages/private/employees/employee.module').then(
        (m) => m.EmployeeModule,
      ),
  },
  // {
  //   path: Path.Specialties,
  //   canActivate: [AuthGuard],
  //   loadChildren: () =>
  //     import('@app/pages/private/specialty/specialty.module').then(
  //       (m) => m.SpecialtyModule,
  //     ),
  // },
];
