package com.elms.backend.exception;

public class LeaveBalanceExceededException extends RuntimeException {
    public LeaveBalanceExceededException(String message) {
        super(message);
    }
}
