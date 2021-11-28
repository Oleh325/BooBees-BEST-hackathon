package com.bbdevs.demo.controller;

import com.bbdevs.demo.entity.User;
import com.bbdevs.demo.repository.UserDAO;
import com.bbdevs.demo.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@CrossOrigin
@RequiredArgsConstructor
public class RoomController {
    private final RoomService roomService;
    private final UserDAO userDAO;

    @GetMapping("/startGame")
    @ResponseBody
    public User startGame() {
        roomService.setupRoom();
        return userDAO.findByCanDraw(true).orElseThrow(() -> new RuntimeException("Game is finished"));
    }
}
