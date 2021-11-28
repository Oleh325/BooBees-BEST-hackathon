package com.bbdevs.demo;

import com.bbdevs.demo.entity.Room;
import com.bbdevs.demo.repository.RoomDAO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class RoomController {
    private final RoomDAO roomDAO;

    @GetMapping("/saveRoom")
    @ResponseBody
    public String saveRoom() {
        Room room = new Room();
        roomDAO.save(room);
        return "Room with id " + room.getRoomId() + " is saved";
    }

    @GetMapping("/getRooms")
    @ResponseBody
    public List<Room> getRooms() {
        return roomDAO.findAll();
    }
}
