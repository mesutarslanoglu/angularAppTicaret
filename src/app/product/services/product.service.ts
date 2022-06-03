import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { LocalStorageType } from 'src/app/shared/enum/local-storage-type.enum';
import { AlertService } from 'src/app/shared/services/alert.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { ProductModel } from '../models/product.model';

@Injectable()
export class ProductService {

    private readonly apiUrl = environment.apiUrl;

    constructor(public http: HttpClient,
        private localStorageService: LocalStorageService,
        private alertService: AlertService) { }

    getProduct(): Observable<ProductModel[]> {
        return this.http.get(`${this.apiUrl}Products`).pipe(
            map((response: ProductModel[]) => {
                this.localStorageService.setItem(LocalStorageType.products, response);
                return response;
            })
        );
    }

    getProductById(id: number): ProductModel {
        const products = this.getProductLocalStorage(0);
        const product = products.find(x => x.productId === id);
        return product;
    }

    getProductLocalStorage(id: number): ProductModel[] {
        const data = this.localStorageService.getItem(LocalStorageType.products) as ProductModel[];
        if (data) {
            if (id > 0) {
                return data.filter(x => x.categoryId === id);
            }
            return data;
        }
        return [];
    }

    addProduct(model: ProductModel): boolean {

        // this.http.post(`${this.apiUrl}AddProduct`, model);
        const products = this.localStorageService.getItem(LocalStorageType.products) as ProductModel[];
        if (products) {
            const lastProduct = products[products.length - 1];
            model.productId = (lastProduct.productId + 1);
            products.push(model);
            this.alertService.showSuccessMessage();
            return this.localStorageService.setItem(LocalStorageType.products, products);
        }

        this.alertService.showErrorMessage();
        return false;
    }

    updateProduct(model: ProductModel): boolean {
        const products = this.getProductLocalStorage(0);
        if (products) {
            let product = products.find(x => x.productId === model.productId);
            const productIndex = products.indexOf(product);
            products.splice(productIndex, 1);
            products.push(model);
            this.alertService.showSuccessMessage();
            return this.localStorageService.setItem(LocalStorageType.products, products);
        }

        this.alertService.showErrorMessage();
        return false;
    }

    removeProduct(id: number) {
        const products = this.getProductLocalStorage(0);
        if (products) {
            const product = products.find(x=> x.productId === id);
            const index = products.indexOf(product);
            products.splice(index, 1);
            this.alertService.showSuccessMessage();
            return this.localStorageService.setItem(LocalStorageType.products, products);
        }

        this.alertService.showErrorMessage();
        return false;
    }

}