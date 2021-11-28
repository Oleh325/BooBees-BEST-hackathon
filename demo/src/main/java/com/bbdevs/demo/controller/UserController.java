package com.bbdevs.demo.controller;

import com.bbdevs.demo.entity.User;
import com.bbdevs.demo.repository.RoomDAO;
import com.bbdevs.demo.repository.UserDAO;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@org.springframework.stereotype.Controller
@RequiredArgsConstructor
public class UserController {

    private final UserDAO userDAO;

    @CrossOrigin
    @GetMapping("/saveUser")
    @ResponseBody
    public User saveUser(@RequestParam(name="name", required=true) String name) {
        User user = new User();
        user.setName(name);
        user.setCanDraw(false);
        userDAO.save(user);
        if (userDAO.count() >= 5) throw new RuntimeException("too many users in the room. Try again later");
        return user;
    }

    @CrossOrigin
    @GetMapping("/updateUser")
    @ResponseBody
    public User updateUser(@RequestParam(name="name", required=true) String name,
                           @RequestParam(name = "id", required = true) Integer id) {

        Optional<User> userOptional = userDAO.findById(id);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setName(name);
            userDAO.save(user);
            return user;
        } else {
            throw new RuntimeException("too many users in the room. Try again later");
        }
    }

    @CrossOrigin
    @GetMapping("/getUsers")
    @ResponseBody
    public List<User> getUsers() {
        return userDAO.findAll();
    }

    @GetMapping("/removeUsers")
    @ResponseBody
    public String removeUsers() {
        userDAO.deleteAll();
        return "ok";
    }

}
