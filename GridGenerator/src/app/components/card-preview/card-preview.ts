import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardData } from './../../models/card-data';
import { Qr } from '../../services/qr';

@Component({
  selector: 'app-card-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-preview.html',
  styleUrl: './card-preview.css',
})
export class CardPreview {
  private qrService = inject(Qr);

  /**
   * The setter triggers the QR generation in the service 
   * whenever the parent (Generator) passes a new product.
   */
  @Input() set product(value: CardData | null) {
    this._product = value;
    if (value) {
      this.qrService.generateQRCode(value);
    }
  }

  get product(): CardData | null {
    return this._product;
  }

  private _product: CardData | null = null;

  /**
   * Link directly to the Signal in the service.
   * This ensures that even if the component is destroyed (tab switch),
   * the QR is immediately available upon re-creation.
   */
  protected qrCodeUrl = this.qrService.qrSignal;
}