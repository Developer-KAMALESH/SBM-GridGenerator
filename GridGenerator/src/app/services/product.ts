import { Injectable } from '@angular/core';
import { CardData } from '../models/card-data';

@Injectable({
  providedIn: 'root',
})
export class Product {
  private products:CardData[]=[];
  getProducts():CardData[]{
    return [...this.products];
  }
  addProduct(product:CardData):void{
    this.products.push(product);
  }
  updateProduct(index:number, updatedProduct:CardData):void{
    if(index >= 0 && index < this.products.length) {
      this.products[index] = updatedProduct;
    }
  }
  deleteProduct(index:number):void{
    if(index >= 0 && index < this.products.length) {
      this.products.splice(index, 1);
    }
  }
  clearProducts():void{
    this.products = [];
  }
}
