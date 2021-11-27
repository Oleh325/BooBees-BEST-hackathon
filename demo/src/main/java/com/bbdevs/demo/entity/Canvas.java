package com.bbdevs.demo.entity;

import org.springframework.data.annotation.Id;

import java.util.List;

public class Canvas {
    @Id
    private String id;
    private List<Drawing> shapes;
}
