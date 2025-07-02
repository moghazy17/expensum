
import React from 'react';
import { EXPENSE_CATEGORIES, MONTHS } from '../types/expense';

interface ExpenseFiltersProps {
  selectedCategory: string;
  selectedMonth: string;
  selectedYear: number;
  onCategoryChange: (category: string) => void;
  onMonthChange: (month: string) => void;
  onYearChange: (year: number) => void;
}

const ExpenseFilters: React.FC<ExpenseFiltersProps> = ({
  selectedCategory,
  selectedMonth,
  selectedYear,
  onCategoryChange,
  onMonthChange,
  onYearChange
}) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

  return (
    <div className="p-4 bg-card rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4 text-foreground">Filters</h2>
      
      <div className="space-y-3">
        <div>
          <label htmlFor="category-filter" className="block text-sm font-medium text-muted-foreground mb-1">
            Category
          </label>
          <select
            id="category-filter"
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full p-2 bg-secondary border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="All">All Categories</option>
            {EXPENSE_CATEGORIES.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="month-filter" className="block text-sm font-medium text-muted-foreground mb-1">
            Month
          </label>
          <select
            id="month-filter"
            value={selectedMonth}
            onChange={(e) => onMonthChange(e.target.value)}
            className="w-full p-2 bg-secondary border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="All">All Months</option>
            {MONTHS.map((month, index) => (
              <option key={month} value={index.toString().padStart(2, '0')}>
                {month}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="year-filter" className="block text-sm font-medium text-muted-foreground mb-1">
            Year
          </label>
          <select
            id="year-filter"
            value={selectedYear}
            onChange={(e) => onYearChange(parseInt(e.target.value))}
            className="w-full p-2 bg-secondary border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
          >
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ExpenseFilters;
