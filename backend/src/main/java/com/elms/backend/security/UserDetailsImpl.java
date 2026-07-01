package com.elms.backend.security;

import com.elms.backend.entity.Employee;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

public class UserDetailsImpl implements UserDetails {

    private final Employee employee;

    public UserDetailsImpl(Employee employee) {
        this.employee = employee;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // We map the "role" (e.g., ROLE_ADMIN) to a GrantedAuthority so Spring Security understands it.
        return Collections.singletonList(new SimpleGrantedAuthority(employee.getRole()));
    }

    @Override
    public String getPassword() {
        return employee.getPassword();
    }

    @Override
    public String getUsername() {
        // In our system, Email is the username
        return employee.getEmail();
    }

    // You can extract the full employee if needed in controllers
    public Employee getEmployee() {
        return employee;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
