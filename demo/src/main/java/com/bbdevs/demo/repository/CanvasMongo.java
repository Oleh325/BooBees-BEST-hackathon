package com.bbdevs.demo.repository;

import com.bbdevs.demo.entity.Canvas;
import org.springframework.data.mongodb.repository.MongoRepository;

interface CanvasRepository extends MongoRepository<Canvas, String> {
    Canvas findById(Integer Id);
}