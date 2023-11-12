package com.juandaabril.factory.controller;

import static com.juandaabril.factory.service.PaymentService.*;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.*;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withSuccess;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.juandaabril.factory.entity.Payment;
import com.juandaabril.factory.repository.PaymentRepository;
import com.juandaabril.factory.service.PaymentService;
import java.math.BigDecimal;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.test.web.client.MockRestServiceServer;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.client.RestTemplate;

@WebMvcTest(PaymentController.class)
@Import(PaymentService.class)
class PaymentControllerTest {
  @Autowired private MockMvc mockMvc;

  @Autowired private ObjectMapper objectMapper;

  @Autowired private RestTemplate restTemplate;

  @MockBean private PaymentRepository paymentRepository;

  private MockRestServiceServer mockServer;

  @Captor private ArgumentCaptor<Payment> paymentCaptor;

  @BeforeEach
  public void setup() {
    mockServer = MockRestServiceServer.createServer(restTemplate);
  }

  @Test
  public void shouldPayWithCreditCard() throws Exception {
    mockServer
        .expect(requestTo(CREDIT_CARD_API))
        .andExpect(method(HttpMethod.POST))
        .andExpect(
            content()
                .string(
                    "{\"amount\":100000,\"cardNumber\":\"378282246310005\",\"cardExpDate\":\"01/01/2023\",\"cardCvv\":\"123\"}"))
        .andRespond(withSuccess("{ \"id\": 1 }", MediaType.APPLICATION_JSON));

    PaymentRequest request = new PaymentRequest();
    request.setAmount(BigDecimal.valueOf(100000));
    request.setMethod("credit card");
    request.setCardNumber("378282246310005");
    request.setCardCvv("123");
    request.setCardExpDate("01/01/2023");

    mockMvc
        .perform(
            post("/payment")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
        .andExpect(status().isOk());

    verify(paymentRepository, times(1)).save(paymentCaptor.capture());

    Payment payment = paymentCaptor.getValue();

    assertThat(payment).isNotNull();
    assertThat(payment.getPaymentMethod()).isEqualTo("credit card");
    assertThat(payment.getProviderId()).isEqualTo(1);
    assertThat(payment.getAmount()).isEqualTo(BigDecimal.valueOf(100000));
  }

  @Test
  public void shouldPayWithPaypal() throws Exception {
    mockServer
        .expect(requestTo(CREDIT_PAYPAL_TOKEN_API))
        .andExpect(method(HttpMethod.POST))
        .andExpect(
            content().string("{\"paypalEmail\":\"jhon@gamil.com\",\"paypalPassword\":\"123456\"}"))
        .andRespond(withSuccess("{ \"id\": 1 }", MediaType.APPLICATION_JSON));

    mockServer
        .expect(requestTo(CREDIT_PAYPAL_PAY_API))
        .andExpect(method(HttpMethod.POST))
        .andExpect(content().string("{\"amount\":100000,\"token\":1}"))
        .andRespond(withSuccess("{ \"id\": 1 }", MediaType.APPLICATION_JSON));

    PaymentRequest request = new PaymentRequest();
    request.setAmount(BigDecimal.valueOf(100000));
    request.setMethod("PayPal");
    request.setPaypalEmail("jhon@gamil.com");
    request.setPaypalPassword("123456");

    mockMvc
        .perform(
            post("/payment")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
        .andExpect(status().isOk());

    verify(paymentRepository, times(1)).save(paymentCaptor.capture());

    Payment payment = paymentCaptor.getValue();

    assertThat(payment).isNotNull();
    assertThat(payment.getPaymentMethod()).isEqualTo("PayPal");
    assertThat(payment.getProviderId()).isEqualTo(1);
    assertThat(payment.getAmount()).isEqualTo(BigDecimal.valueOf(100000));
  }

  @Test
  public void shouldPayWithBankTransfer() throws Exception {
    mockServer
        .expect(requestTo(CREDIT_BANK_API))
        .andExpect(method(HttpMethod.POST))
        .andExpect(
            content()
                .string(
                    "{\"amount\":100000,\"bankAccountNumber\":\"123456789\",\"bankRoutingNumber\":\"98765\"}"))
        .andRespond(withSuccess("{ \"id\": 1 }", MediaType.APPLICATION_JSON));

    PaymentRequest request = new PaymentRequest();
    request.setAmount(BigDecimal.valueOf(100000));
    request.setMethod("bank transfer");
    request.setBankAccountNumber("123456789");
    request.setBankRoutingNumber("98765");

    mockMvc
        .perform(
            post("/payment")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
        .andExpect(status().isOk());

    verify(paymentRepository, times(1)).save(paymentCaptor.capture());

    Payment payment = paymentCaptor.getValue();

    assertThat(payment).isNotNull();
    assertThat(payment.getPaymentMethod()).isEqualTo("bank transfer");
    assertThat(payment.getProviderId()).isEqualTo(1);
    assertThat(payment.getAmount()).isEqualTo(BigDecimal.valueOf(100000));
  }

  @Test
  public void shouldThrowWhenInvalidMethod() throws Exception {
    PaymentRequest request = new PaymentRequest();
    request.setAmount(BigDecimal.valueOf(100000));
    request.setMethod("Invalid Method");

    Assertions.assertThatThrownBy(
            () ->
                mockMvc.perform(
                    post("/payment")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request))))
        .hasCauseInstanceOf(RuntimeException.class)
        .hasMessageContaining("Método de pago no válido");

    verify(paymentRepository, times(0)).save(any());
  }
}
