import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./components/background/background.component').then(m => m.BackgroundComponent) },
];
