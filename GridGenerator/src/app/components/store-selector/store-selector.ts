import { Component, inject } from '@angular/core';
import { Store } from '../../services/store';
import { StoreCard } from '../../models/store-card';

@Component({
  selector: 'app-store-selector',
  imports: [],
  templateUrl: './store-selector.html',
  styleUrl: './store-selector.css',
})
export class StoreSelector {
  private storeService = inject(Store);
  protected stores: StoreCard[] = this.storeService.getStores();
  protected selectedStore: StoreCard = this.storeService.getSelectedStore();
  selectStore(store: StoreCard) {
    this.storeService.setSelectedStore(store);
    this.selectedStore = store;
  } 
}
