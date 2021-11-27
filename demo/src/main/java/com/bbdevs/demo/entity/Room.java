package com.bbdevs.demo.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity(name = "room")
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer roomId;
    @OneToMany
    private List<User> users;
    private Integer maxUserAmount;
    private Integer roundAmount;
    private Integer currentRound;
    private Integer currentUserId;
}
