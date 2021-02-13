import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrayerControlComponent } from './prayer-control/prayer-control.component';
import { PrayerViewComponent } from './prayer-view/prayer-view.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
    { path: '', redirectTo: 'view', pathMatch: 'full' },
    { path: 'view', component: PrayerViewComponent },
    { path: 'control', component: PrayerControlComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes), CommonModule],
    exports: [RouterModule]
})
export class AppRoutingModule { }
