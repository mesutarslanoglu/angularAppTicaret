import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CartModel } from './models/cart.model';
import { RemoveType } from './models/remove-type.enum';
import { CartService } from './services/cart.service';

@Component({
    selector: 'app-cart',
    templateUrl: 'cart.component.html'
})

export class CartComponent implements OnInit {

    cartList: CartModel[] = [];

    _removeType = RemoveType;

    constructor(private cartService: CartService) { }

    ngOnInit() {
        this.cartList = this.cartService.list();
    }

    getTotal(cart: CartModel) {
        return cart.count * cart.product.unitPrice;
    }

    getTotalKdv(cart: CartModel) {
        return (cart.count * (cart.product.unitPrice + ((cart.product.unitPrice / 100) * 18)));
    }

    removeFromCart(cart: CartModel, removeType: RemoveType) {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                this.cartService.removeFromCart(cart, removeType);
            }
        })
    }


}