import { Component, OnInit } from '@angular/core';
import { CategoryModel } from './models/category.model';
import { CategoryService } from './services/category.service';

@Component({
    selector: 'app-category',
    templateUrl: 'category.component.html',
    // providers: [CategoryService]
})

export class CategoryComponent implements OnInit {

    categoryList: CategoryModel[] = [];

    constructor(private categoryService: CategoryService) { }

    ngOnInit() {
        this.getCategories();
    }

    private getCategories() {
        this.categoryService.getCategories().subscribe(response => {
            this.categoryList = response;
        });
    }
}