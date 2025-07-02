
import React from 'react';
import { type Expense } from '../types/expense';
import ExpenseCard from './ExpenseCard';

interface ExpenseListProps {
  expenses: Expense[];
  onDeleteExpense: (id: string) => void;
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, onDeleteExpense }) => {
  if (expenses.length === 0) {
    return (
      <div className="p-6 text-center">
        <p className="text-muted-foreground">No expenses found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {expenses.map((expense) => (
        <ExpenseCard 
          key={expense.id} 
          expense={expense} 
          onDelete={() => onDeleteExpense(expense.id)}
        />
      ))}
    </div>
  );
};

export default ExpenseList;
