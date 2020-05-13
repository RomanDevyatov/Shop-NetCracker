package com.netcracker;

import com.netcracker.entity.*;
//import com.netcracker.models.ConstRole;
import com.netcracker.models.ERole;
import com.netcracker.service.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.RequestMapping;
import java.time.LocalDate;
import java.time.Month;
import java.util.Date;
import java.util.HashMap;

@SpringBootApplication
public class ShopApplication implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(ShopApplication.class);

    @Autowired
    private UserService userService;

    @Autowired
    private BasketService basketService;

    @Autowired
    private DiscountService discountService;

    @Autowired
    private GoodService goodService;

    @Autowired
    private FeedbackService feedbackService;

    @Autowired
    private OrderHistoryService orderHistoryService;

    @Autowired
    private RoleService roleService;

    @Autowired
    private ContactTypeService contactTypeService;

    @Autowired
    private ContactService contactService;

    public static void main(String[] args) {
        SpringApplication.run(ShopApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        //contactTypeService.deleteAll();
        //discountService.deleteAll();
        orderHistoryService.deleteAll();
        basketService.deleteAll();
        feedbackService.deleteAll();
        goodService.deleteAll();
        //discountService.deleteAll();
        userService.deleteAll();
        roleService.deleteAll();
        Role
                r_admin=roleService.save(new Role(ERole.ROLE_ADMIN)),
                r_user=roleService.save(new Role(ERole.ROLE_USER)),
                r_mod=roleService.save(new Role(ERole.ROLE_MODERATOR)),
                r_anon=roleService.save(new Role(ERole.ROLE_ANONYMOUS));
        Good
                g1=goodService.save(new Good("Мяч", "noname", 5,  "Футбол", "1", 200, "assets/img/ball.jpeg")),
                g2=goodService.save(new Good("Сноуборд", "fischer", 10,  "Сноуборд", "15", 300,"assets/img/snowboard.jpg")),
                g3=goodService.save(new Good("Лыжи", "karhu", 50,  "Лыжные гонки", "36",400,"assets/img/karhu.jpg")),
                g4=goodService.save(new Good("Кроссовки", "adidas", 5,  "Бег", "34",500,"assets/img/sneakers.jpg")),
                g5=goodService.save(new Good("Лыжные палки", "swix", 5, "Лыжные гонки", "48",600,"assets/img/swix.jpg"));
    }
}
