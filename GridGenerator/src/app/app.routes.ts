import { Routes } from '@angular/router';
import { AuthPage } from './pages/auth/auth-page';
import { Generator } from './pages/generator/generator';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    {path: '', redirectTo: 'auth', pathMatch: 'full'},
    {
        path: 'auth',
        component:AuthPage
    },
    {
        canActivate: [authGuard],
        path:'generator',
        component:Generator
    }
];
