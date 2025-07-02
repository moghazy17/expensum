
export interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
}

export type ExpenseFormData = Omit<Expense, 'id'>;

export const EXPENSE_CATEGORIES = [
  "Food",
  "Transportation",
  "Housing",
  "Utilities",
  "Entertainment",
  "Healthcare",
  "Shopping",
  "Other"
];

export const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
