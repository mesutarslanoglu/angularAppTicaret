import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full'
  },
  {
    path: 'product',
    component: ProductCreateComponent
  },
  {
    path: 'product/:productId',
    component: ProductCreateComponent
  },
  {
    path: 'products',
    component: ProductComponent
  },
  {
    path: 'products/:categoryId',
    component: ProductComponent
  },
  {
    path: 'my-cart',
    component: CartComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
