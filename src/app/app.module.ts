import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http'
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular'
import { HttpLink } from 'apollo-angular/http'
import { InMemoryCache } from '@apollo/client/core';
import { ExchangeRatesComponent } from './exchange-rates/exchange-rates.component';
import { CommonComponent } from './common/common.component';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { PagesComponent } from './pages/pages.component';
import { HomeComponent } from './pages/home/home.component';
import { ShopComponent } from './pages/shop/shop.component';
import { ShopDetailComponent } from './pages/shop-detail/shop-detail.component';
import { ShopPagesComponent } from './pages/shop-pages/shop-pages.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HeaderFirstComponent } from './common/header/header-first/header-first.component';
import { HeaderSecondComponent } from './common/header/header-second/header-second.component';
import { HeaderThirdComponent } from './common/header/header-third/header-third.component';
import { BannerComponent } from './pages/home/banner/banner.component';
import { CategoriesComponent } from './pages/home/categories/categories.component';
import { FeaturedProductsComponent } from './pages/home/featured-products/featured-products.component';
import { RecentProductsComponent } from './pages/home/recent-products/recent-products.component';
import { SpecialOffersComponent } from './pages/home/special-offers/special-offers.component';
import { VendorsComponent } from './pages/home/vendors/vendors.component';
import { ProductComponent } from './pages/shop-detail/product/product.component';
import { ProductDescriptionComponent } from './pages/shop-detail/product-description/product-description.component';
import { ProductSliderComponent } from './pages/shop-detail/product-slider/product-slider.component';
import { ShoppingCartComponent } from './pages/shop-pages/shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './pages/shop-pages/checkout/checkout.component';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './pages/auth/auth.component';
import { LoadingSpinnerComponent } from './pages/auth/loading-spinner/loading-spinner.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AuthGuard } from './pages/auth/auth.guard';
import { OrderSuccessfulComponent } from './pages/shop-pages/order-successful/order-successful.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import {NgxPaginationModule} from 'ngx-pagination';


@NgModule({
  declarations: [
    AppComponent,
    ExchangeRatesComponent,
    CommonComponent,
    HeaderComponent,
    FooterComponent,
    PagesComponent,
    HomeComponent,
    ShopComponent,
    ShopDetailComponent,
    ShopPagesComponent,
    ContactComponent,
    HeaderFirstComponent,
    HeaderSecondComponent,
    HeaderThirdComponent,
    BannerComponent,
    CategoriesComponent,
    FeaturedProductsComponent,
    RecentProductsComponent,
    SpecialOffersComponent,
    VendorsComponent,
    ProductComponent,
    ProductDescriptionComponent,
    ProductSliderComponent,
    ShoppingCartComponent,
    CheckoutComponent,
    AuthComponent,
    LoadingSpinnerComponent,
    OrderSuccessfulComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ApolloModule, 
    HttpClientModule,
    NgxStarRatingModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    CarouselModule,
    NgxPaginationModule
    
  ],
  providers: [
    AuthGuard,
    {
      provide: APOLLO_OPTIONS,
      useFactory(httpLink: HttpLink) {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: ' https://eshopper.saleor.cloud/graphql/'
          })
        }
      },
      deps: [HttpLink]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
