import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { filter, finalize, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


export interface Prayer {
    content: string;
    category: string;
    thanks: boolean;
    active: boolean;
}
export const EMPTY_PRAYER: Prayer = { content: '', category: '', thanks: false, active: false };


/**
 * Regularly requests prayers from the backend and stores current ones
 */
@Injectable()
export class PrayerIOService {

    private prayersSubject = new BehaviorSubject<Prayer[]>([]);
    private pending = new BehaviorSubject<boolean>(false);
    private activePrayer = new BehaviorSubject<Prayer | undefined>(undefined);
    private categoriesSubject = new BehaviorSubject<Set<string>>(new Set());


    constructor(private readonly http: HttpClient) {
        setInterval(() => {
            if (!this.isPending()) {
                this.pending.next(true);
                this.readPrayers().pipe(
                    finalize(() => this.pending.next(false))
                ).subscribe(prayers => {
                    // TODO performance: check differences and only update if such
                    this.prayersSubject.next(prayers);
                    this.activePrayer.next(prayers.find(prayer => prayer.active));
                    this.categoriesSubject.next(new Set(prayers.map(prayer => prayer.category)));
                });
            }
        }, 2000);
    }


    isPending(): boolean {
        return this.pending.value;
    }


    private readPrayers(): Observable<Prayer[]> {
        return this.http.get('assets/prayers.json').pipe(map(
            data => data as Prayer[]
        ));
    }


    writePrayers(prayers: Prayer[]): void {
        // only write if no reading is pending
        // const s: Subscription = this.pending.pipe(
        //     filter(pending => pending),
        //     finalize(() => s.unsubscribe())
        // ).subscribe(() => {
            this.http.put('assets/prayers.json', JSON.stringify(prayers)).subscribe();
        // });
    }


    get prayers(): Prayer[] {
        return this.prayersSubject.value;
    }


    get categories(): Set<string> {
        return this.categoriesSubject.value;
    }


    get prayers$(): Observable<Prayer[]> {
        return this.prayersSubject.asObservable();
    }


    get activePrayer$(): Observable<Prayer | undefined> {
        return this.activePrayer.asObservable();
    }
}
