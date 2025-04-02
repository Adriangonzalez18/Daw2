import { Routes } from '@angular/router';
import { usuarioComponent } from './pages/usuario/usuario.component';
import { usuarioViewComponent } from './pages/usuario-view/usuario-view.component';
import { FormusuarioComponent } from './pages/form-usuario/form-usuario.component';

export const routes: Routes = [
    {path:"", pathMatch: "full", redirectTo: "usuario"},
    {path: "usuario", component: usuarioComponent},
    {path: "usuario/:idusuario", component: usuarioViewComponent},
    {path: "nueva/usuario", component: FormusuarioComponent},
    {path: "actualizar/usuario/:idusuario", component: FormusuarioComponent},
    {path: "**", redirectTo: "usuario"}
];
