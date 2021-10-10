import { BehaviorSubject, Observable, of, Subject, Subscription } from 'rxjs';
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

export const Categories = [
    'Versorgung',
    'Heilung',
    'Gesundheit',
    'Erweckung',
    'Kirche',
    'Stadt & Land',
    'Familie & Freunde',
    'Weisheit',
    'Freisetzung',
    'Schule & Ausbildung',
    'Trost',
    'Job'
    /*
    &[category="Versorgung"]            { background: #E57373; }
    &[category="Heilung"]               { background: #F06292; }
    &[category="Gesundheit"]            { background: #BA68C8; }
    &[category="Erweckung"]             { background: #9575CD; }
    &[category="Kirche"]                { background: #7986CB; }
    &[category="Stadt & Land"]          { background: #4DD0E1; }
    &[category="Familie & Freunde"]     { background: #81C784; }
    &[category="Weisheit"]              { background: #DCE775; }
    &[category="Freisetzung"]           { background: #FFF176; }
    &[category="Schule & Ausbildung"]   { background: #FFB74D; }
    &[category="Trost"]                 { background: #FF8A65; }
    &[category="Job"]                   { background: #90A4Ae; }
    */
];

/**
 * Regularly requests prayers from the backend and stores current ones
 */
@Injectable()
export class PrayerIOService {

    private static readonly INTERVAL = 500;

    // tslint:disable-next-line:variable-name
    private _prayers: Prayer[] = [];
    private prayersSubject = new Subject<Prayer[]>();
    private pending = new BehaviorSubject<boolean>(false);
    private activePrayer = new BehaviorSubject<Prayer | undefined>(undefined);
    private categoriesSubject = new BehaviorSubject<Set<string>>(new Set());


    constructor(private readonly http: HttpClient) {
        setInterval(() => {
            if (!this.isPending()) {
                this.pending.next(true);
                this.request().pipe(
                    finalize(() => this.pending.next(false))
                ).subscribe(prayers => this.readPrayers(prayers));
            }
        }, PrayerIOService.INTERVAL);
    }


    isPending(): boolean {
        return this.pending.value;
    }


    private request(): Observable<Prayer[]> {
        // DEBUG for tests with WebServer without PUT
        // if (this.prayers.length > 0) {
        //     return of(this.prayers);
        // }
        // END DEBUG

        return this.http.get('assets/prayers.json').pipe(map(
            data => data as Prayer[]
        ));
    }


    readPrayers(prayers: Prayer[]): void {
        this._prayers = prayers ?? [];
        // TODO performance: check differences and only update if such
        this.prayersSubject.next(this.prayers);
        this.activePrayer.next(this.prayers.find(prayer => prayer.active));
        this.categoriesSubject.next(new Set(this.prayers.map(prayer => prayer.category)));
    }


    writePrayers(prayers: Prayer[]): void {
        // only write if no reading is pending
        // const s: Subscription = this.pending.pipe(
        //     filter(pending => pending),
        //     finalize(() => s.unsubscribe())
        // ).subscribe(() => {
            this.http.put('assets/prayers.json', JSON.stringify(prayers)).subscribe();
            this.readPrayers(this.prayers);
        // });
    }


    next(): void {
        const index = this.prayers.findIndex(p => p.active);
        this.activate(this.prayers[index + 1]);
    }


    previous(): void {
        let index = this.prayers.findIndex(p => p.active);

        // if categories are active, select last prayer next
        if (index === -1) {
            index = this.prayers.length;
        }

        this.activate(this.prayers[index - 1]);
    }


    private activate(prayer: Prayer | undefined): void {
        // deactivate previous prayer
        const index = this.prayers.findIndex(p => p.active);
        if (index >= 0) {
            this.prayers[index].active = false;
        }

        if (prayer) {
            prayer.active = true;
        }
        this.writePrayers(this.prayers);
    }


    get prayers(): Prayer[] {
        return this._prayers;
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
