import { Component, Input } from '@angular/core';
import { EMPTY_PRAYER, Prayer } from '../../utils/prayer-io.service';


@Component({
    selector: 'app-prayer-card',
    templateUrl: './prayer-card.component.html',
    styleUrls: ['./prayer-card.component.scss']
})
export class PrayerCardComponent {
    @Input()
    prayer: Prayer = EMPTY_PRAYER;
}
