import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { CartService } from './cart/services/cart.service';
import { CartSummaryComponent } from './cart/cart-summary/cart-summary.component';
import { CategoryComponent } from './category/category.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { PipeModule } from './shared/pipe/pipe.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { ProductService } from './product/services/product.service';
import { CategoryService } from './category/services/category.service';
import { HttpCustomInterceptor } from './auth/http-custom.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    CartComponent,
    CartSummaryComponent,
    CategoryComponent,
    ProductCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    PipeModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
  providers: [
    ProductService,
    CartService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpCustomInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
