package com.bbdevs.demo.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class Style {
    private String color;
    private String dash;
    private Boolean isFilled;
    private Float scale;
    private String size;
}
