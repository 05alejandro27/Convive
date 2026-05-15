package com.convive.backend.controller;

import com.convive.backend.dto.request.ExpenseRequest;
import com.convive.backend.dto.response.ExpenseResponse;
import com.convive.backend.service.ExpensesService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/expenses")
public class ExpensesController {

    private final ExpensesService expensesService;

    //GET
    @GetMapping("/{budgetId}")
    public ResponseEntity<List<ExpenseResponse>> getAll(@PathVariable Long budgetId) {
        return ResponseEntity.ok(expensesService.getAll(budgetId));
    }

    //POST
    @PostMapping("/{budgetId}")
    public ResponseEntity<ExpenseResponse> create(@PathVariable Long budgetId, @Valid @RequestBody ExpenseRequest request) {
        ExpenseResponse response = expensesService.createExpense(budgetId, request);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    //PUT
    @PutMapping("/{budgetId}/{expenseId}")
    public ResponseEntity<ExpenseResponse> edit(@PathVariable Long budgetId, @PathVariable Long expenseId, @Valid @RequestBody ExpenseRequest request) {
        return ResponseEntity.ok(expensesService.updateExpense(budgetId, expenseId, request));
    }

    //DELETE
    @DeleteMapping("/{budgetId}/{expenseId}")
    public ResponseEntity<Void> delete(@PathVariable Long budgetId, @PathVariable Long expenseId) {
        expensesService.delete(budgetId, expenseId);
        return ResponseEntity.noContent().build();
    }

}
