package com.bbdevs.demo.repository;

import com.bbdevs.demo.entity.Canvas;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public
interface CanvasMongo extends MongoRepository<Canvas, String> {
}