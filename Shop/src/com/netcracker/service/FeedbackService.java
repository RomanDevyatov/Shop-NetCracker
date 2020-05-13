package com.netcracker.service;

import com.netcracker.entity.Discount;
import com.netcracker.entity.Feedback;
import com.netcracker.repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FeedbackService {
    @Autowired
    private FeedbackRepository feedbackRepository;

    public List<Feedback> findAll(){
        return feedbackRepository.findAll();
    }

    public Feedback findById(long id){
        Optional<Feedback> optional = feedbackRepository.findById(id);
        return optional.orElse(new Feedback());
    }

    public List<Feedback> findFeedbacksByGoodId(long id){
        return feedbackRepository.findFeedbacksByGoodId(id);
    }

    public Feedback save(Feedback feedback){
        feedbackRepository.save(feedback);
        return feedback;
    }

    public void deleteAll() {
        feedbackRepository.deleteAll();
    }
    public void deleteById(long id){
        feedbackRepository.deleteById(id);
    }
    public void scriptFeedbackByGoodId(long id){
        feedbackRepository.scriptFeedbackByGoodId(id);
    }

}
