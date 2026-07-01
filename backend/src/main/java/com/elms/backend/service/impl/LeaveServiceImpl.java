package com.elms.backend.service.impl;

import com.elms.backend.dto.LeaveApplicationRequest;
import com.elms.backend.entity.Employee;
import com.elms.backend.entity.LeaveRequest;
import com.elms.backend.entity.LeaveType;
import com.elms.backend.exception.LeaveBalanceExceededException;
import com.elms.backend.exception.ResourceNotFoundException;
import com.elms.backend.repository.EmployeeRepository;
import com.elms.backend.repository.LeaveRequestRepository;
import com.elms.backend.repository.LeaveTypeRepository;
import com.elms.backend.service.LeaveService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.temporal.ChronoUnit;

@Service
@RequiredArgsConstructor
public class LeaveServiceImpl implements LeaveService {

    private final LeaveRequestRepository leaveRequestRepository;
    private final EmployeeRepository employeeRepository;
    private final LeaveTypeRepository leaveTypeRepository;

    @Override
    @Transactional
    public LeaveRequest applyForLeave(Long employeeId, LeaveApplicationRequest request) {
        
        // 1. Fetch Employee or throw Exception
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + employeeId));

        // 2. Fetch Leave Type or throw Exception
        LeaveType leaveType = leaveTypeRepository.findById(request.getLeaveTypeId())
                .orElseThrow(() -> new ResourceNotFoundException("Leave Type not found with id: " + request.getLeaveTypeId()));

        // 3. Calculate requested days (Inclusive of start and end date)
        long requestedDays = ChronoUnit.DAYS.between(request.getStartDate(), request.getEndDate()) + 1;
        
        if (requestedDays <= 0) {
            throw new IllegalArgumentException("End date must be after or equal to start date.");
        }

        // 4. Check Leave Balance
        if (employee.getTotalLeaveBalance() < requestedDays) {
            throw new LeaveBalanceExceededException("Insufficient leave balance. You have " 
                    + employee.getTotalLeaveBalance() + " days left, but requested " + requestedDays + " days.");
        }

        // 5. Create the LeaveRequest Entity (Notice we set status to PENDING)
        LeaveRequest leaveRequest = LeaveRequest.builder()
                .employee(employee)
                .leaveType(leaveType)
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .totalDays((int) requestedDays)
                .reason(request.getReason())
                .status("PENDING") 
                .build();

        // 6. Save to Database
        return leaveRequestRepository.save(leaveRequest);
    }
}
