package com.convive.backend.service;

import com.convive.backend.dto.request.BudgetEmergencyRequest;
import com.convive.backend.dto.request.BudgetRequest;
import com.convive.backend.dto.response.BudgetResponse;
import com.convive.backend.dto.response.BudgetStatsResponse;
import com.convive.backend.exception.BusinessRuleException;
import com.convive.backend.exception.ResourceNotFoundException;
import com.convive.backend.mapper.BudgetMapper;
import com.convive.backend.model.entity.Budget;
import com.convive.backend.model.entity.Community;
import com.convive.backend.model.enums.Status;
import com.convive.backend.repository.BudgetRepository;
import com.convive.backend.repository.CommunityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BudgetService {

    private final BudgetRepository budgetRepository;
    private final BudgetMapper budgetMapper;
    private final CommunityRepository communityRepository;
    private final ExpensesService expensesService;

    public List<BudgetResponse> getHistory(Long communityId) {

        List<Budget> budgets = budgetRepository.findAllByCommunityId(communityId);

        return budgets.stream()
                .map(budgetMapper::toResponse)
                .toList();
    }

    public BudgetResponse getByBudgetId(Long communityId, Long budgetId) {

        Budget budget = budgetRepository.findByCommunityIdAndBudgetId(communityId, budgetId)
                .orElseThrow(() -> new ResourceNotFoundException("Presupuesto no encontrado"));

        return budgetMapper.toResponse(budget);
    }

    public BudgetResponse getCurrent(Long communityId) {

        Budget budget = budgetRepository.findByCommunityIdAndStatus(communityId, Status.OPEN)
                .orElseThrow(() -> new ResourceNotFoundException("No hay presupuesto activo"));

        return budgetMapper.toResponse(budget);
    }

    @Transactional
    public BudgetResponse createBudget(Long communityId, BudgetRequest budgetRequest) {

        //Verificar que la comunidad existe
        Community community = communityRepository.findById(communityId)
                .orElseThrow(() -> new ResourceNotFoundException("Comunidad no encontrada"));

        if (budgetRepository.existsByCommunityIdAndStatus(communityId, Status.OPEN)) {
            throw new BusinessRuleException("Ya hay un presupuesto activo");
        }

        Budget budget = new Budget();
        budget.setCommunity(community);
        budget.setName(budgetRequest.name());
        budget.setStartDate(LocalDate.now());
        budget.setEndDate(budgetRequest.endDate());
        budget.setAnnualAmount(budgetRequest.annualAmount());
        budget.setEmergencyFund(budgetRequest.emergencyFund());
        budget.setStatus(Status.OPEN);
        budget.setCreatedDate(LocalDateTime.now());
        budget.setUpdatedDate(LocalDateTime.now());

        Budget saved = budgetRepository.save(budget);

        return budgetMapper.toResponse(saved);
    }

    @Transactional
    public BudgetResponse updateEmergencyFund(Long communityId, Long budgetId, BudgetEmergencyRequest budgetRequest) {

        Budget budget = budgetRepository.findByCommunityIdAndBudgetId(communityId, budgetId)
                .orElseThrow(() -> new ResourceNotFoundException("Presupuesto no encontrado"));

        if (budget.getStatus() != Status.OPEN) {
            throw new BusinessRuleException("No se puede modificar un presupuesto cerrado");
        }

        //Actualiza los campos
        budget.setEmergencyFund(budgetRequest.emergencyFund());
        budget.setUpdatedDate(LocalDateTime.now());

        Budget saved = budgetRepository.save(budget);

        return budgetMapper.toResponse(saved);
    }

    @Transactional
    public BudgetResponse closeBudget(Long communityId, Long budgetId) {

        Budget budget = budgetRepository.findByCommunityIdAndBudgetId(communityId, budgetId)
                .orElseThrow(() -> new ResourceNotFoundException("Presupuesto no encontrado"));

        if (budget.getStatus() != Status.OPEN) {
            throw new BusinessRuleException("No se puede modificar un presupuesto cerrado");
        }

        budget.setStatus(Status.CLOSED);
        budget.setUpdatedDate(LocalDateTime.now());

        Budget saved = budgetRepository.save(budget);

        return budgetMapper.toResponse(saved);
    }

    //Estadísticas
    public BudgetStatsResponse getStats(Long communityId) {

        Budget budget = budgetRepository.findByCommunityIdAndStatus(communityId, Status.OPEN)
                .orElseThrow(() -> new ResourceNotFoundException("No hay presupuesto activo"));

        //Días restantes (Se calcula la diferencia de días entre hoy y la fecha de fin)
        long remainingDays = java.time.temporal.ChronoUnit.DAYS.between(LocalDate.now(), budget.getEndDate());

        //Si la fecha ya ha pasado lo dejamos en 0 para que no salga negativo
        if (remainingDays < 0) {
            remainingDays = 0;
        }

        //Total gastado
        BigDecimal spent = expensesService.calculateTotalExpenses(budget.getId());

        //Disponible
        BigDecimal available = budget.getAnnualAmount().subtract(spent);

        //Porcentaje gastado
        long spentPercentage = 0;

        if (budget.getAnnualAmount().compareTo(BigDecimal.ZERO) > 0) {
            spentPercentage = spent
                    .multiply(BigDecimal.valueOf(100))
                    .divide(budget.getAnnualAmount(), 0, java.math.RoundingMode.HALF_UP)
                    .longValue();
        }

        return new BudgetStatsResponse(remainingDays, spent, available, spentPercentage);
    }

}
