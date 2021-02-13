import { Component, HostBinding, Input } from '@angular/core';


@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss']
})
export class CategoryComponent {

    @Input()
    category = '';


    @HostBinding('attr.category')
    get categoryAttr(): string {
        return this.category;
    }
}
