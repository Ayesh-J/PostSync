package com.postsync.postsync.model;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class PostRequest {
    private MultipartFile image;
    private MultipartFile video;
}