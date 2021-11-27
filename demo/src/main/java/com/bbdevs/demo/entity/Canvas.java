package com.bbdevs.demo.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class Canvas {
    @Id
    private String id;
    private List<Drawing> shapes;
}
