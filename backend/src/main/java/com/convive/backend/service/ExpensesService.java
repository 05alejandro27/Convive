package com.convive.backend.service;

import com.convive.backend.dto.request.ExpenseRequest;
import com.convive.backend.dto.response.ExpenseResponse;
import com.convive.backend.exception.BusinessRuleException;
import com.convive.backend.exception.ResourceNotFoundException;
import com.convive.backend.mapper.ExpensesMapper;
import com.convive.backend.model.entity.Budget;
import com.convive.backend.model.entity.Expense;
import com.convive.backend.model.enums.Status;
import com.convive.backend.repository.BudgetRepository;
import com.convive.backend.repository.CommunityRepository;
import com.convive.backend.repository.ExpensesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ExpensesService {

    private final ExpensesRepository expenseRepository;
    private final ExpensesMapper expenseMapper;
    private final CommunityRepository communityRepository;
    private final BudgetRepository budgetRepository;

    public List<ExpenseResponse> getAll(Long budgetId) {

        List<Expense> expenses = expenseRepository.findByBudgetId(budgetId);

        return expenses.stream()
                .map(expenseMapper::toResponse)
                .toList();
    }

    public List<ExpenseResponse> getByMonth(Long budgetId, Integer month) {

        List<Expense> expenses = expenseRepository.findByBudgetIdAndMonth(budgetId, month);

        return expenses.stream()
                .map(expenseMapper::toResponse)
                .toList();
    }

    public ExpenseResponse createExpense(Long budgetId, ExpenseRequest expenseRequest) {

        Budget budget = findOpenBudget(budgetId);

        BigDecimal totalExpenses = calculateTotalExpenses(budgetId);
        BigDecimal newTotal = totalExpenses.add(expenseRequest.cost());

        if (newTotal.compareTo(budget.getAnnualAmount()) > 0) {
            throw new BusinessRuleException("El gasto supera el presupuesto disponible");
        }

        Expense expense = new Expense();
        expense.setBudget(budget);
        expense.setName(expenseRequest.name());
        expense.setDescription(expenseRequest.description());
        expense.setExpenseType(expenseRequest.expenseType());
        expense.setCost(expenseRequest.cost());
        expense.setMonth(expenseRequest.month());
        expense.setCreatedDate(LocalDateTime.now());
        expense.setUpdatedDate(LocalDateTime.now());

        Expense saved = expenseRepository.save(expense);

        return expenseMapper.toResponse(saved);
    }

    public ExpenseResponse updateExpense(Long budgetId, Long expenseId, ExpenseRequest expenseRequest) {

        Budget budget = findOpenBudget(budgetId);

        Expense expense = expenseRepository.findByBudgetIdAndExpenseId(budgetId, expenseId)
                .orElseThrow(() -> new ResourceNotFoundException("Gasto no encontrado"));

        BigDecimal totalExpenses = calculateTotalExpenses(budgetId);
        BigDecimal totalWithoutCurrent = totalExpenses.subtract(expense.getCost());
        BigDecimal newTotal = totalWithoutCurrent.add(expenseRequest.cost());

        if (newTotal.compareTo(budget.getAnnualAmount()) > 0) {
            throw new BusinessRuleException("El gasto supera el presupuesto disponible");
        }

        expense.setName(expenseRequest.name());
        expense.setDescription(expenseRequest.description());
        expense.setExpenseType(expenseRequest.expenseType());
        expense.setCost(expenseRequest.cost());
        expense.setMonth(expenseRequest.month());
        expense.setUpdatedDate(LocalDateTime.now());

        Expense saved = expenseRepository.save(expense);

        return expenseMapper.toResponse(saved);
    }

    public void delete(Long budgetId, Long expenseId) {

        findOpenBudget(budgetId);

        Expense expense = expenseRepository.findByBudgetIdAndExpenseId(budgetId, expenseId)
                .orElseThrow(() -> new ResourceNotFoundException("Gasto no encontrado"));

        expenseRepository.delete(expense);
    }

    public BigDecimal calculateTotalExpenses(Long budgetId) {

        List<Expense> expenses = expenseRepository.findByBudgetId(budgetId);

        return expenses.stream()
                .map(Expense::getCost)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    public BigDecimal calculateMonthExpenses(Long budgetId, Integer month) {

        List<Expense> expenses = expenseRepository.findByBudgetIdAndMonth(budgetId, month);

        return expenses.stream()
                .map(Expense::getCost)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    private Budget findOpenBudget(Long budgetId) {
        Budget budget = budgetRepository.findById(budgetId)
                .orElseThrow(() -> new ResourceNotFoundException("Presupuesto no encontrado"));

        if (budget.getStatus() != Status.OPEN) {
            throw new BusinessRuleException("No se pueden gestionar gastos en un presupuesto cerrado");
        }

        return budget;
    }

}