package com.bbdevs.demo;

import com.bbdevs.demo.entity.User;
import com.bbdevs.demo.repository.RoomDAO;
import com.bbdevs.demo.repository.UserDAO;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@org.springframework.stereotype.Controller
@RequiredArgsConstructor
public class UserController {

    private final UserDAO userDAO;

    @GetMapping("/saveUser")
    @ResponseBody
    public String saveUser(@RequestParam(name="name", required=true) String name) {
        User user = new User();
        user.setName(name);
        userDAO.save(user);
        return "User with name " + user.getName() + " is saved";
    }

    @GetMapping("/getUsers")
    @ResponseBody
    public List<User> getUsers() {
        return userDAO.findAll();
    }

}
