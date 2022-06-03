import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoryModel } from '../category/models/category.model';
import { CategoryService } from '../category/services/category.service';
import { ProductModel } from '../product/models/product.model';
import { ProductService } from '../product/services/product.service';

@Component({
    selector: 'app-product-create',
    templateUrl: 'product-create.component.html'
})

export class ProductCreateComponent implements OnInit {

    categoryList: CategoryModel[] = [];

    /**** Reactive Form *****/
    form: FormGroup;
    entity: ProductModel;

    /**** Forms (ngModel) *****/
    product: ProductModel = new ProductModel();

    constructor(private fb: FormBuilder,
        private productService: ProductService,
        private categoryService: CategoryService,
        private activatedRoute: ActivatedRoute) { }

    get f() {
        return this.form.controls;
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe(param => {
            const id = param['productId'];
            if (id) {
                this.getProductById(Number(id));
            }
        });

        this.initForm();
        this.getCategories();
    }

    initForm() {
        this.form = this.fb.group({
            categoryId: [this.entity?.categoryId, Validators.required],
            productId: [this.entity?.productId],
            productName: [this.entity?.productName,
            Validators.compose([
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(100)
            ])
            ],
            quantityPerUnit: [this.entity?.quantityPerUnit,
            Validators.compose([
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(100)
            ])
            ],
            unitPrice: [this.entity?.unitPrice, Validators.required]
        });
    }

    getCategories() {
        this.categoryService.getCategories()
            .subscribe(response => {
                this.categoryList = response;
            });
    }

    getProductById(id: number) {
        const model = this.productService.getProductById(id);
        if (model) {
            this.entity = model;
            this.product = model;
        }
    }

    onSaveReactiveForm() {
        if (this.form.valid) {
            // const formData1 = this.form.value;
            const model = this.form.getRawValue() as ProductModel;

            let saveControl = false;

            if (model.productId) {
                saveControl = this.productService.updateProduct(model);
            }
            else {
                saveControl = this.productService.addProduct(model);
            }

            if (saveControl) {
                this.form.reset();
            }
        }
    }

    onSaveForm() {
        const addControl = this.productService.addProduct(this.product);

        if (addControl) {
            this.product = new ProductModel();
        }
    }

}