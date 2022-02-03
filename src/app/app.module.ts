import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ShoppingCartComponent} from './shopping-cart/shopping-cart.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {CartItemComponent} from './cart-item/cart-item.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {ReactiveFormsModule} from "@angular/forms";
import {MatDividerModule} from "@angular/material/divider";
import {EditCartComponent} from './edit-cart/edit-cart.component';
import {AlertComponent} from './alert/alert.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatBottomSheetModule} from "@angular/material/bottom-sheet";
import { BuyComponent } from './buy/buy.component';

@NgModule({
  declarations: [
    AppComponent,
    ShoppingCartComponent,
    CartItemComponent,
    EditCartComponent,
    AlertComponent,
    BuyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
