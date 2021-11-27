package com.bbdevs.demo.entity;

import org.springframework.data.annotation.Id;

import java.util.List;

public class Drawing {
    @Id
    private String id;
    private Boolean isComplete;
    private String name;
    private String type;
    private Integer childIndex;
    private String parentId;
    private List<Float> point;
    private List<List<Float>> points;
    private Float Rotation;
    private Style style;
}
