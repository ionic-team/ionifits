type Base64String = string;

export class Expense {
  id: number;
  category: string;
  merchant: string;
  note: string;
  cost: number;
  date: string;
  receiptImage: Base64String;
}
