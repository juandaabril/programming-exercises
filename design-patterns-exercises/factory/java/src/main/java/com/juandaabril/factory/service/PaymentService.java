package com.juandaabril.factory.service;

import com.juandaabril.factory.entity.Payment;
import com.juandaabril.factory.repository.PaymentRepository;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class PaymentService {
    public static final String CREDIT_CARD_API = "https://payu/creditCard";
    public static final String CREDIT_PAYPAL_TOKEN_API = "https://payu/paypayl/token";
    public static final String CREDIT_PAYPAL_PAY_API = "https://payu/paypayl/pay";
    public static final String CREDIT_BANK_API = "https://payu/bank";
    private RestTemplate restTemplate;

    private PaymentRepository paymentRepository;

    public PaymentService(RestTemplate restTemplate, PaymentRepository paymentRepository) {
        this.restTemplate = restTemplate;
        this.paymentRepository = paymentRepository;
    }

    public void pay(
        String method,
        BigDecimal amount,
        String cardNumber,
        String cardExpDate,
        String cardCvv,
        String paypalEmail,
        String paypalPassword,
        String bankAccountNumber,
        String bankRoutingNumber
    ) {
        Integer providerId = null;

        if (method.equals("credit card")) {
            CreditCardRequest request = new CreditCardRequest(amount, cardNumber, cardExpDate, cardCvv);
            CreditCardResponse creditCardResponse = restTemplate
                .postForEntity(CREDIT_CARD_API, request, CreditCardResponse.class)
                .getBody();

            providerId = creditCardResponse.getId();
        } else if (method.equals("PayPal")) {
            PaypalTokenRequest tokenRequest = new PaypalTokenRequest(paypalEmail, paypalPassword);
            PaypalTokenResponse tokenResponse = restTemplate
                .postForEntity(CREDIT_PAYPAL_TOKEN_API, tokenRequest, PaypalTokenResponse.class)
                .getBody();

            PaypalPayRequest payRequest = new PaypalPayRequest(amount, tokenResponse.getId());
            PaypalPayResponse payResponse = restTemplate
                .postForEntity(CREDIT_PAYPAL_PAY_API, payRequest, PaypalPayResponse.class)
                .getBody();

            providerId = payResponse.getId();
        } else if (method.equals("bank transfer")) {
            BankRequest bankRequest = new BankRequest(amount, bankAccountNumber, bankRoutingNumber);
            BankResponse bankResponse = restTemplate
                .postForEntity(CREDIT_BANK_API, bankRequest, BankResponse.class)
                .getBody();

            providerId = bankResponse.getId();
        } else {
            throw new RuntimeException("Método de pago no válido");
        }

        Payment payment = new Payment(null, method, amount, providerId, LocalDate.now(), LocalTime.now());

        paymentRepository.save(payment);
    }
}
