package com.elms.backend.service;

import com.elms.backend.dto.LeaveApplicationRequest;
import com.elms.backend.entity.LeaveRequest;

public interface LeaveService {
    
    // Core business logic method: An employee applies for a leave
    LeaveRequest applyForLeave(Long employeeId, LeaveApplicationRequest request);
}
