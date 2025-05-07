
import React from 'react';
import { type Expense } from '../types/expense';

interface ExpensesSummaryProps {
  expenses: Expense[];
  categoryFilter: string;
  dateFilter: { month: string; year: number };
}

const ExpensesSummary: React.FC<ExpensesSummaryProps> = ({ 
  expenses, 
  categoryFilter, 
  dateFilter 
}) => {
  const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  // Create filter description
  let filterDescription = 'Total Expenses';
  
  if (categoryFilter !== 'All') {
    filterDescription += ` - ${categoryFilter}`;
  }
  
  if (dateFilter.month !== 'All') {
    const monthName = new Date(2000, parseInt(dateFilter.month)).toLocaleString('default', { month: 'long' });
    filterDescription += ` - ${monthName} ${dateFilter.year}`;
  } else if (dateFilter.month === 'All') {
    filterDescription += ` - ${dateFilter.year}`;
  }

  return (
    <div className="p-4 bg-opacity-10 rounded-lg shadow-md border border-primary">
      <h2 className="text-lg font-semibold mb-1 text-foreground">{filterDescription}</h2>
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">{expenses.length} expense(s)</p>
        <p className="text-2xl font-bold text-foreground">${totalAmount.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ExpensesSummary;
