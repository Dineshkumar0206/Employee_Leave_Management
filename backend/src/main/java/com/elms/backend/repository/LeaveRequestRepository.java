package com.elms.backend.repository;

import com.elms.backend.entity.LeaveRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LeaveRequestRepository extends JpaRepository<LeaveRequest, Long> {
    
    // For Employee Dashboard: Fetch all their leave requests
    List<LeaveRequest> findByEmployeeIdOrderByCreatedAtDesc(Long employeeId);
    
    // For Admin Dashboard: Fetch all requests by a specific status (e.g., PENDING)
    List<LeaveRequest> findByStatusOrderByCreatedAtDesc(String status);
}
