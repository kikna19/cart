import {Component, ElementRef, EventEmitter, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSelectChange} from "@angular/material/select";
import {from} from "rxjs";
import {first, take} from "rxjs/operators";

@Component({
  selector: 'app-edit-cart',
  templateUrl: './edit-cart.component.html',
  styleUrls: ['./edit-cart.component.scss']
})
export class EditCartComponent implements OnInit {
  cart!: FormGroup;
  quality!: string;
  @ViewChild('name', {static: false}) name!: ElementRef<HTMLInputElement>
  @ViewChild('country', {static: false}) country!: ElementRef<HTMLInputElement>
  @ViewChild('quantity', {static: false}) quantity!: ElementRef<any>
  itemValue = new EventEmitter<any[]>();
  nameVal!: string;
  countryVal: any;
  qualityVal: any;
  quantityVal!: number;
  priceVal!: number;
  disabled!: boolean;
  id!: number;
  getTotal = new EventEmitter<any>();
  oldQuantity!: number;


  constructor(@Inject(MAT_DIALOG_DATA) public arr: { data: any }, private fb: FormBuilder) {

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

  ngOnInit(): void {
    const editArray = from([this.arr.data]);
    editArray.pipe(take(7)).subscribe((val: any) => {
      this.nameVal = val[0].name;
      this.countryVal = val[1].country;
      this.qualityVal = val[2].quality;
      this.quantityVal = val[3].quantity;
      this.priceVal = val[4].price;
      this.disabled = val[5].disabled;
      this.id = val[6].id;
      this.oldQuantity = val[3].quantity;
    })
  }

  get form() {
    return this.cart.controls;
  }

  select(e: MatSelectChange) {
    this.quality = e.value;
  }

  update() {
    this.itemValue.emit([
      {'name': this.name.nativeElement.value},
      {'country': this.country.nativeElement.value},
      {'quality': this.qualityVal},
      {'quantity': this.quantity.nativeElement.value},
      {'price': this.priceVal},
      {'disabled': true},
      {'id': this.id},
    ]);
    this.getTotal.emit(this.quantity.nativeElement.value * this.priceVal);
  }
}
