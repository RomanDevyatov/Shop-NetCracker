package com.netcracker.controller;


import com.netcracker.entity.Discount;
import com.netcracker.entity.Feedback;
import com.netcracker.entity.Good;
import com.netcracker.service.FeedbackService;
import com.netcracker.service.GoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    @GetMapping("/feedbacks")
    ResponseEntity<List<Feedback>> getAllFeedbacks(){
        return new ResponseEntity<>(feedbackService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/feedbacks/{id}")
    ResponseEntity<Feedback> getFeedback(@PathVariable("id") Long id){
        return new ResponseEntity<Feedback>(feedbackService.findById(id), HttpStatus.OK);
    }

    @GetMapping("{id}/feedbacks")
    ResponseEntity<List<Feedback>> getFeedbacksForGood(@PathVariable("id") Long id){
        return new ResponseEntity<>(feedbackService.findFeedbacksByGoodId(id), HttpStatus.OK);
    }

    @PostMapping("/feedbacks/add")
    public ResponseEntity<String> createFeedback(@RequestBody Feedback feedback) {
        feedbackService.save(new Feedback(feedback.getGood(), feedback.getDate(), feedback.getUser(),feedback.getText()));
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/feedbacks/{id}")
    ResponseEntity<String> deleteFeedback(@PathVariable("id") long id){
        feedbackService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/feedbacks/deleteByGoodId/{id}")
    ResponseEntity<String> deleteFeedbackByGoodId(@PathVariable("id") long id){
        feedbackService.scriptFeedbackByGoodId(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/feedbacks")
    ResponseEntity<String> deleteAllFeedback() {
        feedbackService.deleteAll();
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
