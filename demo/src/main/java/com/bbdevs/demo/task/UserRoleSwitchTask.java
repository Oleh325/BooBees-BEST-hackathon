package com.bbdevs.demo.task;

import com.bbdevs.demo.entity.User;
import com.bbdevs.demo.repository.UserDAO;
import com.bbdevs.demo.service.RoomService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Slf4j
@Component
@RequiredArgsConstructor
public class UserRoleSwitchTask {

    private final UserDAO userDAO;
    private final RoomService roomService;

    @Scheduled(fixedRate = 10000)
    public void reportCurrentTime() {
        log.info("The time is now {}", new Date());
        List<User> users = userDAO.findAll();

        if (users.isEmpty() || users.stream().noneMatch(User::getCanDraw)) return;

        User previousUser = users
                .stream()
                .filter(User::getCanDraw)
                .findFirst()
                .orElseThrow(() -> new RuntimeException("wtf"));
        previousUser.setCanDraw(false);
        Integer orderNumber = previousUser.getOrderNumber();

        Optional<User> nextUser = users
                .stream()
                .filter(user -> user.getOrderNumber() == orderNumber + 1)
                .findFirst();
        if (nextUser.isPresent()) {
            nextUser.get().setCanDraw(true);
            userDAO.saveAll(users);
        } else {
            roomService.finishGame();
        }
    }

}
