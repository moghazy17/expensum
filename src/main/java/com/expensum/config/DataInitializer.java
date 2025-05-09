package com.expensum.config;

import com.expensum.entity.Expense;
import com.expensum.entity.User;
import com.expensum.repository.ExpenseRepository;
import com.expensum.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class DataInitializer implements CommandLineRunner {
    private final ExpenseRepository expenseRepository;
    private final UserRepository userRepository;
    PasswordEncoder passwordEncoder;

    @Autowired
    public DataInitializer(ExpenseRepository expenseRepository, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.expenseRepository = expenseRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder; 
    }

    @Override
    public void run(String... args) {
        if (expenseRepository.count() == 0) {
            // Create a user if not exists
            User user = userRepository.findByUsername("testuser")
                .orElseGet(() -> {
                    User newUser = new User();
                    newUser.setUsername("testuser");
                    newUser.setEmail("testuser@example.com");
                    newUser.setPassword(passwordEncoder.encode("password"));
                    return userRepository.save(newUser);
                });
    
            Expense expense = new Expense();
            expense.setAmount(50.0);
            expense.setCategory("Food");
            expense.setDescription("Grocery shopping");
            expense.setDate(LocalDate.now().minusDays(2));
            expense.setUser(user); // Set the user
    
            expenseRepository.save(expense);
        }
    }
} 