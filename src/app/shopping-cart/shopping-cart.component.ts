import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CartItemComponent} from "../cart-item/cart-item.component";
import {BehaviorSubject, forkJoin, from, of} from "rxjs";
import {debounceTime, delay, map, pluck, reduce, scan, take} from "rxjs/operators";
import {EditCartComponent} from "../edit-cart/edit-cart.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AlertComponent} from "../alert/alert.component";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {BuyComponent} from "../buy/buy.component";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  cartItems: any[] = [];
  cartList = new BehaviorSubject<any[]>([]);
  cartList$ = this.cartList.asObservable();
  id: number = 0;
  totalArr: number[] = [];
  total: number = 0;
  open = of(null);

  constructor(private dialog: MatDialog, private edit: MatDialog, private alert: MatSnackBar, private buy: MatDialog) {
  }

  ngOnInit(): void {
    this.open.pipe(delay(2000)).subscribe(() => {
      this.alert.openFromComponent(AlertComponent, {
        duration: 5000,
      })
    })
  }

  addItem() {
    const dialog = this.dialog.open(CartItemComponent, {
      width: '40rem',
      height: '30rem',
      disableClose: true,
    })
    dialog.componentInstance.itemValue.subscribe((val: any) => {
      this.id++;
      val.push({'id': this.id})
      this.cartItems.push(val);
      this.cartList.next(this.cartItems);

    });
    dialog.componentInstance.getTotal.subscribe(val => {
      this.totalArr.push(val);
      from(this.totalArr).pipe(reduce((acc: any, curr: any) => acc + curr)).subscribe(val => {
        this.total = val;
      })
    });
  }

  deleteItem(index: number) {
    this.cartItems.map((sub, i) => {
      return sub.map((item: any) => {
        if (index == item.id) {
          this.cartItems.splice(i, 1);
          this.totalArr.splice(i, 1);
          if (this.totalArr.length == 0) {
            this.total = 0;
          }
          from(this.totalArr).pipe(reduce((acc: any, curr: any) => acc + curr)).subscribe(val => {
            this.total = val;
          })
        }
      })
    })
    this.cartList.next(this.cartItems);
  }

  editItem(index: number) {
    this.cartItems.map((sub,) => {
      sub.map((item: any) => {
        if (index == item.id) {
          const dialogRef = this.edit.open(EditCartComponent, {
            width: '40rem',
            height: '30rem',
            disableClose: true,
            data: {data: sub},
          })
          dialogRef.componentInstance.itemValue.subscribe((val: any[]) => {
            this.deleteItem(index);
            this.cartItems.push(val);
            this.cartList.next(this.cartItems);
          });
          dialogRef.componentInstance.getTotal.subscribe(val => {
            this.totalArr.push(val);
            from(this.totalArr).pipe(reduce((acc: any, curr: any) => acc + curr)).subscribe(val => {
              this.total = val;
            })
          })
        }
      })
    })
  }

  deleteAll() {
    this.cartItems = [];
    this.cartList.next(this.cartItems);
    this.total = 0;

  }

  buyAll() {
    this.buy.open(BuyComponent, {
      width: '30rem',
      height: '20rem',
      data: {amount: this.total}
    })
    this.cartItems = [];
    this.cartList.next(this.cartItems);
    this.total = 0;
  }
}

