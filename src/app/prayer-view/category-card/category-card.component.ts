import { Component, AfterViewInit, Input } from '@angular/core';
import { EMPTY_PRAYER, Prayer } from '../../utils/prayer-io.service';


@Component({
    selector: 'app-category-card',
    templateUrl: './category-card.component.html',
    styleUrls: ['../prayer-card/prayer-card.component.scss', './category-card.component.scss']
})
export class CategoryCardComponent {
    @Input()
    categories: Set<string> = new Set<string>();
}
