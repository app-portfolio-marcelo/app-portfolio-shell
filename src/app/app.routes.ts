import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { loadRemoteModule } from '@angular-architects/native-federation';

export const routes: Routes = [
    { path: '', component: Home },
    {
        path: 'solar_consult',
        loadComponent: () =>
          loadRemoteModule('solar_consult', './Component').then((m) => m.AppComponent),
    }
];
