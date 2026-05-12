import { ChangeDetectorRef, Component, ElementRef, EventEmitter, inject, Input, OnChanges, Output, ViewChild } from '@angular/core';
import { CardData } from '../../models/card-data';
import html2canvas from 'html2canvas';
import html2pdf from 'html2pdf.js';
import { Qr } from '../../services/qr';

@Component({
  selector: 'app-print-layout',
  imports: [],
  templateUrl: './print-layout.html',
  styleUrl: './print-layout.css',
})

export class PrintLayout implements OnChanges {
  @Input() products: CardData[] = [];
  @Input() paperSize: 'A4' | 'A5' = 'A4';
  @Input() layout: 'quarter' | 'half' | 'full' = 'quarter';
  @ViewChild('printContainer') printContainer!: ElementRef;
  @Output() productRemoved = new EventEmitter<number>();
  protected pages: CardData[][] = [[]];
  private qrService = inject(Qr);
  private cdr = inject(ChangeDetectorRef);
  protected qrCodes: Map<string, string> = new Map();
  ngOnChanges() {
    this.calculatePages();
    this.generateQRCodes();
  }
  calculatePages() {
    const itemsPerPage = this.layout === 'full' ? 1 : this.layout === 'half' ? 2 : 4;
    this.pages = [];
    for (let i = 0; i < this.products.length; i += itemsPerPage) {
      this.pages.push(this.products.slice(i, i + itemsPerPage));
    }
  }
  print(){
    window.print();
  }
  downloadPDF(){
    const options = {
  margin: 0,
  filename: 'product-cards.pdf',
  image: { type: 'jpeg' as const, quality: 0.98 },
  html2canvas: { scale: 2, height: this.printContainer.nativeElement.offsetHeight,
  windowHeight: this.printContainer.nativeElement.offsetHeight },
  jsPDF: { unit: 'mm' as const, format: 'a4' as const, orientation: 'portrait' as const },
  // pagebreak: { mode: 'avoid-all' }
};
  const actions = document.querySelector('.print-actions') as HTMLElement;
  const deleteButtons = document.querySelectorAll('.btn-delete') as NodeListOf<HTMLElement>;
  if (actions) actions.style.display = 'none';
  deleteButtons.forEach(btn => btn.style.display = 'none');
  setTimeout(() => {
    // console.log('Container height:', this.printContainer.nativeElement.scrollHeight);
  // console.log('Container offset:', this.printContainer.nativeElement.offsetHeight);
  html2pdf().set(options).from(this.printContainer.nativeElement).save()
    .then(() => {
      if (actions) actions.style.display = 'flex';
      deleteButtons.forEach(btn => btn.style.display = 'block');
    });
}, 100);
}
  downloadPNG(){
  const deleteButtons = document.querySelectorAll('.btn-delete') as NodeListOf<HTMLElement>;
  deleteButtons.forEach(btn => btn.style.display = 'none');
  
  const element = this.printContainer.nativeElement;
  
  // Temporarily position element at origin
  const originalStyle = element.style.cssText;
  element.style.position = 'fixed';
  element.style.top = '0';
  element.style.left = '0';
  element.style.zIndex = '9999';
  
  setTimeout(() => {
    html2canvas(element, {
      scale: 2,
      useCORS: true
    }).then(canvas => {
      // Restore original style
      element.style.cssText = originalStyle;
      
      const link = document.createElement('a');
      link.download = 'product-cards.png';
      link.href = canvas.toDataURL();
      link.click();
      deleteButtons.forEach(btn => btn.style.display = 'block');
    });
  }, 100);
}
  async generateQRCodes() {
  const newMap = new Map<string, string>();
  for (const product of this.products) {
    console.log(product.productCode, product.productQRSpecs);
    const url = await this.qrService.generateQRCode(product);
    newMap.set(product.productCode, url);
  }
  this.qrCodes = newMap;
  this.cdr.detectChanges(); // triggers change detection
}
  removeProduct(index: number) {
    this.productRemoved.emit(index);
    this.calculatePages();
  }
}


