import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

type ExpenseInputProps = {
  onExpenseAdded?: () => void;
};

const ExpenseInput = ({ onExpenseAdded }: ExpenseInputProps) => {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState<
    "idle" | "parsing" | "saving"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoadingStage("parsing");

    try {
      // 1. Parse the text
      const response = await fetch("http://127.0.0.1:8000/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText }),
      });
      const parsed = await response.json();

      // 2. Prepare expense data
      const expenseData = {
        amount: parsed.amount,
        category: parsed.category || "Other",
        description: parsed.description || inputText,
        date: new Date().toISOString().split("T")[0],
      };

      // 3. Add expense to backend
      setLoadingStage("saving");
      const addResp = await fetch("http://localhost:8080/api/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(expenseData),
      });

      if (!addResp.ok) throw new Error("Failed to add expense");

      setInputText("");
      if (onExpenseAdded) onExpenseAdded();
    } catch (error) {
      console.error("Error sending data:", error);
    } finally {
      setIsLoading(false);
      setLoadingStage("idle");
    }
  };

  const getLoadingText = () => {
    switch (loadingStage) {
      case "parsing":
        return "Analyzing your expense...";
      case "saving":
        return "Saving to your account...";
      default:
        return "Processing...";
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 p-4 border rounded-lg shadow-sm"
    >
      <Input
        type="text"
        value={inputText}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setInputText(e.target.value)
        }
        placeholder="What did you buy?"
        className="flex-1"
        disabled={isLoading}
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>{getLoadingText()}</span>
          </div>
        ) : (
          "Send"
        )}
      </Button>
    </form>
  );
};

export default ExpenseInput;
