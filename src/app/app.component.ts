import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    constructor(private readonly router: Router) {
    }



    @HostListener('document:keydown', ['$event'])
    keydown(event: KeyboardEvent): void {
        if (event.key === '1' && event.ctrlKey) {
            console.log('switching to /view');
            this.router.navigateByUrl('view');
        } else if (event.key === '2' && event.ctrlKey) {
            console.log('switching to /control');
            this.router.navigateByUrl('control');
        } else if (event.key === '3' && event.ctrlKey) {
            console.log('switching to /edit');
            this.router.navigateByUrl('edit');
        }
    }
}
