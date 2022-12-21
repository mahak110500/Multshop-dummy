import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HomeComponent } from './pages/home/home.component';
import { ShopDetailComponent } from './pages/shop-detail/shop-detail.component';
import { CheckoutComponent } from './pages/shop-pages/checkout/checkout.component';
import { ShopPagesComponent } from './pages/shop-pages/shop-pages.component';
import { ShoppingCartComponent } from './pages/shop-pages/shopping-cart/shopping-cart.component';
import { ShopComponent } from './pages/shop/shop.component';

const routes: Routes = [
	{ path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent
  },

  {
    path: 'shop',
    component: ShopComponent
  },
  {
    path: 'shop-detail',
    component: ShopDetailComponent
  },
  {
    path: 'shop-pages',
    component: ShopPagesComponent,
  },
  {
    path: 'shopping-cart',
    component: ShoppingCartComponent
  },
 
  {
    path: 'checkout',
    component: CheckoutComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'auth/:name',
    component: AuthComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
