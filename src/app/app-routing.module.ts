import { AuthGuard } from './auth/auth.guard';
import { TrainingComponent } from './training/training.component';
import { LoginComponent } from './auth/login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { SignupComponent } from './auth/signup/signup.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// In this case, training route is protected by AuthGuard. That means.
// In this case, we can only access training component if we are loggedIn. 
// Otherwise, training component will be redirected to login route.

const routes: Routes = [
    { path: '', component: WelcomeComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'login', component: LoginComponent },
    { path: 'training', component: TrainingComponent, canActivate: [AuthGuard] }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard]

})
export class AppRoutingModule { }