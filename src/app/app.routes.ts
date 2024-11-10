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

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
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
    path: 'support',
    component: SupportComponent,
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
    path: 'auth/login',
    component: AuthLoginComponent,
  },
  {
    path: 'auth/register',
    component: AuthRegisterComponent,
  },
  {
    path: '**',
    redirectTo: () => {
      return 'home';
    }
  }
];
