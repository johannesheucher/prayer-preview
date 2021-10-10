import { Component, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';
import { EMPTY_PRAYER, Prayer, PrayerIOService } from 'src/app/utils/prayer-io.service';


@Component({
    selector: 'app-swipe-card',
    templateUrl: './swipe-card.component.html',
    styleUrls: ['./swipe-card.component.scss']
})
export class SwipeCardComponent {

    @Input()
    prayer: Prayer = EMPTY_PRAYER;
}
