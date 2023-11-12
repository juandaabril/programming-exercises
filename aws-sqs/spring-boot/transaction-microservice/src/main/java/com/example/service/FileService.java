package com.example.service;

import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class FileService {

  private final RestTemplate restTemplate;

  @Value("${app.services.validation}")
  private final String validationServiceHost;

  @SneakyThrows
  public void send(Resource resource) {
    // Send the CSV file to the endpoint

    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
    HttpEntity<byte[]> requestEntity = new HttpEntity<>(resource.getContentAsByteArray(), headers);

    restTemplate.postForObject(validationServiceHost + "/validate", requestEntity, Void.class);
  }
}
