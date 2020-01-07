import { Routes } from '@angular/router';
import { IngresoEgresoComponent } from '../ingreso-egreso/ingreso-egreso.component';
import { DetalleComponent } from '../ingreso-egreso/detalle/detalle.component';
import { EstadisticaComponent } from '../ingreso-egreso/estadistica/estadistica.component';

export const dashboardROUTES: Routes = [
    {path: '', component: EstadisticaComponent},
    {path: 'ingreso-egreso', component: IngresoEgresoComponent},
    {path: 'detalle', component: DetalleComponent},
];
