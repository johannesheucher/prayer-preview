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
import { SwipeCardComponent } from './prayer-control/swipe-card/swipe-card.component';
import { PrayerEditComponent } from './prayer-edit/prayer-edit.component';
import { EditableCardComponent } from './prayer-edit/editable-card/editable-card.component';

@NgModule({
    declarations: [
        AppComponent,
        CategoryCardComponent,
        CategoryComponent,
        PrayerCardComponent,
        PrayerViewComponent,
        PrayerControlComponent,
        PrayerEditComponent,
        SwipeCardComponent,
        EditableCardComponent
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
