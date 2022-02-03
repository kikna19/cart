import {Component, ElementRef, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSelectChange} from "@angular/material/select";

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {
  cart!: FormGroup;
  quality!: string;
  @ViewChild('name', {static: false}) name!: ElementRef<HTMLInputElement>
  @ViewChild('country', {static: false}) country!: ElementRef<HTMLInputElement>
  @ViewChild('quantity', {static: false}) quantity!: ElementRef<any>
  itemValue = new EventEmitter<any[]>();
  sum: number = 0;
  getTotal = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {
    this.cart = this.fb.group({
      name: ['', [Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20),
        Validators.pattern("^[a-zA-Z]*$")
      ]],
      country: ['', [Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20),
        Validators.pattern("^[a-zA-Z]*$")
      ]],
      quality: ['', [Validators.required]],
      quantity: ['', [Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.min(1),
        Validators.max(10)]]
    })
  }

  ngOnInit(): void {}

  get form() {
    return this.cart.controls;
  }

  select(e: MatSelectChange) {
    this.quality = e.value;
  }

  add() {
    this.sum = Math.floor((Math.random()*100)+1);
    this.itemValue.emit([
      {'name': this.name.nativeElement.value},
      {'country': this.country.nativeElement.value},
      {'quality': this.quality},
      {'quantity': this.quantity.nativeElement.value},
      {'price': this.sum},
      {'disable': false}
    ])
    this.getTotal.emit(
    this.sum * this.quantity.nativeElement.value
    )
  }
}
