package com.example.service;

import com.example.entity.UserPicture;
import com.example.repository.UserPictureRepository;
import com.example.repository.UserRepository;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class ImageService {

    private final UserRepository userRepository;
    private final UserPictureRepository userPictureRepository;

    @SneakyThrows
    public void saveImage(String userId, MultipartFile file) {
        var user =
                userRepository
                        .findById(userId)
                        .orElseThrow(() -> new RuntimeException("User not found"));
        userPictureRepository
                .findByUserIdAndName(userId, file.getOriginalFilename())
                .ifPresent(
                        (picture) -> new RuntimeException("The file already exists for that user"));

        String filename = UUID.randomUUID() + "-" + file.getOriginalFilename();
        Path filePath = Paths.get("pictures", filename);
        UserPicture userPicture =
                new UserPicture(
                        UUID.randomUUID().toString(),
                        user.getId(),
                        file.getOriginalFilename(),
                        filePath.toString());

        Files.createDirectories(filePath.getParent());
        Files.write(filePath, file.getBytes());
        userPictureRepository.save(userPicture);
    }

    @SneakyThrows
    public Resource getImage(String userId, String filename) {
        var picture =
                userPictureRepository
                        .findByUserIdAndName(userId, filename)
                        .orElseThrow(() -> new RuntimeException("File not found"));

        Path filePath = Paths.get(picture.getUrl());
        Resource resource = new UrlResource(filePath.toUri());

        if (resource.exists() || resource.isReadable()) {
            return resource;
        } else {
            throw new RuntimeException("Could not read the file!");
        }
    }
}
