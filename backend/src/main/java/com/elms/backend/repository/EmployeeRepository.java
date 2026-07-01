package com.elms.backend.repository;

import com.elms.backend.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    
    // Crucial for Authentication: finding an employee by their email
    Optional<Employee> findByEmail(String email);
    
    // Check if an email exists during Registration
    boolean existsByEmail(String email);
}
