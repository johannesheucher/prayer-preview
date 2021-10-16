import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrayerControlComponent } from './prayer-control/prayer-control.component';
import { PrayerViewComponent } from './prayer-view/prayer-view.component';
import { CommonModule } from '@angular/common';
import { PrayerEditComponent } from './prayer-edit/prayer-edit.component';

const routes: Routes = [
    { path: '', redirectTo: 'view', pathMatch: 'full' },
    { path: 'view', component: PrayerViewComponent },
    { path: 'control', component: PrayerControlComponent },
    { path: 'edit', component: PrayerEditComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes), CommonModule],
    exports: [RouterModule]
})
export class AppRoutingModule { }
