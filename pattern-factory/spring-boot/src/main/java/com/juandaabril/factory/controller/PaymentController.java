package com.juandaabril.factory.controller;

import com.juandaabril.factory.service.PaymentService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/payment")
public class PaymentController {
  private final PaymentService paymentService;

  public PaymentController(PaymentService paymentService) {
    this.paymentService = paymentService;
  }

  @PostMapping
  public void pay(@RequestBody PaymentRequest request) {
    paymentService.pay(
        request.getMethod(),
        request.getAmount(),
        request.getCardNumber(),
        request.getCardExpDate(),
        request.getCardCvv(),
        request.getPaypalEmail(),
        request.getPaypalPassword(),
        request.getBankAccountNumber(),
        request.getBankRoutingNumber());
  }
}
