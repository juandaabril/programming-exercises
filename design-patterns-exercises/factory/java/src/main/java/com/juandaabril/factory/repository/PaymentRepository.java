package com.juandaabril.factory.repository;

import com.juandaabril.factory.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Integer> {}
