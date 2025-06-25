import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubscriptionPlansComponent } from './features/subscriptionplan/subscriptionplan.component';
import { LegacyComponent } from './features/legacy/legacy.component';
import { ObituaryInfoComponent } from './features/obituary-info/obituary-info.component';

// const routes: Routes = [
//   {
//     path: '',
//     redirectTo: 'legacy',
//     pathMatch: 'full',
//   },
//   {
//     path: 'legacy',
//     component: LegacyComponent,
//     // pathMatch: 'full',
//   },
//   {
//     path: 'auth',
//     loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
//   },
//   {
//     path: 'admin',
//     loadChildren: () =>
//       import('./features/admin/admin.module').then((m) => m.AdminModule),
//   },
//   {
//     path: '',

//     loadChildren: () =>
//       import('./features/features.module').then((m) => m.FeaturesModule),
//   },

//   {
//     path: 'subscription-plans',
//     component: SubscriptionPlansComponent,
//   },
//   // {
//   //   path: 'obituary-info',
//   //   component: ObituaryInfoComponent,
//   // },
//   {
//     path: '**',
//     redirectTo: 'legacy',
//   },
// ];
// app-routing.module.ts
const routes: Routes = [
  {
    path: '',
    redirectTo: 'legacy',
    pathMatch: 'full',
  },
  {
    path: 'legacy',
    component: LegacyComponent,
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./features/admin/admin.module').then((m) => m.AdminModule),
  },
  // Remove this duplicate empty path route
  // {
  //   path: '',
  //   loadChildren: () => import('./features/features.module').then((m) => m.FeaturesModule),
  // },
  {
    path: '',
    loadChildren: () =>
      import('./features/features.module').then((m) => m.FeaturesModule),
  },
  {
    path: 'subscription-plans',
    component: SubscriptionPlansComponent,
  },
  {
    path: '**',
    redirectTo: 'legacy',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
