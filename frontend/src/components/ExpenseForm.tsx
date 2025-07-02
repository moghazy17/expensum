import React, { useState } from "react";
import { type ExpenseFormData, EXPENSE_CATEGORIES } from "../types/expense";

interface ExpenseFormProps {
  onAddExpense: (expense: ExpenseFormData) => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onAddExpense }) => {
  const [formData, setFormData] = useState<ExpenseFormData>({
    amount: 0,
    category: EXPENSE_CATEGORIES[0],
    description: "",
    date: new Date().toISOString().split("T")[0],
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.amount <= 0) {
      alert("Amount must be greater than zero");
      return;
    }
    onAddExpense(formData);
    setFormData({
      amount: 0,
      category: EXPENSE_CATEGORIES[0],
      description: "",
      date: new Date().toISOString().split("T")[0],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-card rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4 text-foreground">
        Add New Expense
      </h2>

      <div className="space-y-3">
        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-muted-foreground mb-1"
          >
            Amount ($)
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            step="0.01"
            min="0.01"
            required
            className="w-full p-2 bg-secondary border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-muted-foreground mb-1"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full p-2 bg-secondary border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
          >
            {EXPENSE_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-muted-foreground mb-1"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 bg-secondary border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="What did you spend on?"
          />
        </div>

        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-muted-foreground mb-1"
          >
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full p-2 bg-secondary border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          Add Expense
        </button>
      </div>
    </form>
  );
};

export default ExpenseForm;
