
import React from 'react';
import { type Expense } from '../types/expense';
import { Trash2 } from 'lucide-react';

interface ExpenseCardProps {
  expense: Expense;
  onDelete: () => void;
}

const ExpenseCard: React.FC<ExpenseCardProps> = ({ expense, onDelete }) => {
  // Format the date to be more readable
  const formattedDate = new Date(expense.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div className="p-4 bg-card rounded-lg shadow-md border border-border">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-foreground">
            {expense.description || expense.category}
          </h3>
          <p className="text-sm text-muted-foreground">{expense.category}</p>
          <p className="text-xs text-muted-foreground mt-1">{formattedDate}</p>
        </div>
        <div className="flex items-center">
          <span className="text-lg font-semibold text-foreground mr-3">
            ${expense.amount.toFixed(2)}
          </span>
          <button 
            onClick={onDelete} 
            className="p-1.5 rounded-full text-red-500 hover:bg-red-500/10 transition-colors"
            aria-label="Delete expense"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpenseCard;
