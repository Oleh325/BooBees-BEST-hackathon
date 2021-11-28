package com.bbdevs.demo.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class Drawing {
    @Id
    private String id;
    private Boolean isComplete;
    private Boolean isLocked;
    private Boolean isStateful;
    private String name;
    private String type;
    private Integer childIndex;
    private String parentId;
    private List<Float> point;
    private List<List<Float>> points;
    private Float Rotation;
    private Style style;
}
