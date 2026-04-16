package com.postsync.postsync.controller;

import com.postsync.postsync.model.PostRequest;
import com.postsync.postsync.service.FacebookService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/facebook")
@CrossOrigin("*")
@RequiredArgsConstructor
public class FacebookController {

    private final FacebookService facebookService;

    @PostMapping("/post")
    public ResponseEntity<?> postToFacebook(
            @RequestParam(required = false) MultipartFile image,
            @RequestParam(required = false) MultipartFile video,
            @RequestParam String caption
    ) {
        try {
            PostRequest req = new PostRequest();
            req.setImage(image);
            req.setVideo(video);

            String result = facebookService.publishToFacebook(caption, req);

            return ResponseEntity.ok(result);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}