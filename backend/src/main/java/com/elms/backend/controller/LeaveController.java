package com.elms.backend.controller;

import com.elms.backend.dto.LeaveApplicationRequest;
import com.elms.backend.entity.LeaveRequest;
import com.elms.backend.security.UserDetailsImpl;
import com.elms.backend.service.LeaveService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/leaves")
@RequiredArgsConstructor
public class LeaveController {

    private final LeaveService leaveService;

    @PostMapping("/apply")
    public ResponseEntity<?> applyForLeave(@Valid @RequestBody LeaveApplicationRequest request, 
                                           @AuthenticationPrincipal UserDetailsImpl userDetails) {
        
        // We get the currently logged in employee's ID from the JWT token via @AuthenticationPrincipal
        LeaveRequest leaveRequest = leaveService.applyForLeave(userDetails.getEmployee().getId(), request);
        
        return ResponseEntity.ok(leaveRequest);
    }
}
