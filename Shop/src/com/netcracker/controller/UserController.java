package com.netcracker.controller;

import com.netcracker.entity.User;
import com.netcracker.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/users")
    ResponseEntity<List<User>> getAllUsers(){
        return new ResponseEntity<>(userService.scriptFindAll(), HttpStatus.OK);
    }

    @GetMapping("/users/{id}")
    ResponseEntity<User> getUser(@PathVariable("id") Long id){
        return new ResponseEntity<>(userService.findById(id), HttpStatus.OK);
    }

    @PostMapping("/users")
    public User createUser(@Valid @RequestBody User user) {
        return userService.save(user);
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<User> updateUser(@PathVariable("id") Long id, @RequestBody User user){
        return userService.updateUser(id, user);
    }

    @DeleteMapping("/users/{id}")
    ResponseEntity<String> deleteUser(@PathVariable("id") Long id){
        return userService.deleteById(id);
    }

    @DeleteMapping("/users/delete")
    ResponseEntity<String> deleteAllUser() {
        return userService.deleteAll();
    }
}
