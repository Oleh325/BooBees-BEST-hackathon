package com.bbdevs.demo;

import com.bbdevs.demo.entity.Canvas;
import com.bbdevs.demo.entity.Room;
import com.bbdevs.demo.repository.CanvasMongo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class CanvasController {
    private final CanvasMongo canvasMongo;

    @GetMapping("/saveCanvas")
    @ResponseBody
    public String saveUser() {
        Canvas canvas = new Canvas();
        canvasMongo.save(canvas);
        return "Canvas with id " + canvas.getId() + " is saved";
    }

    @GetMapping("/getCanvas")
    @ResponseBody
    public List<Canvas> getRooms() {
        return canvasMongo.findAll();
    }
}
