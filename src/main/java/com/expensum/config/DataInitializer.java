package com.expensum.config;

import com.expensum.entity.Expense;
import com.expensum.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private ExpenseRepository expenseRepository;

    @Override
    public void run(String... args) {
        if (expenseRepository.count() == 0) {
            Expense expense = new Expense();
            expense.setAmount(50.0);
            expense.setCategory("Food");
            expense.setDescription("Grocery shopping");
            expense.setDate(LocalDate.now().minusDays(2));
            
            expenseRepository.save(expense);
        }
    }
} 