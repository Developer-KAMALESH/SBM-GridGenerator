import { Injectable, signal } from '@angular/core';
import { CardData } from '../models/card-data';
import * as QRCode from 'qrcode';

@Injectable({
  providedIn: 'root',
})
export class Qr {
  private readonly BASE_URL:string='https://sbm-productcard.netlify.app/'; 
  qrSignal = signal<string>(''); // Reactive signal to hold the QR code URL
  encode(data:CardData):string {
    const qrData = {
      storeId: data.store.storeId,
      productName: data.productName,
      productPrice: data.productPrice,
      productDiscount: data.productDiscount,
      productCode: data.productCode,
      productOriginalPrice: data.productOriginalPrice,
      specs: data.productQRSpecs.reduce((acc, spec) => {
        acc[spec.key] = spec.value;
        return acc;
      }, {} as {[key: string]: string})
    };
    const jsonString = JSON.stringify(qrData);
    return btoa(encodeURIComponent(jsonString))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
  }
  // decode(hash:string):CardData | null {
  //   try {
  //     const data = JSON.parse(hash);
  //     return {
  //       store: {
  //         storeName: data.storeName,
  //         storeLocation: data.storeLocation,
  //         storeWhatsapp: data.storeWhatsapp,
  //         storeGoogleReview: data.storeGoogleReview
  //       },
  //       productName: data.productName,
  //       productPrice: data.productPrice,
  //       productCode: data.productCode,
  //       productFullSpecs: Object.entries(data.specs).map(([key, value]) => ({key, value})),
  //       productQRSpecs: Object.entries(data.specs).map(([key, value]) => ({key, value}))
  //     };
  //   } catch (e) {
  //     console.error('Invalid QR code data', e);
  //     return null;
  //   }
  // }
  async generateQRCode(data: CardData): Promise<string> {
    const hash = this.encode(data);
    const targetUrl = `${this.BASE_URL.trim()}#${hash}`;
    // console.log('QR URL:', targetUrl);

    try {
      const url = await QRCode.toDataURL(targetUrl, { margin: 2, scale: 8 });
      this.qrSignal.set(url); // Store the result in the signal
      return url;
    } catch (err) {
      this.qrSignal.set('');
      return '';
    }
  }
}
