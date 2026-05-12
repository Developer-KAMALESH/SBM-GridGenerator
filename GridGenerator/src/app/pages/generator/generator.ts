import { Component, inject } from '@angular/core';
import { ProductForm } from '../../components/product-form/product-form';
import { CardPreview } from "../../components/card-preview/card-preview";
import { PrintLayout } from "../../components/print-layout/print-layout";
import { StoreSelector } from "../../components/store-selector/store-selector";
import { Product } from '../../services/product';
import { CardData } from '../../models/card-data';

@Component({
  selector: 'app-generator',
  imports: [ProductForm, CardPreview, PrintLayout, StoreSelector],
  templateUrl: './generator.html',
  styleUrl: './generator.css',
})
export class Generator {
  private productservice=inject(Product);
  protected currentProduct:CardData|null=null;
  protected products:CardData[] = [];
  protected activeTab:'preview'|'print'= 'preview';
  onProductAdded(product: CardData) {
    this.productservice.addProduct(product);
    this.currentProduct = product;
    this.products = this.productservice.getProducts();
    this.activeTab = 'print';
  }
  onFormChanged(product: CardData) {
    this.currentProduct = product;
    this.activeTab = 'preview';
  }
  onProductRemoved(index: number) {
    this.productservice.deleteProduct(index);
  this.products = this.productservice.getProducts();
  this.currentProduct = null;
  }
}
