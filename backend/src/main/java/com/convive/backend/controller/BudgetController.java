package com.convive.backend.controller;

import com.convive.backend.dto.request.BudgetEmergencyRequest;
import com.convive.backend.dto.request.BudgetRequest;
import com.convive.backend.dto.response.BudgetResponse;
import com.convive.backend.dto.response.BudgetStatsResponse;
import com.convive.backend.service.BudgetService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/budget")
public class BudgetController {
    private final BudgetService budgetService;

    //GET
    @GetMapping("/{communityId}/history")
    public ResponseEntity<List<BudgetResponse>> getHistory(@PathVariable Long communityId) {
        return ResponseEntity.ok(budgetService.getHistory(communityId));
    }

    //GET
    @GetMapping("/{communityId}/{budgetId}")
    public ResponseEntity<BudgetResponse> getByBudgetId(@PathVariable Long communityId, @PathVariable Long budgetId) {
        return ResponseEntity.ok(budgetService.getByBudgetId(communityId, budgetId));
    }

    //GET
    @GetMapping("/{communityId}/current")
    public ResponseEntity<BudgetResponse> getCurrent(@PathVariable Long communityId) {
        return ResponseEntity.ok(budgetService.getCurrent(communityId));
    }

    //GET
    @GetMapping("/{communityId}/current/stats")
    public ResponseEntity<BudgetStatsResponse> getStats(@PathVariable Long communityId) {
        return ResponseEntity.ok(budgetService.getStats(communityId));
    }

    //POST
    @PostMapping("/{communityId}")
    public ResponseEntity<BudgetResponse> create(@PathVariable Long communityId, @Valid @RequestBody BudgetRequest request) {
        BudgetResponse response = budgetService.createBudget(communityId, request);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    //PUT
    @PutMapping("/{communityId}/{budgetId}/emergency-fund")
    public ResponseEntity<BudgetResponse> edit(@PathVariable Long communityId, @PathVariable Long budgetId, @Valid @RequestBody BudgetEmergencyRequest request) {
        return ResponseEntity.ok(budgetService.updateEmergencyFund(communityId, budgetId, request));
    }

    //Patch
    @PatchMapping("/{communityId}/{budgetId}/close")
    public ResponseEntity<BudgetResponse> closeBudget(@PathVariable Long communityId, @PathVariable Long budgetId) {
        return ResponseEntity.ok(budgetService.closeBudget(communityId, budgetId));
    }

}