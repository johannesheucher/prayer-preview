import { Component, HostListener, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { PrayerIOService, Prayer } from '../utils/prayer-io.service';


@Component({
    selector: 'app-prayer-control',
    templateUrl: './prayer-control.component.html',
    styleUrls: ['./prayer-control.component.scss']
})
export class PrayerControlComponent implements AfterViewInit {
    prayers: Prayer[] = [];
    private editing = false;

    constructor(private readonly prayerIO: PrayerIOService, private readonly router: Router) {}


    ngAfterViewInit(): void {
        this.prayerIO.prayers$.pipe(filter(() => !this.editing)).subscribe({
            next: prayers => this.prayers = prayers
        });
    }


    startEditing(): void {
        this.editing = true;
    }


    submit(event: Event, prayer: Prayer): void {
        prayer.content = (event.target as HTMLElement)?.innerText;
        this.prayerIO.writePrayers(this.prayers);
        this.editing = false;
    }


    next(): void {
        const index = this.prayers.findIndex(p => p.active);
        this.activate(this.prayers[index + 1]);
    }


    activate(prayer: Prayer | undefined): void {
        // deactivate previous prayer
        const index = this.prayers.findIndex(p => p.active);
        if (index >= 0) {
            this.prayers[index].active = false;
        }

        if (prayer) {
            prayer.active = true;
        }
        this.prayerIO.writePrayers(this.prayers);
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
