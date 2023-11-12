package com.example.controller;

import com.example.entity.Transaction;
import com.example.repository.TransactionRepository;
import com.example.service.ProcessService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ValidationController {

    private final ProcessService processService;
    private final TransactionRepository transactionRepository;

    @PostMapping("/validate")
    @SneakyThrows
    public void validate(@RequestBody byte[] file) {
        Resource resource = new ByteArrayResource(file);
        processService.process(resource);
    }

    @GetMapping()
    public List<Transaction> get() {
        return transactionRepository.findAll();
    }
}
