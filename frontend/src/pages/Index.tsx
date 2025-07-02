// src/pages/Index.tsx
import { useState, useEffect } from "react";
import { type Expense, type ExpenseFormData } from "../types/expense";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import ExpenseFilters from "../components/ExpenseFilters";
import ExpensesSummary from "../components/ExpensesSummary";
import ExpenseInput from "../components/ExpenseInput";
import { toast } from "sonner";
import { useAuth } from "../types/use-auth";

const API_URL = "http://localhost:8080/api/expenses";

const Index = () => {
  const { user, logout } = useAuth();

  // State for expenses and filters
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>(expenses);

  // Filter states
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [monthFilter, setMonthFilter] = useState<string>("All");
  const [yearFilter, setYearFilter] = useState<number>(
    new Date().getFullYear()
  );

  const fetchExpenses = async () => {
    try {
      const response = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      setExpenses(data);
    } catch (error) {
      toast.error("Failed to fetch expenses");
      console.error("Error fetching expenses:", error);
    }
  };

  // Fetch expenses from backend
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch(API_URL, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        setExpenses(data);
      } catch (error) {
        toast.error("Failed to fetch expenses");
        console.error("Error fetching expenses:", error);
      }
    };

    fetchExpenses();
  }, []);

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
  const handleAddExpense = async (formData: ExpenseFormData) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to add eexpense");
      }

      const newExpense = await response.json();
      setExpenses((prev) => [newExpense, ...prev]);
      toast.success("Expense added successfully");
    } catch (error) {
      toast.error("Failed to add expense");
      console.error("Error adding expense:", error);
    }
  };

  // Delete an expense
  const handleDeleteExpense = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete expense");
      }

      setExpenses((prev) => prev.filter((expense) => expense.id !== id));
      toast.success("Expense deleted successfully");
    } catch (error) {
      toast.error("Failed to delete expense");
      console.error("Error deleting expense:", error);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src="/logo.svg" alt="ExpenSum" className="w-16 h-16" />
              <h1 className="text-3xl font-bold text-foreground">ExpenSum</h1>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-lg font-medium">Hello, {user?.username}</p>
              <button
                onClick={logout}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
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
            <ExpenseInput onExpenseAdded={fetchExpenses} />
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
