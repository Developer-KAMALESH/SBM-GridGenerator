import { StoreCard } from "./store-card";

export interface CardData {
    store:StoreCard;
    productName:string;
    productPrice:number;
    productOriginalPrice?:number;
    productDiscount?:number;
    productCode:string;
    productFullSpecs:{key: string, value: string}[];    
    productQRSpecs:{key: string, value: string}[];
}
