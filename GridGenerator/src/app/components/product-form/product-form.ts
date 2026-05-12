import { CardData } from './../../models/card-data';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Store } from '../../services/store';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  imports: [FormsModule, CommonModule ],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css',
})
export class ProductForm {
  private storeService = inject(Store);
  protected productName: string = '';
  protected productPrice: number = 0;
  protected productDiscout: number = 0;
  protected productOriginalPrice: number = 0;
  protected productCode: string = '';
  protected productFullSpecs:{key: string, value: string}[] = [];    
  protected productQRSpecs:{key: string, value: string}[] = [];
  @Output() productAdded: EventEmitter<CardData> = new EventEmitter<CardData>();
  @Output() formChanged: EventEmitter<CardData> = new EventEmitter<CardData>();
  private buildCardData(): CardData {
    const cardData: CardData = {
      store: this.storeService.getSelectedStore(),
      productName: this.productName,
      productPrice: this.productPrice,
      productOriginalPrice: this.productOriginalPrice,
      productDiscount: this.productDiscout,
      productCode: this.productCode,
      productFullSpecs: [...this.productFullSpecs],
      productQRSpecs: [...this.productQRSpecs]
    };
    return cardData;
  }
  addSpec(key: string, value: string) {
    this.productFullSpecs.push({key, value});
  }
  removeSpec(index: number) {
    this.productFullSpecs.splice(index, 1);
  }
  toggleQRSpec(spec: {key: string, value: string}, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
  if (checked) {
    this.productQRSpecs.push(spec);
  } else {
    this.productQRSpecs = this.productQRSpecs.filter(s => s !== spec);
  }
  this.onFormChange();
}
onOriginalPriceChange() {
  if (this.productOriginalPrice && this.productPrice) {
    this.productDiscout = Math.round(((this.productOriginalPrice - this.productPrice) / this.productOriginalPrice) * 100);
    this.onFormChange();
  }
}
onDiscountChange() {
  if (this.productOriginalPrice && this.productDiscout) {
    this.productPrice = Math.round(this.productOriginalPrice * (1 - this.productDiscout / 100));
    this.onFormChange();
  }
}
onFinalPriceChange() {
  if (this.productOriginalPrice && this.productPrice) {
    this.productDiscout = Math.round(((this.productOriginalPrice - this.productPrice) / this.productOriginalPrice) * 100);
    this.onFormChange();
  }
}
resetForm() {
  this.productName = '';
  this.productPrice = 0;
  this.productDiscout = 0;
  this.productOriginalPrice = 0;
  this.productCode = '';
  this.productFullSpecs = [];
  this.productQRSpecs = [];
}
  onFormSubmit() {
  this.productAdded.emit(this.buildCardData());
  this.resetForm();
}
  onFormChange() {
  this.formChanged.emit(this.buildCardData());
}
}
