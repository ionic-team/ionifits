import { Photo } from '../models/photo';

export interface Expense {
  id: number;
  category: string;
  merchant: string;
  note: string;
  cost: number;
  date: string;
  receipt: Photo;
}
