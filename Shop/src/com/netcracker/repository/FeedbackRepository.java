package com.netcracker.repository;

import com.netcracker.entity.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {

    @Query(value = "select * from feedback where good=:id", nativeQuery = true)
    List<Feedback> findFeedbacksByGoodId(Long id);

    @Query(value = "delete from feedback where good=:id", nativeQuery = true)
    List<Feedback> scriptFeedbackByGoodId(Long id);
}
