package com.postsync.postsync.service;

import com.postsync.postsync.model.PostRequest;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class FacebookService {

    private final String PAGE_ID = "976030695584782";
private final String PAGE_ACCESS_TOKEN = "EAAMgPB5xzc0BROyClPZC69Qdq5Rhh8l0JbM42lXtFqNabsOoMaY6cKd5OjxPr10YGEwGZAkMutBWiuKB0OP5C6qLHROPuz0FF5UZAPXN5H9nmuAZB6r4AJmPStaWcINAlqZAEoVBdpsW5EE2mUCUf6xvZBSeA7CumZCjhafIL4ZCkn4axEBZBfLaf6qjmqBSQ1SvaSCam8jFFsQZCnTXHeDK2T5p62S0XhRM2LKBGAgpeB2xfw";

    public String publishToFacebook(String caption, PostRequest request) throws Exception {

        if (request.getVideo() != null && !request.getVideo().isEmpty()) {
            return uploadVideo(request.getVideo(), caption);
        }

        if (request.getImage() != null && !request.getImage().isEmpty()) {
            String imageId = uploadImage(request.getImage());
            return publishImagePost(imageId, caption);
        }

        return "No media selected.";
    }

    private String uploadVideo(MultipartFile video, String caption) throws IOException {
        String url = "https://graph.facebook.com/" + PAGE_ID + "/videos";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("access_token", PAGE_ACCESS_TOKEN);
        body.add("description", caption);
        body.add("source", new ByteArrayResource(video.getBytes()) {
            public String getFilename() { return video.getOriginalFilename(); }
        });

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Map> response = restTemplate.postForEntity(url, new HttpEntity<>(body, headers), Map.class);

        return "Video uploaded. ID: " + response.getBody().get("id");
    }

    private String uploadImage(MultipartFile image) throws IOException {
        String url = "https://graph.facebook.com/" + PAGE_ID + "/photos";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("access_token", PAGE_ACCESS_TOKEN);
        body.add("published", "false");
        body.add("source", new ByteArrayResource(image.getBytes()) {
            public String getFilename() { return image.getOriginalFilename(); }
        });

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Map> response = restTemplate.postForEntity(url, new HttpEntity<>(body, headers), Map.class);

        return response.getBody().get("id").toString();
    }

    private String publishImagePost(String imageId, String caption) {
        String url = "https://graph.facebook.com/" + PAGE_ID + "/feed";

        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("access_token", PAGE_ACCESS_TOKEN);
        body.add("message", caption);
        body.add("attached_media[0]", "{\"media_fbid\":\"" + imageId + "\"}");

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Map> response = restTemplate.postForEntity(url, new HttpEntity<>(body, headers), Map.class);

        return "Image posted. Post ID: " + response.getBody().get("id");
    }
}