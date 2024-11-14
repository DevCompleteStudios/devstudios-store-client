import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SubscriptionsComponent } from './pages/subscriptions/subscriptions.component';
import { ViewScriptComponent } from './pages/view-script/view-script.component';
import { DashboardAdminComponent } from './pages/dashboard-admin/dashboard-admin.component';
import { AuthLoginComponent } from './pages/auth-login/auth-login.component';
import { AuthRegisterComponent } from './pages/auth-register/auth-register.component';
import { SupportComponent } from './pages/support/support.component';
import { TermsComponent } from './pages/terms/terms.component';
import { FaqComponent } from './pages/faq/faq.component';
import { PaymentSuccesComponent } from './pages/payment-succes/payment-succes.component';
import { isLoggedGuard } from './guards/auth/is-logged.guard';
import { isNotLoggedGuard } from './guards/auth/is-not-logged.guard';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [isLoggedGuard]
  },
  {
    path: 'subscriptions',
    component: SubscriptionsComponent
  },
  {
    path: 'details/:id',
    component: ViewScriptComponent,
  },
  {
    path: 'dashboard/admin',
    component: DashboardAdminComponent,
  },
  {
    path: 'terms',
    component: TermsComponent,
  },
  {
    path: 'faq',
    component: FaqComponent,
  },
  {
    path: 'payment-succes',
    component: PaymentSuccesComponent,
  },
  {
    path: 'auth/login',
    component: AuthLoginComponent,
    canActivate: [isNotLoggedGuard]
  },
  {
    path: 'auth/register',
    component: AuthRegisterComponent,
    canActivate: [isNotLoggedGuard]
  },
  {
    path: 'auth/forgot-password',
    component: ForgotPasswordComponent,
    canActivate: [isNotLoggedGuard]
  },
  {
    path: '**',
    redirectTo: () => {
      return 'home';
    }
  }
];
