import React, { useState, useEffect } from "react";
import { type Expense, type ExpenseFormData } from "../types/expense";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import ExpenseFilters from "../components/ExpenseFilters";
import ExpensesSummary from "../components/ExpensesSummary";
import { toast } from "sonner";

const Index = () => {
  // State for expenses and filters
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>(expenses);

  // Filter states
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [monthFilter, setMonthFilter] = useState<string>("All");
  const [yearFilter, setYearFilter] = useState<number>(
    new Date().getFullYear()
  );

  // Apply filters whenever expenses or filter values change
  useEffect(() => {
    let result = [...expenses];

    // Apply category filter
    if (categoryFilter !== "All") {
      result = result.filter((expense) => expense.category === categoryFilter);
    }

    // Apply date filter
    if (monthFilter !== "All") {
      result = result.filter((expense) => {
        const expenseDate = new Date(expense.date);
        const expenseMonth = expenseDate.getMonth().toString().padStart(2, "0");
        const expenseYear = expenseDate.getFullYear();

        return expenseMonth === monthFilter && expenseYear === yearFilter;
      });
    } else {
      // Filter by year only
      result = result.filter((expense) => {
        const expenseYear = new Date(expense.date).getFullYear();
        return expenseYear === yearFilter;
      });
    }

    setFilteredExpenses(result);
  }, [expenses, categoryFilter, monthFilter, yearFilter]);

  // Add a new expense
  const handleAddExpense = (formData: ExpenseFormData) => {
    const newExpense: Expense = {
      ...formData,
      id: Date.now().toString(),
    };

    setExpenses((prev) => [newExpense, ...prev]);
    toast.success("Expense added successfully");
  };

  // Delete an expense
  const handleDeleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
    toast.success("Expense deleted successfully");
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <div className="flex items-center gap-4">
            <img src="/logo.svg" alt="ExpenSum" className="w-16 h-16" />
            <h1 className="text-3xl font-bold text-foreground">ExpenSum</h1>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left column: Filters and Form */}
          <div className="space-y-6">
            <ExpenseFilters
              selectedCategory={categoryFilter}
              selectedMonth={monthFilter}
              selectedYear={yearFilter}
              onCategoryChange={setCategoryFilter}
              onMonthChange={setMonthFilter}
              onYearChange={setYearFilter}
            />
            <ExpenseForm onAddExpense={handleAddExpense} />
          </div>

          {/* Right column: Summary and Expense List */}
          <div className="md:col-span-2 space-y-6">
            <ExpensesSummary
              expenses={filteredExpenses}
              categoryFilter={categoryFilter}
              dateFilter={{ month: monthFilter, year: yearFilter }}
            />

            <div>
              <h2 className="text-lg font-semibold mb-4 text-foreground">
                Expenses
              </h2>
              <ExpenseList
                expenses={filteredExpenses}
                onDeleteExpense={handleDeleteExpense}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
