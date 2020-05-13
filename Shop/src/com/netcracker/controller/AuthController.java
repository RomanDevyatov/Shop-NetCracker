package com.netcracker.controller;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.validation.Valid;

import com.netcracker.entity.Discount;
import com.netcracker.entity.OrderHistory;
import com.netcracker.entity.Role;
import com.netcracker.entity.User;
import com.netcracker.models.ERole;
import com.netcracker.payload.request.LoginRequest;
import com.netcracker.payload.request.SignupRequest;
import com.netcracker.payload.response.JwtResponse;
import com.netcracker.payload.response.MessageResponse;
import com.netcracker.repository.RoleRepository;
import com.netcracker.repository.UserRepository;
import com.netcracker.security.jwt.JwtUtils;
import com.netcracker.security.security.UserDetailsImpl;
import com.netcracker.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    private UserService userService;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    RoleService roleService;

    @Autowired
    ContactService contactService;

    @Autowired
    ContactTypeService contactTypeService;

    @Autowired
    OrderHistoryService orderHistoryService;

    @Autowired
    DiscountService discountService;

    private Discount chooseDiscount(Long id){
        return discountService.chooseDiscount(orderHistoryService.findByUserId(id));
    }

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());
        userService.updateDiscount(userDetails.getId(), chooseDiscount(userDetails.getId()));
        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles));
    }

    @RequestMapping(value ="/signup", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<?> registerUser(@RequestBody SignupRequest signUpRequest) {

        for( String str : userService.checkUniqOfUsernameEmail(signUpRequest)){
            if(str != null){
                return userService.sendResponseBadRequest(str);
            }
        }
        User newUser = userService.createUser(signUpRequest);
        newUser.setRoles(roleService.checkRole(signUpRequest.getRole()));
        User user1 = userService.save(newUser);
        contactService.createContactAfterRegUser(user1, contactTypeService.scriptFindAll());
        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }
}
