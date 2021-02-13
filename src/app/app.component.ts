import { Component, AfterViewInit } from '@angular/core';
import { PrayerIOService, Prayer } from './utils/prayer-io.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    // private prayers: Prayer[] = [];
    // prayer: Prayer | undefined = undefined;


    // constructor(private readonly prayerIO: PrayerIOService) {}


    // ngAfterViewInit(): void {
    //     // start loop to check prayers file
    //     setInterval(() => {
    //         // TODO try-catch for the case that reading is done while writing

    //         console.log('reading prayers file');
    //         this.prayerIO.readPrayers().subscribe({
    //             next: prayers => {
    //                 // this.prayers = prayers;
    //                 this.prayer = prayers.find(prayer => prayer.active);
    //             }
    //         });
    //     }, 2000);
    // }


    // @HostListener('click')
    // rotate(): void {
    //     this.prayerIndex = this.prayerIndex + 1 < this.prayers.length ? this.prayerIndex + 1 : 0;
    // }
}
