import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./page/landing-page/landing-page.module').then(
        (m) => m.LandingPageModule
      ),
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./page/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./page/login-page/login-page.module').then(
        (m) => m.LoginPageModule
      ),
  },
  {
    path: 'spreadsheet/:id',
    loadChildren: () =>
      import('./page/spreadsheet/spreadsheet.module').then(
        (m) => m.SpreadsheetModule
      ),
  },
  {
    path: 'aboutus',
    loadChildren: () =>
      import('./page/about-us/about-us.module').then((m) => m.AboutUsModule),
  },
  {
    path: 'feedback',
    loadChildren: () =>
      import('./page/feedback/feedback.module').then((m) => m.FeedbackModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
