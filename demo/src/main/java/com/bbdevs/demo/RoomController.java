package com.bbdevs.demo;

import com.bbdevs.demo.entity.Room;
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
public class RoomController {
    private final RoomDAO roomDAO;

    @GetMapping("/saveRoom")
    @ResponseBody
    public String saveUser() {
        Room room = new Room();
        roomDAO.save(room);
        return "Room with id " + room.getRoomId() + " is saved";
    }

    @GetMapping("/getRoom")
    @ResponseBody
    public List<Room> getRooms() {
        return roomDAO.findAll();
    }
}
