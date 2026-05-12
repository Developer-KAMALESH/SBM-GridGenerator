import { Injectable } from '@angular/core';
import { StoreCard } from '../models/store-card';

@Injectable({
  providedIn: 'root',
})
export class Store {
  private stores:StoreCard[]=[
    {
      storeId:1,
      storeName:'SRI BHARATH MART',
      storeLocation:'SURUTUPALLI, AP',
      storeWhatsapp:'+918367687339',
      storeWebsite:'https://sribharathmart.netlify.app',
      storeGoogleReview:'https://g.page/r/CS0d0v8-RSErEBM/review'
    },
    {
      storeId:2,
      storeName:'SRI BHARATH METALS',
      storeLocation:'UTHUKOTTAI, TN',
      storeWhatsapp:'+917639867339',
      storeGoogleReview:'https://g.page/r/CS3amTdgeF7UEBM/review'
    }    
  ];
  private selectedStore:StoreCard=this.stores[0];
  getStores():StoreCard[]{
    return [...this.stores];
  }
  getStoreByName(name:string):StoreCard | undefined{
    return this.stores.find(store => store.storeName === name);
  }
  getSelectedStore():StoreCard{
    return this.selectedStore;
  }
  setSelectedStore(store:StoreCard):void{
    this.selectedStore=store;
  }
}
