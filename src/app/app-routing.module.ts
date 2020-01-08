import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { dashboardROUTES } from './dashboard/dashboard.routes';
import { AuthGuardService } from './auth/auth-guard.service';

const ROUTES: Routes = [
    {path : 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {
        path: '',
        component: DashboardComponent,
        children: dashboardROUTES,
        canActivate: [ AuthGuardService ]
    },
    {path: '**', redirectTo: ''}
];

@NgModule({
    imports: [
        RouterModule.forRoot(ROUTES)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule { }
