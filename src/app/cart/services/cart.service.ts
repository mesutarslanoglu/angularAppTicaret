import { Injectable } from '@angular/core';
import { ProductModel } from 'src/app/product/models/product.model';
import { AlertService } from 'src/app/shared/services/alert.service';
import { CART_ITEMS } from '../models/cart-item.const';
import { CartModel } from '../models/cart.model';
import { RemoveType } from '../models/remove-type.enum';

@Injectable({ providedIn: 'root' })
export class CartService {

    constructor(private alertService: AlertService) { }

    addToCart(product: ProductModel): void {
        const data = CART_ITEMS.find(item => item.product.productId === product.productId);
        if (data) {
            data.count++;
            return;
        }

        const model = new CartModel();
        model.count = 1;
        model.product = product;
        CART_ITEMS.push(model);
    }

    list(): CartModel[] {
        return CART_ITEMS;
    }

    removeFromCart(cart: CartModel, removeType: RemoveType): void {
        const data = CART_ITEMS.find(item => item.product.productId === cart.product.productId);

        if (data) {
            if (data.count > 1 && removeType === RemoveType.single) {
                data.count--;
                return;
            }

            const index = CART_ITEMS.indexOf(data);
            if (index > -1) {
                CART_ITEMS.splice(index, 1);
                this.alertService.showSuccessMessage();
            }
        }

    }

}