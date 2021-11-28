package com.bbdevs.demo;

import com.bbdevs.demo.entity.Canvas;
import com.bbdevs.demo.entity.Drawing;
import com.bbdevs.demo.repository.mongo.CanvasMongo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin
@Controller
@RequiredArgsConstructor
public class CanvasController {
    private final CanvasMongo canvasMongo;

    @PostMapping("/saveCanvas")
    @ResponseBody
    public String saveCanvas(@RequestBody List<Drawing> shapes) {
        Canvas canvas = new Canvas();
        shapes.forEach(s -> s.setIsLocked(false));
        shapes.forEach(s -> s.setIsStateful(false));
        canvas.setShapes(shapes);
        canvasMongo.deleteAll();
        canvasMongo.save(canvas);
        return "Canvas with id " + canvas.getId() + " is saved";
    }

    @GetMapping("/getCanvas")
    @ResponseBody
    public Canvas getCanvas() {
        Optional<Canvas> optionalCanvas = canvasMongo.findAll().stream().findFirst();
        if (optionalCanvas.isPresent()) return optionalCanvas.get();
        else {
            Canvas canvas = new Canvas();
            canvas.setShapes(List.of());
            canvasMongo.save(canvas);
            return canvasMongo.findAll().stream().findFirst().orElseThrow(() -> new RuntimeException("unknown error occured"));
        }
    }
}
