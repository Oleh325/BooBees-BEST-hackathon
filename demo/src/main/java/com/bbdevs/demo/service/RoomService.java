package com.bbdevs.demo.service;

import com.bbdevs.demo.entity.User;
import com.bbdevs.demo.repository.UserDAO;
import com.bbdevs.demo.repository.mongo.CanvasMongo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
@RequiredArgsConstructor
public class RoomService {
    private final UserDAO userDAO;
    private final CanvasMongo canvasMongo;

    public void setupRoom() {
        List<User> users = userDAO.findAll();
        List<Integer> orders = IntStream.range(1, users.size() + 1).boxed().collect(Collectors.toList());
        AtomicInteger i = new AtomicInteger(0);
        users.forEach(u -> {
            u.setOrderNumber(orders.get(i.get()));
            u.setCanDraw(orders.get(i.getAndIncrement()) == 1);
        });
        userDAO.saveAll(users);
    }

    public void finishGame() {
        userDAO.deleteAll();
        canvasMongo.deleteAll();
    }
}
