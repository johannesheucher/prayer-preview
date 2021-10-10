import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { filter, first } from 'rxjs/operators';
import { PrayerIOService, Prayer, EMPTY_PRAYER, Categories } from '../utils/prayer-io.service';


@Component({
    selector: 'app-prayer-control',
    templateUrl: './prayer-control.component.html',
    styleUrls: ['./prayer-control.component.scss']
})
export class PrayerControlComponent implements AfterViewInit {
    categories = Categories;
    prayers: Prayer[] = [];
    private editing = false;

    @ViewChild('new', { static: false }) newRow: ElementRef | null = null;


    constructor(private readonly prayerIO: PrayerIOService, private readonly router: Router) {}


    ngAfterViewInit(): void {
        this.updatePrayers();
    }


    private updatePrayers(): void {
        this.prayerIO.prayers$.pipe(first()).subscribe({
            next: prayers => {
                this.prayers = prayers;
            }
        });
    }


    startEditing(): void {
        this.editing = true;
    }


    changeContent(prayer: Prayer, target: EventTarget | null): void {
        if ((target instanceof HTMLElement)) {
            prayer.content = target.innerText;
            this.submit();
            if (this.newRow?.nativeElement.innerText) {
                this.newRow.nativeElement.innerText = '';
            }
        }
    }


    changeCategory(prayer: Prayer, target: EventTarget | null): void {
        if (target && target instanceof HTMLSelectElement) {
            prayer.category = target.value;
            this.submit();
        }
    }


    changeThank(prayer: Prayer, target: EventTarget | null): void {
        if (target && target instanceof HTMLInputElement) {
            prayer.thanks = target.checked;
            this.submit();
        }
    }


    delete(prayer: Prayer): void {
        const index = this.prayers.findIndex(p => p === prayer);
        if (index >= 0) {
            this.prayers.splice(index, 1);
            this.submit();
        }
    }


    submit(): void {
        this.prayerIO.writePrayers(this.prayers);
        this.editing = false;
        this.updatePrayers();
    }


    createPrayer(): Prayer {
        const prayer = EMPTY_PRAYER;
        this.prayers.push(prayer);
        return prayer;
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
        this.submit();
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
