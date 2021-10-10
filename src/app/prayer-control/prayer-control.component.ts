import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { PrayerIOService, Prayer } from '../utils/prayer-io.service';


@Component({
    selector: 'app-prayer-control',
    templateUrl: './prayer-control.component.html',
    styleUrls: ['./prayer-control.component.scss']
})
export class PrayerControlComponent implements OnDestroy {
    prayer: Prayer | undefined = undefined;
    private subscription: Subscription;


    constructor(public readonly prayerIO: PrayerIOService) {
        this.subscription = this.prayerIO.activePrayer$.subscribe({
            next: prayer => this.prayer = prayer
        });
    }


    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }


    // @HostListener('click')
    // rotate(): void {
    //     let index = this.prayers.findIndex(prayer => prayer.active);
    //     if (index >= 0) {
    //         this.prayers[index].active = false;
    //     }
    //     index = Math.min(index + 1, this.prayers.length - 1);
    //     this.prayers[index].active = true;

    //     this.prayerIO.writePrayers(this.prayers);
    //     console.log('new active: ' + index);
    // }


    // @HostListener('document:keydown', ['$event'])
    // switchToView(event: KeyboardEvent): void {
    //     if (event.key === 'v') {
    //         console.log('switching to /view');
    //         this.router.navigateByUrl('view');
    //     }
    // }
}
