package com.example.entity;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserPicture {
    private String id;
    private String userId;
    private String name;
    private String url;
}
