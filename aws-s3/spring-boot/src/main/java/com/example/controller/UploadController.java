package com.example.controller;

import com.example.service.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
public class UploadController {

    private final ImageService imageService;

    @PostMapping("upload/{userId}")
    public void uploadFile(@PathVariable String userId, @RequestParam("file") MultipartFile file) {
        imageService.saveImage(userId, file);
    }
}
