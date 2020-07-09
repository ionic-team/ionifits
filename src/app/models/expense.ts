import { Photo } from '../models/photo';

export class Expense {
  id: number;
  category: string;
  merchant: string;
  note: string;
  cost: number;
  date: string;
  receipt: Photo;

  constructor() {
    this.receipt = new Photo();
  }
}
