import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { PrayerIOService } from './utils/prayer-io.service';
import { PrayerViewComponent } from './prayer-view/prayer-view.component';
import { PrayerControlComponent } from './prayer-control/prayer-control.component';
import { CategoryComponent } from './category/category.component';
import { PrayerCardComponent } from './prayer-view/prayer-card/prayer-card.component';
import { CategoryCardComponent } from './prayer-view/category-card/category-card.component';

@NgModule({
    declarations: [
        AppComponent,
        CategoryCardComponent,
        CategoryComponent,
        PrayerCardComponent,
        PrayerViewComponent,
        PrayerControlComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        HttpClientModule
    ],
    providers: [
        PrayerIOService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
