import { Routes } from '@angular/router';
import { EstablecimientosComponent } from './pages/establecimientos/establecimientos.component';
import { ProfesionalesComponent } from './pages/profesionales/profesionales.component';
import { ReservarTurnosComponent } from './pages/turnos/reservar/reservar-turnos.component';
import { EspecialidadesComponent } from './pages/especialidades/especialidades.component';

export const routes: Routes = [

    { path: 'establecimientos', component: EstablecimientosComponent },

    { path: 'especialidades', component: EspecialidadesComponent },

    { path: 'profesionales', component: ProfesionalesComponent },

    { path: 'turnos/reservar', component: ReservarTurnosComponent },

];
