import { Component, HostListener, OnDestroy } from '@angular/core';
import { PrayerIOService, Prayer } from '../utils/prayer-io.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
    templateUrl: './prayer-view.component.html',
    styleUrls: ['./prayer-view.component.scss']
})
export class PrayerViewComponent implements OnDestroy {
    prayer: Prayer | undefined = undefined;
    private subscription: Subscription;


    constructor(private readonly prayerIO: PrayerIOService, public readonly router: Router) {
        this.subscription = this.prayerIO.activePrayer$.subscribe({
            next: prayer => this.prayer = prayer
        });
    }


    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }


    get categories(): Set<string> {
        return this.prayerIO.categories;
    }
}
